import {DataTypes} from "sequelize"
import sequelize from "./db.js"
const Restaurant = sequelize.define("restaurant",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allNull: false,
    },
});

Restaurant.sync({force:false})
.then(() => {
    console.log("Table created or already exists");
})
.catch((error)=>{
    console.log("Error creating table", error);
});
export default Restaurant;