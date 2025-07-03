package kisal376.employee_api;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    List<Employee> findByName(String name);
    List<Employee> findByPosition(String position);
    List<Employee> findByEmail(String email);
    List<Employee> findByNameContaining(String namePart);
    List<Employee> findByPositionAndEmail(String position, String email);
}
