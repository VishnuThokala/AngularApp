const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));


const { db } = require('./utils/admin');
const config = require("./utils/config");
const UserRoute = require('./routes/user')
// var ownerRoute = require('./routes/ownerAuthentication')


firebase.initializeApp(config);
app.get('/', (req,res) => {
    return res.status(200).json({ msg: 'hi its running!' });
})
app.post('/login', (req, res) => {
    console.log(req.body)
    var user;
    var email = String(req.body.email);
    var password = String(req.body.password);
    if (email.length < 4) {
        return res.status(500).json({ msg: 'Please enter an email address.' });

    }
    if (password.length < 4) {
        return res.status(500).json({ msg: 'Please enter a valid password.' });
    }
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
            user = data.user;
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token, user });
        })
        .catch((error) => {
            console.error(error);
            return res.status(403).json('wrong credentials, please try again');
        })
    return null;
});
// app.use('/owner', ownerAuthorisation, ownerRoute);
app.use('/user', UserRoute);


exports.app = functions.https.onRequest(app);