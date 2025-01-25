const apiRoute="/api";
const mongoose=require("mongoose");
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const { Post, User } = require("./models");
require('dotenv').config();

//authentication using Auth 0
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '39b60638dc691eca041dde485efcec76f157beca5178c4f7d3995ba5b638ba2e',
  baseURL: 'http://localhost:3000',
  clientID: 'dvjGf2OKJVIyBbe1CzfEd49Mv5w6qvAe',
  issuerBaseURL: 'https://dev-e7kgps1tdzn1v0hl.us.auth0.com'
};




function loadApi (app){
    // req.isAuthenticated is provided from the auth router
    app.get('/', (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });

    //login handle
    app.post(apiRoute + '/login', async (req, res) => {
        console.log("POST /login")
        if (req.body==undefined|| !("username" in req.body) || !("password" in req.body)){
            res.status(400)//bad request
            return res("missing username or pasword")
        }

        const username=req.body.username.toLowerCase();
        const password=req.body.password.toLowerCase();


        // Check user
        const user = await User.findOne({ username: username })

        if (!user || user.password == undefined) {
            res.status(403); 
            return res.send("Invalid username or password")
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.status(403); 
            return res.send("Invalid username or password")
        }

        // Session already exists
        if (req.cookies.sessionId != undefined) {
            const sessionUsername = sessions.get(req.cookies.sessionId)
            if (sessionUsername === username) {
                res.status(200);
                return res.send(username)
            }
        }

        const sessionId = crypto.randomUUID()
        sessions.set(sessionId, username)
        res.status(200);
        res.cookie('sessionId', sessionId,
            {
                httpOnly: true,
                secure: false,
            }
        )
        return res.send(username)
    })



        // register handle
    app.post(apiRoute + '/register', async (req, res) => {
        console.log("POST /register")
        if (req.body == undefined || !("username" in req.body) || !("password" in req.body)) {
            res.status(400); // Bad request 
            return res.send("No username and/or password")
        }

        // Get the new username and pass 
        const username = req.body.username.toLowerCase()
        const password = req.body.password.toLowerCase()

        //check if username taken
        const user = await User.findOne({ username: username })
        if (user != null) {
            res.status(409); // Conflict
            return res.send("Username already taken")
        }
        
        // Register the user on the db
        try {
            const hash = await bcrypt.hash(password, saltRounds)
            const newUser = new User({
                username: username,
                password: hash
            });
            await newUser.save()
            
        } catch (err) {
            res.status(500)
            return res.send("Could not create the user")
        }

        // Create a new user session
        console.log(`Created new user @${username}`)
        const sessionId = crypto.randomUUID()
        sessions.set(sessionId, username)
        res.cookie('sessionId', sessionId,
            {
                httpOnly: true,
                secure: false, 
            }
        )

        res.status(200);
        return res.send(username)
        
    })


    // handle logout 
    app.post(apiRoute + "/logout", auth, (req, res) => {
        console.log("POST /logout")
        const sessionId = req.cookies.sessionId;
        sessions.delete(sessionId);
        res.status(200);
        return res.send(req.username);
    })
}
module.exports={loadApi};