import api from "./api"

const RESTO_API = import.meta.env.VITE_RES_API;

//get all restaurants
const getAllRestaurants = async () => {
    return await api.get(RESTO_API);
}

//get restaurant by id
const getRestaurantById = async (id) => {
    return await api.get(`${RESTO_API}/${id}`);
}

//add a new restaurant
const addRestaurant = async (restaurant) => {
    return await api.post(RESTO_API, restaurant);
}

//update restaurant by id
const updateRestaurant = async (id, restaurant) => {
    return await api.put(`${RESTO_API}/${id}`, restaurant);
}

//delete restaurant by id
const deleteRestaurant = async (id) => {
    return await api.delete(`${RESTO_API}/${id}`);
}

const RestaurantServices = {
    getAllRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
};

export default RestaurantServices;