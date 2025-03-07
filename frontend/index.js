const apiPath = "http://localhost:3000";

const getEmployees = async () => {
  const res = await fetch(`${apiPath}/employees`, {
    method: "GET",
  });

  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${response.statusText}`);
  }

  const data = await res.json();
  return data;
};

const getEmployeeById = async (id) => {
  const res = await fetch(`${apiPath}/employees/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to get employee: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};

const addEmployee = async (firstname, lastname, age, isMarried) => {
  const res = await fetch(`${apiPath}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add employee: ${response.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};

const updateEmployee = async (id, firstname, lastname, age, isMarried) => {
  const res = await fetch(`${apiPath}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update employee: ${response.statusText}`);
  }

  const data = await res.json(); // Updated employee data
  return data;
};

const deleteEmployee = async (id) => {
  const res = await fetch(`${apiPath}/employees/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete employee: ${res.statusText}`);
  }

  const data = await res.json(); // Deleted employee data
  return data;
};

const searchEmployee = async (query) => {
  const res = await fetch(`${apiPath}/employees/search?firstname=${query}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to search employee: ${response.statusText}`);
  }

  const data = await res.json();
  return data;
};

const viewEmployee = (employee) => {
  const viewSection = document.getElementById("view-employee");
  viewSection.innerHTML = `
    <h2>View Employee Info</h2>
    <p>First Name: ${employee.firstname}</p>
    <p>Last Name: ${employee.lastname}</p>
    <p>Age: ${employee.age}</p>
    <p>Married: ${employee.isMarried ? "Yes" : "No"}</p>
  `;
};

const renderEmployees = (employees) => {
  const employeeList = document.getElementById("employee-list");
  employeeList.innerHTML = "";

  employees.forEach((employee) => {
    const employeeItem = document.createElement("li");
    employeeItem.innerHTML = `
      <span>${employee.firstname} ${employee.lastname}</span>
      <button class="view-btn" data-id="${employee.id}">VIEW</button>
      <button class="edit-btn" data-id="${employee.id}">EDIT</button>
      <button class="delete-btn" data-id="${employee.id}">DELETE</button>
    `;
    employeeList.appendChild(employeeItem);
  });

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.target.getAttribute("data-id");
      const employee = await getEmployeeById(id);
      viewEmployee(employee);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.target.getAttribute("data-id");
      const employee = await getEmployeeById(id);

      document.getElementById("edit-first-name").value = employee.firstname;
      document.getElementById("edit-last-name").value = employee.lastname;
      document.getElementById("edit-age").value = employee.age;
      document.getElementById("edit-married").checked = employee.isMarried;

      const editForm = document.querySelector("#edit-employee form");
      editForm.setAttribute("data-employee-id", employee.id);

      document.getElementById("edit-employee").scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.target.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this employee?")) {
        await deleteEmployee(id);
        const employees = await getEmployees();
        renderEmployees(employees);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const employees = await getEmployees();
  renderEmployees(employees);

  document.querySelector("#add-employee form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstname = document.getElementById("first-name").value;
    const lastname = document.getElementById("last-name").value;
    const age = parseInt(document.getElementById("age").value, 10);
    const isMarried = document.getElementById("married").checked;

    await addEmployee(firstname, lastname, age, isMarried);

    event.target.reset();

    const employees = await getEmployees();
    renderEmployees(employees);
  });

  document.querySelector("#edit-employee form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data-employee-id");
    const firstname = document.getElementById("edit-first-name").value;
    const lastname = document.getElementById("edit-last-name").value;
    const age = parseInt(document.getElementById("edit-age").value, 10);
    const isMarried = document.getElementById("edit-married").checked;

    await updateEmployee(id, firstname, lastname, age, isMarried);

    const employees = await getEmployees();
    renderEmployees(employees);
  });

  document.querySelector("#search button").addEventListener("click", async () => {
    const query = document.querySelector("#search input").value.trim();
    if (query) {
      const results = await searchEmployee(query);
      viewEmployee(results);
    }
  });
});
