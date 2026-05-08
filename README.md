# UserSearchSolution

A .NET 8 ASP.NET Core Web API for user search and management using Entity Framework Core and SQL Server.

---

## 📌 Index

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Reset Database](#reset-database-full-dev-reset)
- [Getting Started](#getting-started)

---

## ✨ Features

- 🔍 Search users by first or last name (case-insensitive)
- 👤 Retrieve user by ID
- ➕ Create new users
- ❌ Email uniqueness validation
- 🗄️ SQL Server database using Entity Framework Core
- 🔁 Automated database reset script for development

---

## 🛠️ Technologies

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core 8
- SQL Server (LocalDB)
- C#

---

## 📁 Project Structure



```text
UserSearchSolution/
│
├── UserSearch.Api/
│
│   ├── Controllers/
│   │   └── UsersController.cs
│   │
│   ├── Models/
│   │   └── User.cs
│   │
│   ├── Data/
│   │   └── AppDbContext.cs
│   │
│   ├── Migrations/
│   │   └── (EF Core migrations)
│   │
│   ├── Build/
│   │   └── reset-db.ps1
│   │
│   ├── appsettings.json
│   ├── Program.cs
│   └── UserSearch.Api.csproj
│
└── README.md
```


---

## 🚀 API Endpoints

### 🔍 Search Users
**GET** `/api/users/search?term=alex`

Search users by first or last name.

---

### 👤 Get User by ID
**GET** `/api/users/{id}`

Returns a single user by ID.

---

### ➕ Create User
**POST** `/api/users`

Creates a new user.

#### Request Body:

```json
{
  "firstName": "Alex",
  "lastName": "Leo",
  "email": "alex@test.com",
  "phone": "+447700900123",
  "jobTitle": "Software Engineer"
}
```

## 🔁 Reset Database (FULL DEV RESET)

This project includes a PowerShell script that completely resets the database and Entity Framework migrations.

It is useful for:
- Starting from a clean state
- Rebuilding schema after model changes
- Avoiding migration conflicts during development

---

### 📍 Script Location


UserSearch.Api/Build/reset-db.ps1


---

### ▶️ How to Run

1. Open **PowerShell**
2. Navigate to the script folder:
```powershell
cd UserSearch.Api/Build
Run the script:
.\reset-db.ps1
```
3. The script will:
   - Drop the existing database
   - Delete all migration files
   - Create a new migration
   - Update the database with the new schema