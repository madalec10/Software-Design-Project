import app from "../app.js";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
app.use(express.json())

const users = []

const getAllUsers = async (req, res) => {
    res.json(users)
}

const getUser = async (req, res) => {
    res.json(users.filter(user => user.email === req.user.email))
}

const signUp = async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if(user != null){
        return res.status(400).send("User already exists")
    }
    try {
            
        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = {
            email: req.body.email,
            password: hashedPassword
        }
        users.push(user)
        const token = jwt.sign(user, process.env.SECRET_TOKEN)
        res.json({
            token: token
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
            const token = jwt.sign(user, process.env.SECRET_TOKEN)
            res.json({
                token: token
            })
        }
        else{
            res.send("Not Authorized")
        }

    }
    catch {
        res.status(500).send("login failed")
    }
}


export { getAllUsers, getUser, signUp, logIn };