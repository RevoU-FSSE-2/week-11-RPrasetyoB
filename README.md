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
  "password": "manager123".
  "role": "manager" 
}
```
```
{
  "username": "rpb2",
  "role": "employee",
  "password": "employee123"  
}
```

## Project Flowchart <br>
![milestone2 drawio (1)](https://github.com/RevoU-FSSE-2/week-11-RPrasetyoB/assets/129088807/0f662742-6e7f-450c-961a-6c3cd2248b47)

## Request and Response example
**Login user**
- Request :
```
{
    "username" : "rpb6",
    "password" : "employee123",
    "role" : "employee"
}
```
- Response :
```
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
**Register user**

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

## Deployment
### Back End Rest API: <br>
https://week11-rpb.up.railway.app

### Swagger Documentation: <br>
https://week11-rpb.up.railway.app/api-doc

### Front End: <br>




[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/XqBuIcOG)
