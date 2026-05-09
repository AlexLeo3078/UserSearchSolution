# UserSearchSolution

A full-stack user search application built with:

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core + SQL Server
- Angular frontend (user-search-client)
- Mock + Real API switching support

---

## 📌 Index

- Features
- Technologies
- Architecture
- Project Structure
- Backend Setup
- Frontend Setup
- Mock vs Real API (Important)
- API Endpoints
- Database Reset (Full Dev Reset)
- Seed Database
- Running the Full Stack
- Notes
- Future Improvements

---

## ✨ Features

- Search users by first or last name (case-insensitive)
- Retrieve user by ID
- Create new users
- Email uniqueness validation
- SQL Server database with Entity Framework Core
- Angular frontend with live search UI
- Mock mode (JSON / in-memory data)
- Real API mode (ASP.NET Core backend)
- Full database reset and build script for development

---

## 🛠️ Technologies

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

## 🧠 Architecture

Angular Frontend  
→ UserService (Mock or API switch)  
→ ASP.NET Core Web API  
→ Entity Framework Core  
→ SQL Server Database  

---

## 📁 Project Structure

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
│   │   └── environments/
│
└── README.md
```
---

## 🚀 Backend Setup

cd UserSearch.Api  
dotnet run  

Backend runs at:
https://localhost:5093  

---

## 🌐 Frontend Setup

cd user-search-client  
npm install  
ng serve  

Frontend runs at:
http://localhost:4200  

---

## ⚙️ Mock vs Real API (IMPORTANT)

This project supports **two ways of getting data**:

---

### 🟡 Mock Mode (Frontend-only)

Mock mode uses **local or in-memory data inside the Angular app**.

✔ No backend required  
✔ Fast development  
✔ Useful for UI work  
✔ No network calls  

Example:

useMockApi: true  

Data is:
- hardcoded in service OR
- loaded from JSON file in assets/

---

### 🔵 Real API Mode (Backend + Database)

Real API mode connects Angular to the ASP.NET Core backend.

✔ Uses SQL Server database  
✔ Full end-to-end flow  
✔ Simulates production behaviour  
✔ Uses HTTP calls  

Example:

useMockApi: false  

Example API call:
https://localhost:5093/api/users/search?term=alex  

---

## 🔄 How to Switch Between Modes

You control the mode in:

src/environments/environment.ts  

### Mock mode
useMockApi: true  

### API mode
useMockApi: false  

👉 No code changes needed in components  
👉 Only environment flag changes behaviour  

---

## 🚀 How to Run Both Modes

### 🟡 Run Mock Mode (Frontend only)

1. Open Angular project
2. Ensure:

useMockApi: true  

3. Run:

cd user-search-client  
ng serve  

✔ App works without backend

---

### 🔵 Run Real API Mode (Full Stack)

1. Start backend:

cd UserSearch.Api  
dotnet run  

2. Start frontend:

cd user-search-client  
ng serve  

3. Set:

useMockApi: false  

✔ Angular calls .NET API  
✔ Data comes from SQL Server  

---

## 🔌 API Endpoints

### Get suggestions
GET /api/users/get-suggestion?searchTerm=alex  

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

## 🔁 Database Reset and Build (Full Dev Reset and Build)

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
## 🌱 Seed Database (Excel Import)

This endpoint allows you to populate the database using an Excel (.xlsx) file.  
It is intended for **local development and testing only**.

---

### 📌 Endpoint

**POST**

/api/UserImport/seed


---

### 📂 Request Format

- Content-Type: `multipart/form-data`
- Field name: `file`

---

### 📥 Example Request

```http
POST http://localhost:5093/api/UserImport/seed
Content-Type: multipart/form-data

Body:

file: users.xlsx
📊 Excel File Structure

The Excel file must contain the following columns:

| FirstName | LastName | JobTitle                              | Phone         | Email                                 |
| --------- | -------- | ------------------------------------- | ------------- | ------------------------------------- |
| Alex      | Leo      | Software Developer                    | +447700900123 | [alex@test.com](mailto:alex@test.com) |
| John      | Smith    | Developer                             | +447700900456 | [john@test.com](mailto:john@test.com) |

---

## 🚀 Running Full Stack (Summary)

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

## 🧠 Notes

- Frontend: http://localhost:4200  
- Backend: https://localhost:5093  
- Ensure CORS is enabled in API  
- Mock mode works without backend  
- API mode requires backend running  

---

## 📌 Future Improvements
- Caching
- JWT authentication
- Docker support
- CI/CD pipeline