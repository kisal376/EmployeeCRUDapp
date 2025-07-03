package kisal376.employee_api;

public class EmployeeNotFoundException extends RuntimeException{
    public EmployeeNotFoundException(String id){
        super("Employee with id: " + id + " not found.");
    }
}
