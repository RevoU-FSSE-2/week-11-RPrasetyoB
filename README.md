# Restfull API
Adding the capability to connect databases to Express apps loading an appropriate Node.js driver for the database in your app.

## Tools
- Node.JS
- Express
- Mongoose / MongoDB
- TypeScript
- Postman
- Swagger
- Bootstrap

## Project Flowchart <br>
![milestone2 drawio (1)](https://github.com/RevoU-FSSE-2/week-11-RPrasetyoB/assets/129088807/0f662742-6e7f-450c-961a-6c3cd2248b47)

## Account for Testing
```
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

#### Download and import json file below to your postman: <br>



| Name                                | HTTP Method | Endpoint                                                   | Requirements                                                                                                        |
| ----------------------------------- | ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Login User**                      | `POST`      | <b>/v1/auth/login</b>    | Request Body: `username: string, password: string`                                                                  |
| **Register User**                   | `POST`      | [/v1/auth/register](https://week11-rpb.up.railway.app/) | Request Body: `username: string, password: string, role: string`                                                    |
| **Get All User**                   | `GET`       | [/v1/users](https://week11-rpb.up.railway.app/)         |
| **Get One User**                   | `GET`       | [/v1/users/:id](https://week11-rpb.up.railway.app/)         | `manager and employee role`  Request Params: `id: string`  
| **Get All Task**               | `GET`       | [/v1/tasks](https://week11-rpb.up.railway.app/)     |  `manager and employee role`
| **Get Task by ID**             | `GET`       | [/v1/tasks/:id](https://week11-rpb.up.railway.app/)  | `manager and employee role`  Request Params: `id: string`                                                                                        |
| **Create Task**                 | `POST`      | [/v1/tasks](https://week11-rpb.up.railway.app/)      | `manager role` Request Body: `task: string`                                          |
| **Update Task Status by ID**    | `PATCH`     | [/v1/tasks/:id](https://week11-rpb.up.railway.app/)  | `manager and employee role` Request Params: `id: string`  Request Body: `status: string`                                                                                   |
| **Softdelete Task by ID**           | `DELETE`    | [/v1/tasks/:id](https://week11-rpb.up.railway.app/)  | `manager role`  Request Params: `id: string`                                                                                     |

## Deployment
### Back End Rest API: <br>
https://week11-rpb.up.railway.app

### Swagger Documentation: <br>
https://week11-rpb.up.railway.app/api-doc

### Front End: <br>




[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/XqBuIcOG)
