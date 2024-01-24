import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Error } from "./Error";
import { AutoDetail } from "./AutoDetail";
import { NieuweAuto } from "./NieuweAuto";
import { Auto } from "./Auto";
import { FavoriteAuto } from "./FavoriteAuto"; // Import the FavoriteAuto component
import "./App.css";

const URI_COLLECTION = "http://145.24.222.71:8000/autos";
const itemsPerPage = 9;

export function App() {
  const [autos, setAutos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [yearRange, setYearRange] = useState({ min: 1990, max: 2024 });
  const [favorites, setFavorites] = useState(new Set());

  const fetchData = async () => {
    try {
      const response = await fetch(URI_COLLECTION);
      const result = await response.json();
      setAutos(result.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleFavorite = (autoId) => {
    const newFavorites = new Set(favorites);

    if (newFavorites.has(autoId)) {
      newFavorites.delete(autoId);
    } else {
      newFavorites.add(autoId);
    }

    setFavorites(newFavorites);
  };


  const removeFromFavorites = (autoId) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(autoId);
    setFavorites(newFavorites);
  };

  const filteredAutos = autos.filter((auto) => {
    const matchesSearch = auto.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesColor = selectedColor ? auto.color.toLowerCase() === selectedColor.toLowerCase() : true;
    const matchesYear = auto.year >= yearRange.min && auto.year <= yearRange.max;
    return matchesSearch && matchesColor && matchesYear;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const autosForPage = filteredAutos.slice(startIndex, endIndex);

  const showAutos = autosForPage.map((value) => (
    <Auto
      key={value.id}
      auto={value}
      autosRefreshHandler={fetchData}
      toggleFavorite={toggleFavorite}
      favorites={favorites}
    />
  ));

  const totalPages = Math.ceil(filteredAutos.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => goToPage(1);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToLastPage = () => goToPage(totalPages);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => goToPage(i)} disabled={currentPage === i}>
        {i}
      </button>
    );
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setCurrentPage(1); // Reset to the first page when the color selection changes
  };

  const handleYearChange = (e) => {
    const selectedValue = e.target.value;
    setYearRange({
      min: selectedValue === "All Years" ? 1990 : parseInt(selectedValue, 10),
      max: selectedValue === "All Years" ? 2024 : parseInt(selectedValue, 10),
    });
    setCurrentPage(1);
  };

  const fixedElementHeight = "40px";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={
              <>
                {/* Search and Color Filter */}
                <div className="flex justify-center my-4" style={{ height: fixedElementHeight }}>
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border rounded-md px-2 py-1 mr-2 focus:outline-none focus:border-blue-500"
                  />
                  <select
                    value={selectedColor}
                    onChange={handleColorChange}
                    className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">All Colors</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                  </select>
                </div>

                {/* Year Range Search */}
                <div className="flex justify-center my-4" style={{ height: fixedElementHeight }}>
                  <label className="text-lg font-bold mr-2">Select Year:</label>
                  <select
                    value={yearRange.min === 1990 && yearRange.max === 2024 ? "All Years" : yearRange.min}
                    onChange={handleYearChange}
                    name="min"
                    className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                  >
                    <option value="All Years">All Years</option>
                    {[...Array(2025 - 1990).keys()].map((i) => (
                      <option key={1990 + i} value={1990 + i}>
                        {1990 + i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pagination */}
                <div className="flex justify-center my-4" style={{ height: fixedElementHeight }}>
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    First Page
                  </button>
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    Previous Page
                  </button>
                  {paginationButtons.map((button, index) => (
                    <span key={index} className="mx-1">
                      {button}
                    </span>
                  ))}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    Next Page
                  </button>
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    Last Page
                  </button>
                </div>

                {/* Autos */}
                {showAutos}
              </>
            }
          />
   <Route
            path="favorites"
            element={
              <FavoriteAuto
                favorites={favorites}
                autos={autos}
                autosRefreshHandler={removeFromFavorites}
              />
            }
          />
          <Route path="create" element={<NieuweAuto autosRefreshHandler={fetchData} />} />
          <Route path="autos/:id" element={<AutoDetail />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
