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

-- Sample Data for Users (For Testing)
INSERT INTO Users (Username, Email, PasswordHash)
VALUES 
('admin', 'admin@example.com', 'hashed_password1'),
('john_doe', 'john.doe@example.com', 'hashed_password2');
GO

-- Sample Data for Recipes (For Testing)
INSERT INTO Recipes (Title, Description, Category, Ingredients, Instructions, UserId)
VALUES 
('Spaghetti Bolognese', 'A classic Italian pasta dish.', 'Italian', 'Spaghetti, Tomato Sauce, Ground Beef', 'Cook pasta, prepare sauce, mix together.', 1),
('Chicken Curry', 'A rich and flavorful chicken curry.', 'Indian', 'Chicken, Curry Powder, Coconut Milk', 'Cook chicken, add spices, simmer.', 2);
GO