import {DataTypes} from "sequelize"
import sequelize from "./db.js"
const Role = sequelize.define("role",{
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allNull: false,
    },
});
export default Role;