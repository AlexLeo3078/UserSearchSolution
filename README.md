# User Search Solution

A full-stack user search application built with:

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core + SQL Server
- Angular frontend (user-search-client)

---

## Index

- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Database Reset and Build](#database-reset-and-build)
- [Seed Database](#seed-database)
- [Running the Full Stack](#running-the-full-stack)
- [Notes](#notes)
- [Future Improvements](#future-improvements)

---

## Features

- Search users by first or last name (case-insensitive)
- Retrieve user by ID
- Create new users
- Email uniqueness validation
- SQL Server database with Entity Framework Core
- Angular frontend with live search UI
- Full database reset and build script for development

---

## Technologies

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core 8
- SQL Server (LocalDB)

### Frontend
- Angular (standalone setup)
- TypeScript
- SCSS
- RxJS

---

## Architecture

Angular Frontend  
→ UserService 
→ ASP.NET Core Web API  
→ Entity Framework Core  
→ SQL Server Database  

---

## Project Structure

```text
UserSearchSolution/
│
├── UserSearch.Api/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
|   ├── Dto/
│   ├── Migrations/
│   ├── Build/
│   │   └── reset-and-build-db.ps1
│   ├── appsettings.json
│   ├── Program.cs
│
├── user-search-client/
│   ├── src/
│   │   ├── app/
│   │   ├── styles/
│   │   └── environments/
│
└── README.md
```
---

## Backend Setup

cd UserSearch.Api  
dotnet run  

Backend runs at:
http://localhost:5093

Swagger UI: 
http://localhost:5093/swagger

---

## Frontend Setup

cd user-search-client  
npm install  
ng serve  

Frontend runs at:
http://localhost:4200  

---

## API Endpoints

### Get suggestions
GET /api/users/get-suggestions?searchTerm=alex  

### Get User by ID
GET /api/users/{id}  

### Create User
POST /api/users  

Request:
```json
{
  "firstName": "Alex",
  "lastName": "Leo",
  "email": "alex@test.com",
  "phone": "+447700900123",
  "jobTitle": "Software Engineer"
}
```
---

## Database Reset and Build

Location:
UserSearch.Api/Build/reset-and-build-db.ps1  

Run:

cd UserSearch.Api/Build  
.\reset-and-build-db.ps1  

What it does:
- Drops database
- Deletes migrations
- Recreates schema

---
## Seed Database

This endpoint allows you to populate the database using an Excel (.xlsx) file.  
It is intended for **local development and testing only**.


### Endpoint

**POST**

/api/UserImport/seed



### Request Format

- Content-Type: `multipart/form-data`
- Field name: `file`


### Example Request

```http
POST http://localhost:5093/api/UserImport/seed
Content-Type: multipart/form-data

Body:

file: users.xlsx
```

📊 Excel File Structure

The Excel file must contain the following columns:

| FirstName | LastName | JobTitle                              | Phone         | Email                                 |
| --------- | -------- | ------------------------------------- | ------------- | ------------------------------------- |
| Alex      | Leo      | Senior Software Engineer              | +447700900123 | [alex@test.com](mailto:alex@test.com) |
| John      | Smith    | Software Engineer                     | +447700900456 | [john@test.com](mailto:john@test.com) |

---

## Running the Full Stack

### Backend
cd UserSearch.Api  
dotnet run  

### Frontend
cd user-search-client  
npm install  
ng serve  

Open:
http://localhost:4200  

---

## Notes

- Frontend: http://localhost:4200  
- Backend:  http://localhost:5093
- Swagger:  http://localhost:5093/swagger
- Ensure CORS is enabled in API

---

## Future Improvements
- Caching
- JWT authentication
- Docker support
- CI/CD pipeline