import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

export function NieuweAuto(props) {
  const [auto, setAuto] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    price: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  const saveAuto = (event) => {
    event.preventDefault();

    // Parse the year to an integer
    auto.year = parseInt(auto.year, 10);

    fetch("http://145.24.222.71:8000/autos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auto),
    }).then((response) => {
      if (response.ok) {
        props.autosRefreshHandler();
        setShowMessage(true);

        // Hide the message after 3 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);

        // Clear the form
        setAuto({
          brand: "",
          model: "",
          year: "",
          color: "",
          price: "",
        });
      }
    });
  };

  const onChangeHandler = (event) => {
    setAuto({
      ...auto,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <section className="container mx-auto mt-8">
      <form className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Nieuwe Auto</h2>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-600">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={auto.brand}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-600">
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={auto.model}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-600">
            Year:
          </label>
          <select
            id="year"
            name="year"
            value={auto.year}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select a year</option>
            {[...Array(2025 - 1990).keys()].map((i) => (
              <option key={1990 + i} value={1990 + i}>
                {1990 + i}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-600">
            Color:
          </label>
          <select
            id="color"
            name="color"
            value={auto.color}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select a color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            {/* ... (add more colors) */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={auto.price}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button onClick={saveAuto} className="btn-primary">
          SAVE
        </button>

        {/* Success message transition */}
        <CSSTransition in={showMessage} timeout={300} classNames="fade" unmountOnExit>
          <div className="success-message">Auto created!</div>
        </CSSTransition>
      </form>
    </section>
  );
}
