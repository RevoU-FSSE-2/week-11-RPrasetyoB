# Restfull API
Project milestone 2. build a task management website application that integrates with a database through a custom-built API, which implements CRUD (Create, Read, Update, Delete) functionality

## Tools for this project
- Node.JS
- Express
- Mongoose / MongoDB
- TypeScript
- Postman
- Swagger
- Bootstrap

## Account for Testing

```json
{
  "username": "rpb",
  "password": "manager123",
  "role": "manager" 
}
```
```json
{
  "username": "rpb2",
  "role": "employee",
  "password": "employee123"  
}
```

## Project diagram <br>
![milestone2 drawio (2)](https://github.com/RevoU-FSSE-2/week-11-RPrasetyoB/assets/129088807/d526d363-e261-4b27-9237-621b423025a3)

## Request and Response example
**Login user**
- Request :
```json
{
    "username":"rpb2",
    "password":"employee123"
}
```
- Response :
```json
{
    "success": true,
    "message": "User successfully logged in",
    "user": "rpb2",
    "role": "employee",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJwYjIiLCJpZCI6IjY0ZWRiMGNlNmI1ZTlhYjgxZjEzNmEzZCIsInJvbGUiOiJlbXBsb3llZSIsImlhdCI6MTY5MzQxMTIxMn0.Z6oVX55JS0U493cxCohupbJUAZT2jbBLXf4QH7XkpWI"
}
```

**Register user**
- Request :
```json
{
    "username" : "rpb6",
    "password" : "employee123",
    "role" : "employee"
}
```
- Response :
```json
{
    "success": true,
    "message": "Registration success",
    "data": {
        "username": "rpb6",
        "password": "$2b$10$o.48UV4ioacSdVsOc6GJj.ZVSS17yJDhgXFwXinDNAGCc7WrE.xle",
        "role": "employee",
        "_id": "64ef6456b1de5bf3cfed5158"
    }
}
```
**Get all users**
- Response :
```json
{
    "success": true,
    "message": "success get all user",
    "user": [
        {
            "_id": "64edb05699aab4e52021ba75",
            "username": "rpb",
            "password": "$2b$10$cidUOTwdtYBctx0G5e/gYuivZsP4JybPSnnlf4xq7yzmuXb17o/bS",
            "role": "manager"
        },
        {
            "_id": "64edb0ce6b5e9ab81f136a3d",
            "username": "rpb2",
            "password": "$2b$10$SWTBka/7jcl2leaTXA68t.2OTSC9Mvk15eNgpHSWAVFC0sR208TDS",
            "role": "employee"
        }
  ]
}
```
**Get one user**
- Response :
```json
{
    "success": true,
    "message": "success get user",
    "user": {
        "_id": "64ef6456b1de5bf3cfed5158",
        "username": "rpb6",
        "password": "$2b$10$o.48UV4ioacSdVsOc6GJj.ZVSS17yJDhgXFwXinDNAGCc7WrE.xle",
        "role": "employee"
    }
}
```

**Get all tasks**
- Response :
```json
{
    "success": true,
    "message": "success get all transfer's datas",
    "data": [
        {
            "_id": "64edbc946b66591fe76c3442",
            "task": "make daily report",
            "status": "In review",
            "createdAt": "2023-08-29T09:38:28.789Z",
            "updatedAt": "2023-08-29T00:00:00.000Z"
        },
        {
            "_id": "64edbf413bd73327cd795c20",
            "task": "make meeting report",
            "status": "Not started",
            "createdAt": "2023-08-29T00:00:00.000Z",
            "updatedAt": "2023-08-29T00:00:00.000Z"
        }
  ]
}
```

**Get one task**
- Response :
```json
{
    "success": true,
    "message": "success get transfer data",
    "user": {
        "_id": "64edbc946b66591fe76c3442",
        "task": "make daily report",
        "status": "In review",
        "createdAt": "2023-08-29T09:38:28.789Z",
        "updatedAt": "2023-08-29T00:00:00.000Z"
    }
}
```

**Create task**
- Request :
```json
{
    "task":"make weekly schedule"
}
```
- Response :
```json
{
    "success": true,
    "message": "Task registration success",
    "data": {
        "task": "make weekly schedule",
        "status": "Not started",
        "_id": "64ef6a75b1de5bf3cfed5160",
        "createdAt": "2023-08-30T00:00:00.000Z",
        "updatedAt": "2023-08-30T00:00:00.000Z"
    }
}
```

**Update task**
- Request :
```json
{
    "status":"In progress"
}
```
- Response :
```json
{
    "success": true,
    "message": "Successfully updated status",
    "data": {
        "status": "In progress"
    }
}
```

**Delete task**
- Response :
```json
{
    "success": true,
    "message": "Task deleted successfully",
    "data": {
        "_id": "64ee0a2e305e086e0a7eb922",
        "task": "make weekly schedule",
        "status": "Not started",
        "createdAt": "2023-08-29T00:00:00.000Z",
        "updatedAt": "2023-08-30T00:00:00.000Z",
        "isDeleted": true
    }
}
```

#### Download and import json file below to your postman: <br>
https://drive.google.com/file/d/15GdqV8NM2q2T4VFQ0DdNHP9om45ijLpY/view?usp=sharing


| Name                                | HTTP Method | Endpoint                                                   | Requirements                                                                                                        |
| ----------------------------------- | ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Login User**                      | `POST`      | <b>/v1/auth/login</b>    | Request Body: `username: string, password: string`                                                                  |
| **Register User**                   | `POST`      | <b>/v1/auth/register</b> | Request Body: `username: string, password: string, role: string`                                                    |
| **Get All User**                   | `GET`       | <b>/v1/users</b>         |
| **Get One User**                   | `GET`       | <b>/v1/users/:id</b>         |  Request Params: `id: string`  
| **Get All Task**               | `GET`       | <b>/v1/tasks</b>     |  `manager and employee role`
| **Get Task by ID**             | `GET`       | <b>/v1/tasks/:id</b>  | `manager and employee role`  Request Params: `id: string`                                                                                        |
| **Create Task**                 | `POST`      | <b>/v1/tasks</b>      | `manager role` Request Body: `task: string`                                          |
| **Update Task Status by ID**    | `PATCH`     | <b>/v1/tasks/:id</b>  | `manager and employee role` Request Params: `id: string`  Request Body: `status: string`                                                                                   |
| **Softdelete Task by ID**           | `DELETE`    | <b>/v1/tasks/:id</b>  | `manager role`  Request Params: `id: string`                                                                                     |

## Unit testing with JEST
- Use code as follow to run unit testing
```
npm run test
```
![Screenshot_1](https://github.com/RevoU-FSSE-2/week-11-RPrasetyoB/assets/129088807/dc5f9017-6e43-48b1-aa1c-3286ef6e7026)


## Deployment
### Back End Rest API: <br>
https://week11-rpb.up.railway.app

### Swagger Documentation: <br>
https://week11-rpb.up.railway.app/api-doc

### Front End: <br>
https://week11-rpb.netlify.app/



[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/XqBuIcOG)
