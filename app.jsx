import React, { useState } from "react";

export default function SortableTable() {
  const [employees, setEmployees] = useState([
    { name: "Alice", department: "HR", salary: 50000 },
    { name: "Bob", department: "IT", salary: 65000 },
    { name: "Charlie", department: "Finance", salary: 60000 },
    { name: "David", department: "IT", salary: 55000 },
    { name: "Eva", department: "Marketing", salary: 52000 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...employees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setEmployees(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Employee Table</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={() => handleSort("name")}>
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={thStyle} onClick={() => handleSort("department")}>
              Department {sortConfig.key === "department" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={thStyle} onClick={() => handleSort("salary")}>
              Salary {sortConfig.key === "salary" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#3f7944ff" : "#58298bff",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8d2c2cff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#749f24ff" : "#26206aff")
              }
            >
              <td style={tdStyle}>{emp.name}</td>
              <td style={tdStyle}>{emp.department}</td>
              <td style={tdStyle}>${emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: "80%",
  margin: "auto",
  borderCollapse: "collapse",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const thStyle = {
  border: "1px solid #1e6191ff",
  padding: "10px",
  cursor: "pointer",
  backgroundColor: "#c23d77ff",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #444a27ff",
  padding: "10px",
};

