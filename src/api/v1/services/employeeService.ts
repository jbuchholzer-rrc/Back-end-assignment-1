import { Employee } from '../../../data/employees';

// In-memory storage for employees
let employees: Employee[] = [];
let nextId = 1;

/**
 * Creates a new employee with auto-generated ID
 * @param employeeData - Employee data without ID
 * @returns The created employee with generated ID
 */
export function createEmployee(employeeData: Omit<Employee, 'id'>): Employee {
    // Generate new ID
    const newEmployee: Employee = {
        id: nextId++,
        ...employeeData
    };

    // Add to employees array
    employees.push(newEmployee);

    // Return the created employee
    return newEmployee;
}

/**
 * Gets all employees
 * @returns Array of all employees
 */
export function getAllEmployees(): Employee[] {
    return employees;
}

/**
 * Gets an employee by their ID
 * @param id - The employee ID to search for
 * @returns The employee with the given ID, or undefined if not found
 */
export function getEmployeeById(id: number): Employee | undefined {
    return employees.find(employee => employee.id === id);
}

