// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";
import axios from "axios";

export default function App() {
  const [company, setCompany] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/employees?company=${company}`);
      setEmployees(res.data);
    } catch (err) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6 font-sans">
      <Header />
      <SearchBar
        company={company}
        setCompany={setCompany}
        onSearch={fetchEmployees}
      />
      <EmployeeTable employees={employees} loading={loading} />
    </div>
  );
}
