const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./api');
const cookies = require('./cookies');


const port=3000;
const app= express();

app.use(express.json());
app.use(cookies.parser);
app.use('/', express.static(path.join(__dirname, '../../public')));

(async () => {
    console.log("Connecting to the database");
    await mongoose.connect(dbUrl);

    api.loadApi(app);
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})();