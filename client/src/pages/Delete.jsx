import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import RestaurantServices from '../services/restaurant_services';
import Navbar from "../components/Navbar";
const Delete = () => {
  // 1. Get Id from URL
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({
    title: '',
    type: '',
    img: '',
  });

  // 2. Get Restaurant by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/restaurant/${id}`)
      .then((res) => res.json())
      .then((response) => setRestaurant(response))
      .catch((err) => console.log(err.message));
  }, [id]);

  // 3. Delete restaurant
  const handleSubmit = async () => {
    const response = await RestaurantServices.deleteRestaurant(id);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Restaurant deleted successfully",
      });
      setRestaurant({
        title: '',
        type: '',
        img: '',
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete restaurant",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-5">
              Grab Restaurant Delete Form
            </h1>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Restaurant Title:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Title..."
                value={restaurant.title}
                name="title"
                disabled
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Restaurant Type:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type..."
                value={restaurant.type}
                name="type"
                disabled
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Restaurant Img:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="URL..."
                value={restaurant.img}
                name="img"
                disabled
              />
            </fieldset>

            {restaurant.img && (
              <div className="flex justify-center mb-4">
                <img
                  src={restaurant.img}
                  alt="Restaurant preview"
                  className="max-w-xs max-h-64 object-contain border rounded"
                  onError={(e) => { e.target.src = ''; }}
                />
              </div>
            )}

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-outline btn-secondary"
                type="button"
                onClick={handleSubmit}
              >
                Delete
              </button>
              <a
                href="/"
                className="btn btn-outline btn-primary"
              >
                Cancel
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
