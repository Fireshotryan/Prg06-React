import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export function Auto({ auto, autosRefreshHandler }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedAuto, setEditedAuto] = useState(auto);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAuto(auto);
  };

  const handleSave = (event) => {
    event.preventDefault();

    fetch(auto._links.self.href, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedAuto),
    }).then((response) => {
      if (response.ok) {
        setIsEditing(false);
        autosRefreshHandler();
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditedAuto({
      ...editedAuto,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    fetch(auto._links.self.href, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }).then(() => {
      setIsDeleting(false);
      autosRefreshHandler();
    });
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div key={auto.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
      {isEditing ? (
        // Modal for editing
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="text-2xl font-bold mb-2">Edit Auto - {auto.brand}</h2>
            <form>
              <label className="block mb-2">
                Brand:
                <input
                  type="text"
                  value={editedAuto.brand}
                  name="brand"
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2">
                Model:
                <input
                  type="text"
                  value={editedAuto.model}
                  name="model"
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2">
                Year:
                <input
                  type="text"
                  value={editedAuto.year}
                  name="year"
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2">
                Color:
                <input
                  type="text"
                  value={editedAuto.color}
                  name="color"
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <label className="block mb-2">
                Price:
                <input
                  type="text"
                  value={editedAuto.price}
                  name="price"
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn-primary mr-2"
                >
                  SAVE
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Displaying content
        <div className="auto bg-gray-200 p-4 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-2">{auto.brand}</h2>
          <Link
            to={"autos/" + auto.id}
            className="text-blue-500 hover:underline"
          >
            Read more
          </Link>
          <div className="mt-2 space-x-2">
            <button onClick={handleEdit} className="btn-primary">
              EDIT
            </button>
            <button onClick={handleDelete} className="btn-danger">
              DELETE
            </button>
          </div>
        </div>
      )}

      {/* Confirmation modal for deleting */}
      {isDeleting && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the auto with the following
              details?
            </p>
            <ul>
              <li>
                <strong>Brand:</strong> {auto.brand}
              </li>
              <li>
                <strong>Model:</strong> {auto.model}
              </li>
              <li>
                <strong>Year:</strong> {auto.year}
              </li>
              <li>
                <strong>Color:</strong> {auto.color}
              </li>
              <li>
                <strong>Price:</strong> {auto.price}
              </li>
            </ul>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={confirmDelete}
                className="btn-danger mr-2"
              >
                DELETE
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                className="btn-secondary"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
