import { useState } from "react";
import "./App.css";

export function NieuweAuto(props) {
  const [auto, setAuto] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    price: "",
  });

  const saveAuto = (event) => {
    event.preventDefault();

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
        // Redirect to the homepage using window.location
        window.location.href = "/";
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
          <input
            type="text"
            id="year"
            name="year"
            value={auto.year}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-600">
            Color:
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={auto.color}
            onChange={onChangeHandler}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
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
      </form>
    </section>
  );
}
