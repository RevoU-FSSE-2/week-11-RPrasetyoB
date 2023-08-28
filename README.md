# Restfull API
Adding the capability to connect databases to Express apps loading an appropriate Node.js driver for the database in your app.

## Tools
- Node.JS
- Express
- Mongoose / MongoDB
- TypeScript
- Postman
- Swagger

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
| **Login User**                      | `POST`      | [/v1/auth/login](https://week10-rpb.up.railway.app/)    | Request Body: `username: string, password: string`                                                                  |
| **Register User**                   | `POST`      | [/v1/auth/register](https://week10-rpb.up.railway.app/) | Request Body: `username: string, password: string, role: string`                                                    |
| **Get All User**                   | `GET`       | [/v1/user](https://week10-rpb.up.railway.app/)         |
| **Get One User**                   | `GET`       | [/v1/user/:id](https://week10-rpb.up.railway.app/)         | `admin and approver role`  Request Params: `id: number`  
| **Get All Transfer**               | `GET`       | [/v1/transfer](https://week10-rpb.up.railway.app/)     |  `admin and approver role`
| **Get Transfer by ID**             | `GET`       | [/v1/transfer/:id](https://week10-rpb.up.railway.app/)  | `admin and approver role`  Request Params: `id: number`                                                                                        |
| **Create Transfer**                 | `POST`      | [/v1/transfer](https://week10-rpb.up.railway.app/)      | Request Body: `source account: number, destination account: number, amount: number`                                          |
| **Update Transfer Status by ID**    | `PATCH`     | [/v1/transfer/:id](https://week10-rpb.up.railway.app/)  | `admin and approver role`  Request Body: `status: string` `admin and approver role`                                                                                   |
| **Softdelete Transfer by ID**           | `DELETE`    | [/v1/transfer/:id](https://week10-rpb.up.railway.app/)  | `admin role`  Request Params: `id: number` `admin role`                                                                                        |

## Deployment
### Back End Rest API: <br>


### Swagger Documentation: <br>






[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/XqBuIcOG)
