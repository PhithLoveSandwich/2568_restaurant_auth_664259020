import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import RestaurantServices from '../services/restaurant_services';
import Swal from 'sweetalert2';

const Form = () => {
  const [restaurant, setRestaurant] = useState({
    title: '',
    type: '',
    img: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await RestaurantServices.addRestaurant(restaurant);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Restaurant added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setRestaurant({
          title: '',
          type: '',
          img: '',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add restaurant",
      });
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-5">
              Grab Restaurant Add Form
            </h1>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Restaurant Title:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Title..."
                onChange={handleChange}
                value={restaurant.title}
                name="title"
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Restaurant Type:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type..."
                onChange={handleChange}
                value={restaurant.type}
                name="type"
              />
            </fieldset>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Restaurant Img:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="URL..."
                onChange={handleChange}
                value={restaurant.img}
                name="img"
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
                className="btn btn-outline btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                Add
              </button>
              <a
                href="/"
                className="btn btn-outline btn-secondary"
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

export default Form;
