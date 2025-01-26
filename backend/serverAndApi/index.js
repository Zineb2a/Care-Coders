const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./src/api');
const cookies = require('./src/cookies');

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




const port=3000;
const app= express();
const dbUrl="mongodb+srv://dbUser:<bananas>@cluster0.scg6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());
app.use(cookies.parser);
app.use('/', express.static(path.join(__dirname, '../../public')));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));



(async () => {
  
    console.log("Database is connecting");
    await mongoose.connect(dbUrl);
    
    api.loadApi(app);

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
})();