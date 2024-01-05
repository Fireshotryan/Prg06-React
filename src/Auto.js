import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export function Auto(props) {
  const [auto, setAuto] = useState(props.auto);
  const [isEditing, setIsEditing] = useState(false);

  // Handler for editing edit function
  const handleEdit = () => {
    setAuto(props.auto);
    setIsEditing(true);
  };

  // Handler for saving edit function
  const handleSave = (event) => {
    event.preventDefault();

    fetch(props.auto._links.self.href, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auto),
    }).then((response) => {
      if (response.ok) {
        setIsEditing(false);
        props.autosRefreshHandler();
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setAuto({
      ...auto,
      [event.target.name]: event.target.value,
    });
  };

  // Delete functionality
  const deleteAuto = () => {
    fetch(props.auto._links.self.href, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => props.autosRefreshHandler());
  };

  return (
    <section>
      {isEditing ? (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Auto - {auto.brand}</h2>
            <form>
              <label>
                Brand:
                <input
                  type="text"
                  value={auto.brand}
                  name="brand"
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Model:
                <input
                  type="text"
                  value={auto.model}
                  name="model"
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Year:
                <input
                  type="text"
                  value={auto.year}
                  name="year"
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Color:
                <input
                  type="text"
                  value={auto.color}
                  name="color"
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Price:
                <input
                  type="text"
                  value={auto.price}
                  name="price"
                  onChange={handleChange}
                />
              </label>
              <br />
              <button onClick={handleSave}>SAVE</button>
              <button onClick={handleCancel}>CANCEL</button>
            </form>
          </div>
        </div>
      ) : (
        // Displaying content in a row of three
        <div className="flex flex-wrap -mx-4">
          <div key={props.auto.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="auto bg-gray-200 p-4 rounded-md shadow-md mb-4">
              <h2 className="text-2xl font-bold mb-2">{auto.brand}</h2>
              <Link
                to={"autos/" + props.auto.id}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
              <div className="mt-2 space-x-2">
                <button onClick={handleEdit} className="btn-primary">
                  EDIT
                </button>
                <button onClick={deleteAuto} className="btn-danger">
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
