"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeesRouter = (0, express_1.Router)();
let employeesList = [
    {
        id: "1",
        firstname: "John",
        lastname: "Smith",
        age: 40,
        isMarried: true,
    },
    {
        id: "2",
        firstname: "Jane",
        lastname: "Doe",
        age: 35,
        isMarried: false,
    },
    {
        id: "3",
        firstname: "Joe",
        lastname: "Moe",
        age: 28,
        isMarried: true,
    },
    {
        id: "4",
        firstname: "Alice",
        lastname: "Johnson",
        age: 45,
        isMarried: true,
    },
    {
        id: "5",
        firstname: "Bob",
        lastname: "Williams",
        age: 32,
        isMarried: false,
    },
];
employeesRouter.get("/employees", (req, res) => {
    res.json(employeesList);
});
employeesRouter.get("/employees/search", (req, res) => {
    const { firstname } = req.query;
    const result = employeesList.find((employee) => employee.firstname === firstname);
    if (!result) {
        res.status(404).json({ message: "Employee not found" });
    }
    else {
        res.json(result);
    }
});
employeesRouter.get("/employees/:id", (req, res) => {
    const { id } = req.params;
    const result = employeesList.find((employee) => employee.id === id);
    if (!result) {
        res.status(404).json({ message: "Employee not found" });
    }
    else {
        res.json(result);
    }
});
employeesRouter.post("/employees", (req, res) => {
    const employee = req.body;
    const newEmployee = Object.assign(Object.assign({}, employee), { id: (0, uuid_1.v4)() });
    employeesList.push(newEmployee);
    res.json(newEmployee);
});
employeesRouter.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    const result = employeesList.find((employee) => employee.id === id);
    if (!result) {
        res.status(404).json({ message: "Employee not found" });
    }
    else {
        const index = employeesList.indexOf(result);
        employeesList[index] = Object.assign(Object.assign({}, updatedEmployee), { id });
        res.json(employeesList[index]);
    }
});
employeesRouter.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
    const result = employeesList.find((employee) => employee.id === id);
    if (!result) {
        res.status(404).json({ message: "Employee not found" });
    }
    else {
        employeesList = employeesList.filter((employee) => employee.id !== id);
        res.json({ message: "Employee deleted" });
    }
});
exports.default = employeesRouter;
