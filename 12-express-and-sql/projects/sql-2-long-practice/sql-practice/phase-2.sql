-- Your code here

-- Employees Table
CREATE TABLE Employees (
    EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT,
    LastName TEXT,
    DepartmentID INTEGER,
    Role TEXT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

-- Relationships Table
CREATE TABLE Relationships (
    RelationshipID INTEGER PRIMARY KEY AUTOINCREMENT,
    Employee1ID INTEGER,
    Employee2ID INTEGER,
    RelationshipType TEXT, -- if needed
    StartDate DATE, -- if needed
    EndDate DATE -- if needed
    -- FOREIGN KEY constraints if applicable
);

-- PerformanceReviews Table
CREATE TABLE PerformanceReviews (
    ReviewID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmployeeID INTEGER,
    Score INTEGER,
    ReviewDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Parties Table
CREATE TABLE Parties (
    PartyID INTEGER PRIMARY KEY AUTOINCREMENT,
    Budget REAL,
    PartyType TEXT,
    PartyDate DATE
);

-- PartyAttendees Table
CREATE TABLE PartyAttendees (
    AttendanceID INTEGER PRIMARY KEY AUTOINCREMENT,
    PartyID INTEGER,
    EmployeeID INTEGER,
    FOREIGN KEY (PartyID) REFERENCES Parties(PartyID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
