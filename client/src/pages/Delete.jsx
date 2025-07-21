import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from "../components/Navbar";

const Delete = () => {
  // 1. Get Id from Url
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    title: '',
    type: '',
    img: '',
  });

  // 2. Get Restaurant by ID
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/restaurant/" + id)
      .then((res) => res.json())
      .then((response) => setRestaurant(response))
      .catch((err) => console.log(err.message));
  }, [id]);
  
  //3. alert confrim
  const handleSubmit = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("http://localhost:5000/api/v1/restaurant/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Restaurant deleted successfully.");
        setRestaurant({
          title: '',
          type: '',
          img: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant Delete Form
        </h1>
      </div>
      <div className="flex flex-center justify-center">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Restaurant Title:</legend>
          <input
            type="text"
            className="input flex items-center gap-2 w-2xl"
            placeholder="Title..."
            onChange={() => {}}
            value={restaurant.title}
            name="title"
            disabled
          />
        </fieldset>
      </div>
      <div className="flex flex-center justify-center">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Restaurant Type:</legend>
          <input
            type="text"
            className="input flex items-center gap-2 w-2xl"
            placeholder="Type..."
            onChange={() => {}}
            value={restaurant.type}
            name="type"
            disabled
          />
        </fieldset>
      </div>
      <div className="flex flex-center justify-center">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Restaurant Img:</legend>
          <input
            type="text"
            className="input flex items-center gap-2 w-2xl"
            placeholder="Url..."
            onChange={() => {}}
            value={restaurant.img}
            name="img"
            disabled
          />
        </fieldset>
      </div>
      <div className="flex flex-center justify-center">
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
        <a className="btn btn-outline btn-secondary" onClick={handleSubmit}>Delete</a>
        <a className="btn btn-outline btn-primary" href="/">Cancel</a>
      </div>
    </div>
  );
};

export default Delete;
