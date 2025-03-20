# 🍽️ Recipe Management System

A full-stack web application designed to manage recipes efficiently using **React.js**, **ASP.NET Core Web API**, and **SQL Server**.

---

## 📋 Features
✅ User Registration & Login  
✅ Recipe CRUD Operations (Create, Read, Update, Delete)  
✅ Real-time Recipe Updates using **SignalR**  
✅ Image Upload for Recipes  
✅ Search & Filter Functionality  
✅ Enhanced UI with **Bootstrap** and Custom Design  

---

## 🏗️ Project Structure
```
/client
 └── /src
     ├── /components
     ├── /pages
     ├── /store
     ├── /Utils
     ├── /services
     ├── App.js
     ├── index.js
/server
 ├── /Controllers
 ├── /Models
 ├── /Data
 ├── /Services
 ├── /Hubs
 ├── /Migrations
 ├── appsettings.json
 ├── Program.cs
/database
 ├── setup.sql
 ├── README.md
```
---

## 🗃️ Step 1: Database Setup (SQL Server ensure that you have SSMS server in your system)
1. **Create a database folder inside that create a setup.sql**.
2. Paste the following code in setup.sql

```sql
-- Create the Recipes Database
CREATE DATABASE RecipeManagementSystem;
GO

-- Use the newly created database
USE RecipeManagementSystem;
GO

-- Create the Users Table (For Registration and Authentication)
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Create the Recipes Table
CREATE TABLE Recipes (
    Id INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(MAX) NOT NULL,
    Description NVARCHAR(MAX),
    Category NVARCHAR(100) NOT NULL,  -- Added Category Field
    Ingredients NVARCHAR(MAX),        -- Stores ingredients as a text field
    Instructions NVARCHAR(MAX),
    Image VARBINARY(MAX),             -- For image storage
    UserId INT NOT NULL,              -- Links the recipe to its creator
    CreatedAt DATETIME DEFAULT GETDATE(),

    -- Foreign Key Constraint (Links to Users Table)
    CONSTRAINT FK_Recipes_Users 
    FOREIGN KEY (UserId) REFERENCES Users(Id)
    ON DELETE NO ACTION              -- Ensures deleting a user doesn't delete their recipes
);
GO

---

## 🌐 Step 2: Backend Setup (ASP.NET Core Web API)
### Prerequisites
✅ .NET 9 SDK Installed  
✅ Visual Studio Code 

1. Navigate to `/server` in your terminal.  
2. Restore dependencies with:  
```bash
dotnet restore
```
3. Apply database migrations:

#IMPORTANT!!!!!
      you need to update the DefaultConnections 
      '''
        "ConnectionStrings": {
            "DefaultConnection": "Server=Your-serverName;Database=DBname;User Id=your-userId;Password=Your-pass;MultipleActiveResultSets=true;TrustServerCertificate=True"
        },
        '''

#you need to delete the Migration folder in Server and run the following commands:

```bash
dotnet ef migrations add InitialCreate  #This will create a Migration Folder in Server
dotnet ef database update # here by using this command the database and tables will create in your SSMS server.
```


4. Run the ASP.NET Core API:  
```bash
dotnet run
```

**API Base URL:** `http://localhost:5116/`

---

## ⚛️ Step 3: Frontend Setup (React.js)
### Prerequisites
✅ Node.js and npm Installed  

1. Navigate to `/client` in your terminal.  
2. Install dependencies:  
```bash
npm install
```
3. Start the React app:  
```bash
npm start
```

**React URL:** `http://localhost:3000/`

---

## 🚀 Step 4: Running the Project
1. Ensure your database is running in **SQL Server**.  
2. Start the **ASP.NET Core Web API** using `dotnet run`.  
3. Start the **React Frontend** using `npm start`.  
4. Visit `http://localhost:3000` to explore the Recipe Management System.  

---

## 🔍 Step 5: Key Functionalities
- **Homepage:** Displays project details and navigation.  
- **Register & Login:** Secure user authentication.  
- **All Recipes Page:** Lists all recipes with search and filter options.  
- **Your Recipes Page:** Displays logged-in user's recipes with edit & delete options.  
- **Add Recipe Form:** Allows users to add new recipes with images.  
- **Edit Recipe Form:** Enables modifying existing recipes.  
- **SignalR Real-time Update:** Ensures updates are instantly reflected without refreshing.  

---

## ⚙️ Step 6: Dependencies
### Frontend Dependencies
- `axios`
- `react-router-dom`
- `react-bootstrap`
- `react-redux`
- `Formik`
- `Yup`
- `@microsoft/signalr`  

### Backend Dependencies
- `Microsoft.EntityFrameworkCore`
- `Microsoft.AspNetCore.SignalR`
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Tools`
- `Microsoft.AspNetCore.Identity`
- `Swashbuckle.AspNetCore`
- `RMicrosoft.AspNetCore.Authentication`  

---

## 💡 Happy Cooking & Sharing Delicious Recipes! 🍲
