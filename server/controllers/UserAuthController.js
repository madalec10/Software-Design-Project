import app from "../app.js";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { createUser } from "./UserProfileController.js";
import { userData } from "./UserProfileController.js";


const hashedPassword1 = bcrypt.hashSync("password1111", 10);
const hashedPassword2 = bcrypt.hashSync("password1234", 10);


const users = [
  {
    email: "volunteer@gmail.com",
    password: hashedPassword1,
    role: "Volunteer"
  },
  {
    email: "admin@gmail.com",
    password: hashedPassword2,
    role: "Admin"
  },
];

const getAllUsers = async (req, res) => {
    res.status(200).json(users)
}

const getUser = async (req, res) => {
    res.json(users.filter(user => user.email === req.user.email))
}

const signUp = async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if(user != null){
        return res.status(400).send("User already exists")
    }
    console.log(process.env.SECRET_TOKEN)
    try {
            
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = {
            email: req.body.email,
            password: hashedPassword,
            role: "Volunteer"
        }
        users.push(user)
        createUser(user.email);
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
    catch {
        res.status(500).send("hash failed to generate")
    }
}

const logIn = async (req, res) => {
    //Authenticate user
    const user = users.find(user => user.email === req.body.email)
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
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