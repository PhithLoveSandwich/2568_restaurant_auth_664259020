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
        timer: 1500
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

  // const handleSubmit = async () => {
  //   try {
  //     const response = await RestaurantServices.addRestaurant(restaurant);
  //     if (response.status === 200) {
  //       alert("Restaurant added successfully");
  //       setRestaurant({
  //         title: '',
  //         type: '',
  //         img: '',
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Failed to add restaurant",
  //     });
  //     console.error("Error adding restaurant:", error);
  //   }
  // };

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="title justify-center text-3xl text-center m-5 p-5">
        Grab Restaurant Add Form
      </h1>
      <div className='flex flex-center justify-center'>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Restaurant Title:</legend>
          <input
            type="text"
            className="input flex items-center gap-2 w-2xl"
            placeholder="Title..."
            onChange={handleChange}
            value={restaurant.title}
            name="title"
          />
        </fieldset>
      </div>
      <div className='flex flex-center justify-center'>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Restaurant Type:</legend>
          <input
            type="text"
            className="input flex items-center gap-2 w-2xl"
            placeholder="Type..."
            onChange={handleChange}
            value={restaurant.type}
            name="type"
          />
        </fieldset>
      </div>
      <div className='flex flex-center justify-center'>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Restaurant Img:</legend>
          <input
            type="text"
            className="input flex items-center gap-2 w-2xl"
            placeholder="URL..."
            onChange={handleChange}
            value={restaurant.img}
            name="img"
          />
        </fieldset>
      </div>
      <div className='flex flex-center justify-center'>
        {restaurant.img && (
          <img
            src={restaurant.img}
            alt="Restaurant preview"
            className="mt-4 max-w-xs max-h-64 object-contain border rounded"
            onError={(e) => {
              e.target.src = '';
            }}
          />
        )}
      </div>
      <div className="flex flex-center justify-center gap-4 mt-6">
        <button
          className="btn btn-outline btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Add
        </button>
        <a href="/" className="btn btn-outline btn-secondary">Cancel</a>
      </div>
    </div>
  );
};

export default Form;
