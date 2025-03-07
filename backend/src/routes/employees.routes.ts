import { Router, Request, Response } from "express";
import type { Employee } from "../types/employees";
import { v4 as uuidv4 } from "uuid";
const employeesRouter = Router();

let employeesList: Employee[] = [
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

employeesRouter.get("/employees", (req: Request, res: Response) => {
  res.json(employeesList);
});

employeesRouter.get("/employees/search", (req: Request, res: Response) => {
  const { firstname } = req.query;
  const result = employeesList.find((employee) => employee.firstname === firstname);
  if (!result) {
    res.status(404).json({ message: "Employee not found" });
  } else {
    res.json(result);
  }
});

employeesRouter.get("/employees/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const result = employeesList.find((employee) => employee.id === id);
  if (!result) {
    res.status(404).json({ message: "Employee not found" });
  } else {
    res.json(result);
  }
});

employeesRouter.post("/employees", (req: Request<{}, {}, Omit<Employee, "id">>, res: Response) => {
  const employee = req.body;
  const newEmployee = { ...employee, id: uuidv4() };
  employeesList.push(newEmployee);
  res.json(newEmployee);
});

employeesRouter.put("/employees/:id", (req: Request<{ id: string }, {}, Omit<Employee, "id">>, res: Response) => {
  const { id } = req.params;
  const updatedEmployee = req.body;
  const result = employeesList.find((employee) => employee.id === id);
  if (!result) {
    res.status(404).json({ message: "Employee not found" });
  } else {
    const index = employeesList.indexOf(result);
    employeesList[index] = { ...updatedEmployee, id };
    res.json(employeesList[index]);
  }
});

employeesRouter.delete("/employees/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const result = employeesList.find((employee) => employee.id === id);
  if (!result) {
    res.status(404).json({ message: "Employee not found" });
  } else {
    employeesList = employeesList.filter((employee) => employee.id !== id);
    res.json({ message: "Employee deleted" });
  }
});

export default employeesRouter;
