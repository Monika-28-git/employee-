from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

employees = []

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.get("/employees/")
def get_employees():
    return employees

@app.post("/employees/")
def create_employee(employee: dict):

    employee["id"] = len(employees) + 1

    employees.append(employee)

    return {
        "message": "Employee Added"
    }

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):

    global employees

    employees = [
        emp for emp in employees
        if emp["id"] != employee_id
    ]

    return {
        "message": "Employee Deleted"
    }