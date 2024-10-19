## Employee Management API Documentation

### Base URL

`http://localhost:8000/api/v1/employees`

### API Endpoints

#### 1. View All Employees

- **Endpoint**: `GET /`
- **Description**: Fetches and returns a list of all employees.
- **Response**:
  - **200 OK**: A list of employees along with status.
  - **400 Bad Request**: If there is an error, the response will contain an error message.
- **Example Response**:
  ```json
  {
    "status": true,
    "data": [
      {
        "_id": "60f7f62b72cd1a1d1c6f4b82",
        "empNo": "EMP001",
        "name": "John Doe",
        "position": "Software Developer",
        ...
      },
      ...
    ]
  }
  ```

#### 2. Add New Employee

- **Endpoint**: `POST /`
- **Description**: Adds a new employee to the database.
- **Request Body** (JSON):
  ```json
  {
    "empNo": "EMP002",
    "name": "Jane Smith",
    "position": "Product Manager",
    "department": "Marketing",
    "email": "jane.smith@example.com",
    "phone": "123-456-7890"
  }
  ```
- **Response**:
  - **201 Created**: If the employee is successfully created.
  - **400 Bad Request**: If there is a validation error or a bad request.
- **Example Response**:
  ```json
  {
    "status": true,
    "message": "Employee added successfully",
    "data": {
      "_id": "60f7f62b72cd1a1d1c6f4b83",
      "empNo": "EMP002",
      "name": "Jane Smith",
      "position": "Product Manager",
      ...
    }
  }
  ```

#### 3. Delete Employee By ID

- **Endpoint**: `DELETE /:employeeId`
- **Description**: Deletes an employee from the database by their ObjectId.
- **Path Parameter**:
  - `employeeId` (required): The ObjectId of the employee to delete.
- **Response**:
  - **204 No Content**: If the employee is successfully deleted.
  - **404 Not Found**: If the employee is not found.
  - **400 Bad Request**: If `employeeId` is missing or invalid.
  - **500 Internal Server Error**: If there is a server-side issue.
- **Example Response**:
  ```json
  {
    "status": true,
    "message": "Employee deleted successfully"
  }
  ```

#### 4. Update Employee Details

- **Endpoint**: `PATCH /:employeeId`
- **Description**: Updates details of an employee by their ObjectId.
- **Path Parameter**:
  - `employeeId` (required): The ObjectId of the employee to update.
- **Request Body** (JSON): Only provide the fields you want to update.
  ```json
  {
    "name": "Johnathan Doe",
    "position": "Senior Developer"
  }
  ```
- **Response**:
  - **204 No Content**: If the employee details are updated successfully.
  - **400 Bad Request**: If `employeeId` is missing or invalid, or if there’s an error in the update data.
  - **500 Internal Server Error**: If there’s a server-side issue.
- **Example Response**:
  ```json
  {
    "status": true,
    "message": "Employee updated successfully"
  }
  ```

---

### Error Handling

- **400 Bad Request**: If required fields are missing or invalid data is provided.
- **404 Not Found**: If the employee with the given `employeeId` is not found.
- **500 Internal Server Error**: For any server-side issues.

### Response Codes

- **200**: Successful retrieval of data.
- **201**: Resource created successfully.
- **204**: No content, successful operation (used for `DELETE` and `PATCH`).
- **400**: Bad request, validation or input error.
- **404**: Resource not found.
- **500**: Server error.

---
