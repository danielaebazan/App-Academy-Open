-- Your code here
-- Adding Employees
INSERT INTO Employees (FirstName, LastName, DepartmentID, Role)
VALUES
    ('Michael', 'Scott', 1, 'Regional Manager'), -- Assuming Management department ID is 1
    ('Dwight', 'Schrute', 2, 'Assistant Regional Manager'), -- Sales department ID: 2
    ('Jim', 'Halpert', 2, 'Sales Representative'),
    ('Pam', 'Beesly', 3, 'Receptionist'), -- Reception department ID: 3
    ('Kelly', 'Kapoor', 4, 'Customer Service Representative'), -- Product Oversight department ID: 4
    ('Angela', 'Martin', 5, 'Head of Accounting'), -- Accounting department ID: 5
    ('Roy', 'Anderson', 6, 'Warehouse Staff'); -- Warehouse department ID: 6

-- Creating Relationships
INSERT INTO Relationships (Employee1ID, Employee2ID)
VALUES
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Roy' AND LastName = 'Anderson'),
     (SELECT EmployeeID FROM Employees WHERE FirstName = 'Pam' AND LastName = 'Beesly')),
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Angela' AND LastName = 'Martin'),
     (SELECT EmployeeID FROM Employees WHERE FirstName = 'Dwight' AND LastName = 'Schrute')),
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Ryan' AND LastName = 'Howard'),
     (SELECT EmployeeID FROM Employees WHERE FirstName = 'Kelly' AND LastName = 'Kapoor'));

-- Adding new employee and updating role
INSERT INTO Employees (FirstName, LastName, DepartmentID, Role)
VALUES ('Ryan', 'Howard', 3, 'Temp'); -- Reception department ID: 3

UPDATE Employees SET Role = 'Assistant Regional Manager'
WHERE FirstName = 'Jim' AND LastName = 'Halpert';

UPDATE Employees SET Role = 'Sales Representative'
WHERE FirstName = 'Ryan' AND LastName = 'Howard';

-- Inserting Parties
INSERT INTO Parties (Budget, PartyType, PartyDate)
VALUES
    (100.00, 'Onsite', '2023-11-20'),
    (200.00, 'Onsite', '2023-12-05'),
    (50.00, 'Onsite', '2023-12-15'),
    (120.00, 'Onsite', '2023-12-20'),
    (300.00, 'Offsite', '2023-12-20'); -- assuming a cancellation of a party with a budget of $120.00

-- Inserting Performance Reviews
INSERT INTO PerformanceReviews (EmployeeID, Score, ReviewDate)
VALUES
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Dwight' AND LastName = 'Schrute'), 3.3, '2023-11-20'),
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert'), 4.2, '2023-11-20');

-- Updating Performance Reviews
UPDATE PerformanceReviews SET Score = 9.0
WHERE EmployeeID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Dwight' AND LastName = 'Schrute');

UPDATE PerformanceReviews SET Score = 9.3
WHERE EmployeeID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert');

-- Removing Relationships and Performance Reviews
DELETE FROM Relationships WHERE Employee1ID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert');
DELETE FROM Relationships WHERE Employee2ID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert');

DELETE FROM PerformanceReviews WHERE EmployeeID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert');

-- Updating Employees
UPDATE Employees SET DepartmentID = 2, Role = 'Sales Representative'
WHERE FirstName = 'Jim' AND LastName = 'Halpert';

-- Inserting New Employee and Removing Relationships/Performance Reviews
INSERT INTO Employees (FirstName, LastName, DepartmentID, Role)
VALUES ('Karen', 'Filippelli', 2, 'Sales Representative');

DELETE FROM Relationships WHERE Employee1ID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Karen' AND LastName = 'Filippelli');
DELETE FROM Relationships WHERE Employee2ID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Karen' AND LastName = 'Filippelli');

DELETE FROM PerformanceReviews WHERE EmployeeID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Karen' AND LastName = 'Filippelli');

-- Inserting New Relationships
INSERT INTO Relationships (Employee1ID, Employee2ID)
VALUES
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Karen' AND LastName = 'Filippelli'),
     (SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert'));

-- Inserting New Relationship
INSERT INTO Relationships (Employee1ID, Employee2ID)
VALUES
    ((SELECT EmployeeID FROM Employees WHERE FirstName = 'Pam' AND LastName = 'Beesly'),
     (SELECT EmployeeID FROM Employees WHERE FirstName = 'Jim' AND LastName = 'Halpert'));

-- Updating Party (Assuming ID 5 is the party right before ID 4)
UPDATE Parties SET Budget = 300.00, PartyType = 'Offsite'
WHERE PartyID = 5;

-- Removing Relationships and Performance Reviews for Ryan Howard
DELETE FROM Relationships WHERE Employee1ID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Ryan' AND LastName = 'Howard');
DELETE FROM Relationships WHERE Employee2ID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Ryan' AND LastName = 'Howard');

DELETE FROM PerformanceReviews WHERE EmployeeID = (SELECT EmployeeID FROM Employees WHERE FirstName = 'Ryan' AND LastName = 'Howard');
