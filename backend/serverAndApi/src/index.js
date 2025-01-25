const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./api');
const cookies = require('./cookies');




const port=3000;
const app= express();
const dbUrl="mongodb+srv://dbUser:<db_password>@cluster0.scg6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
        console.log(`Listening on port ${port}`);
    });
})();