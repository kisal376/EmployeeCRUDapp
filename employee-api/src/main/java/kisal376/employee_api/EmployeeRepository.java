package kisal376.employee_api;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    List<Employee> findByName(String name);
    List<Employee> findByPosition(String position);
    List<Employee> findByEmail(String email);
    List<Employee> findByNameContaining(String namePart);
    List<Employee> findByPositionAndEmail(String position, String email);

    @Query("{ $and: [ "
     + " { $or: [ "
     + "   { 'name': { $regex: ?0, $options: 'i' } }, "
     + "   { 'email': { $regex: ?0, $options: 'i' } }, "
     + "   { 'company': { $regex: ?0, $options: 'i' } } "
     + " ] }, "
     + " { 'employeeType': { $regex: ?1, $options: 'i' } } "
     + "] }")

    Page<Employee> searchEmployees(String keyword, String typeFilter, Pageable pageable);
}
