import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

const URI_COLLECTION = "http://145.24.222.71:8000/autos";

export function AutoDetail() {
  const params = useParams();

  const [auto, setAutos] = useState(null);

  const loadJson = () => {
    fetch(URI_COLLECTION + "/" + params.id, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setAutos(result));
  };

  useEffect(() => {
    loadJson();
  }, []);

  return (
    <section className="container mx-auto mt-10">
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">
        &lt; Back to Home
      </Link>
      {auto ? (
        <div className="bg-gray-200 p-8 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-4">{auto.brand}</h1>
          <p className="text-lg mb-2">Model: {auto.model}</p>
          <p className="text-lg mb-2">Year: {auto.year}</p>
          <p className="text-lg mb-2">Color: {auto.color}</p>
          <p className="text-lg mb-4">Price: {auto.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
