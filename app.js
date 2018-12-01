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

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ],
    }

    const postData = JSON.stringify(data);

    const options = {
        url: 'https://us19.api.mailchimp.com/3.0/lists/9bc0396d61',
        method: 'POST',
        headers: {
            Authorization: 'auth 54470479764ca5173fd4ba99f7570e68-us19'
        },
        body: postData
    }

    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail.html');
        }
        else {
            if (response.statusCode === 200) {
                res.redirect('/success.html')
            }
            else {
                res.redirect('/fail.html');
            }
        }
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
