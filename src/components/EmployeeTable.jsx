
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/EmployeeTable.css";
import "../styles/Header.css";
import "../styles/SearchBar.css";

export default function EmployeeTable({ employees, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [theme, setTheme] = useState("dark");
  const [searchTerm, setSearchTerm] = useState("");

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const currentEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="loading-text">Loading employees...</div>;
  }

  return (
    <div className="employee-table-wrapper">
      

      <div className="table-header-bar">
        <div className="page-indicator">
          {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : "Page Not Available"}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr className="table-header-row">
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentEmployees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-employees-text">
                    No employees found for this company.
                  </td>
                </tr>
              ) : (
                currentEmployees.map((emp, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="table-row"
                  >
                    <td>
                      <div className="name-cell">
                        <div className="avatar">{emp.name?.charAt(0) || "?"}</div>
                        {emp.name || "N/A"}
                      </div>
                    </td>
                    <td>{emp.position || "N/A"}</td>
                    <td>{emp.email || "N/A"}</td>
                    <td>
                      {emp.linkedin ? (
                        <a
                          href={emp.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="linkedin-link"
                        >
                          LinkedIn
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}
