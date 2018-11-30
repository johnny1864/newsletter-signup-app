const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// BODYPARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));


// SIGNUP ROUTE
app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
    }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
