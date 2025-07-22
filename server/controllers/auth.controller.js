import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; // เข้ารหัสผ่าน
import jwt from "jsonwebtoken"; // สร้าง token

//import Operator
import { Op } from "sequelize";

const authController = {};

authController.signup = async (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).send({ message: "Username, Name, Email or Password can not be empty!" });
    }

    // Check if username already exists
    await User.findOne({ where: { username: username } }).then(async user => {
        if (user) {
            res.status(400).send({ message: "Username already exists!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            name,
            email,
            password: hashedPassword,
        };

        User.create(newUser).then((user) => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: { [Op.or]: req.body.roles }
                    }
                }).then((roles) => {
                    if (roles.length === 0) {
                        Role.findOne({ where: { name: "user" } }).then((role) => {
                            if (role) {
                                user.setRoles([role.id]).then(() => {
                                    res.send({ message: "User registered successfully!" });
                                });
                            } else {
                                res.status(500).send({ message: "Default role 'user' not found." });
                            }
                        });
                    } else {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    }
                });
            } else {
                Role.findOne({ where: { name: "user" } }).then((role) => {
                    if (role) {
                        user.setRoles([role.id]).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    } else {
                        res.status(500).send({ message: "Default role 'user' not found." });
                    }
                });
            }
        });
    });
};

export default authController;
