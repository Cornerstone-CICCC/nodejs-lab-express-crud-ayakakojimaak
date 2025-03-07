"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const employees_routes_1 = __importDefault(require("./routes/employees.routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", employees_routes_1.default);
//fallback route
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
