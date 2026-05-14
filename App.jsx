import { useEffect, useState } from "react";

function App() {

  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  // LOAD EMPLOYEES
  const loadEmployees = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/employees/"
    );

    const data = await response.json();

    setEmployees(data);
  };

  // ADD EMPLOYEE
  const addEmployee = async () => {

    await fetch(
      "http://127.0.0.1:8000/employees/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          department,
          email
        })
      }
    );

    loadEmployees();

    setName("");
    setDepartment("");
    setEmail("");
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {

    await fetch(
      `http://127.0.0.1:8000/employees/${id}`,
      {
        method: "DELETE"
      }
    );

    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={{
      width: "500px",
      margin: "40px auto",
      fontFamily: "Arial"
    }}>

      <h1>Employee Management</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={addEmployee}>
        Add Employee
      </button>

      <hr />

      {
        employees.map((emp) => (

          <div
            key={emp.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{emp.name}</h3>

            <p>{emp.department}</p>

            <p>{emp.email}</p>

            <button
              onClick={() => deleteEmployee(emp.id)}
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default App;