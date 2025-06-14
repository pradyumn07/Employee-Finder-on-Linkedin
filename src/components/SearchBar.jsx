// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ company, setCompany, onSearch }) {
  return (
    <div className="searchContainer">
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Search company e.g. Amazon"
        className="placeholder-search"
      />
      <button
        onClick={onSearch}
        className="buttonSearch"
      >
        Search
      </button>
    </div>
  );
}
