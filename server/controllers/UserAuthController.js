import app from "../app.js";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { createUser } from "./UserProfileController.js";

import db from "../db.js";


const hashedPassword1 = bcrypt.hashSync("password1111", 10);
const hashedPassword2 = bcrypt.hashSync("password1234", 10);


// const users = [
//   {
//     email: "volunteer@gmail.com",
//     password: hashedPassword1,
//     role: "Volunteer"
//   },
//   {
//     email: "admin@gmail.com",
//     password: hashedPassword2,
//     role: "Admin"
//   },
// ];

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT email, role FROM userCredentials");
        res.status(200).json(rows);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
}

const getUser = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT email, role FROM userCredentials WHERE email = ?", [req.user.email]);
        res.json(rows[0]);
    } 
    catch (err) {
        res.status(500).send("Database error");
    }
}

const signUp = async (req, res) => {
    const { email, password } = req.body;
    
    
    try {
        
        const [existing] = await db.query("SELECT * FROM userCredentials WHERE email = ?", [email]);
        if(existing.length > 0){
            return res.status(400).send("User already exists")
        }
            
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(salt)
        console.log(hashedPassword)

        await db.query(
            "INSERT INTO userCredentials (email, password, role) VALUES (?, ?, ?)",
            [email, hashedPassword, "Volunteer"]
        );

        await createUser(email);

        const token = jwt.sign({ email: email, role: "Volunteer" }, process.env.SECRET_TOKEN)
        res.cookie("token", token, {
            httpOnly: true,   // prevents client-side JS from reading cookie
            sameSite: "strict", // CSRF protection
            maxAge: 60 * 60 * 1000 * 24 // 24 hours
        });
        res.status(200).json({
            email: email,
            role: "Volunteer"
        })
        
            
    }
    catch(err) {
        console.log(err)
        res.status(500).send("hash failed to generate")
    }
}

const logIn = async (req, res) => {
    //Authenticate user
    const { email, password } = req.body;

    
    
    try {
        const [rows] = await db.query("SELECT * FROM userCredentials WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) {
            return res.status(400).send("Cannot find user");
        }
        
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_TOKEN)
            res.cookie("token", token, {
                httpOnly: true,   // prevents client-side JS from reading cookie
                sameSite: "strict", // CSRF protection
                maxAge: 60 * 60 * 1000 * 24 // 24 hours
            });
            res.status(200).json({
                email: user.email,
                role: user.role
            })
        }
        else{
            res.status(401).send("Not Authorized")
        }

    }
    catch {
        res.status(500).send("login failed")
    }
}

const logOut = async(req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
}


export { getAllUsers, getUser, signUp, logIn, logOut };