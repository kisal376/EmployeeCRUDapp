package kisal376.employee_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;

import java.lang.reflect.Field;
import java.util.List;

/**
 * REST controller for managing Employee resources.
 */
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    /**
     * Constructor that injects the Employee repository.
     *
     * @param employeeRepository the repository used to access employee data
     */
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Retrieves all employees.
     *
     * @return a list of all employees
     */
    @GetMapping
    public Page<Employee> getAllEmployees(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        return employeeRepository.findAll(pageable);
    }

    /**
     * Retrieves an employee by ID.
     *
     * @param id the ID of the employee
     * @return 200 OK with employee if found, or 404 Not Found if not
     */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(()-> new EmployeeNotFoundException(id));
        
        return ResponseEntity.ok(employee);
    }

    /**
     * Adds a new employee.
     *
     * @param employee the employee to add
     * @return 200 OK with the saved employee
     */
    @PostMapping
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) {
        // Validate employee data here if needed
        employeeRepository.save(employee);
        return ResponseEntity.ok(employee);
    }
    
    /**
     * Adds multiple employees in a batch.
     *
     * @param employees the list of employees to add
     * @return 200 OK with the list of saved employees or 400 Bad Request if empty
     */
    @PostMapping("/batch")
    public ResponseEntity<List<Employee>> addEmployees(@RequestBody @Valid List<@Valid Employee> employees) {
        if (employees == null || employees.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<Employee> savedEmployees = employeeRepository.saveAll(employees);
        return ResponseEntity.ok(savedEmployees);    
    }

    /**
     * Updates an existing employee. This replaces all fields (nulls included).
     *
     * @param id       the ID of the employee to update
     * @param employee the updated employee data
     * @return 200 OK with updated employee or 404 if not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String id,
            @Valid @RequestBody Employee employee) {
        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    BeanUtils.copyProperties(employee, existingEmployee, "id");
                    Employee updated = employeeRepository.save(existingEmployee);
                    return ResponseEntity.ok(updated);
                })
                .orElseThrow(()-> new EmployeeNotFoundException(id));
    }

    /**
     * Partially updates an employee. Only non-null fields are updated.
     *
     * @param id       the ID of the employee to update
     * @param employee the fields to update
     * @return 200 OK with updated employee or 404 if not found
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Employee> partialUpdateEmployee(@PathVariable String id,
            @RequestBody Employee employee) {
        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    for (Field field : Employee.class.getDeclaredFields()) {
                        field.setAccessible(true);
                        try {
                            Object value = field.get(employee);
                            if (value != null && !"id".equals(field.getName())) {
                                if("email".equals(field.getName())) {
                                    // Validate email format if necessary
                                    if (!value.toString().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
                                        throw new IllegalArgumentException("Invalid email format");
                                    }
                                }
                                field.set(existingEmployee, value);
                            }
                        } catch (IllegalAccessException e) {
                            e.printStackTrace(); // Consider using a logger
                        }
                    }
                    employeeRepository.save(existingEmployee);
                    return ResponseEntity.ok(existingEmployee);
                })
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    /**
     * Deletes an employee by ID.
     *
     * @param id the ID of the employee to delete
     * @return 204 No Content if deleted, or 404 if not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        throw new EmployeeNotFoundException(id);
    }


    /**
     * Deletes all employees.
     *
     * @return 204 No Content
     */
    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllEmployees() {
        employeeRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
