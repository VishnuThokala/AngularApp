var admin = require("firebase-admin");

var serviceAccount = require("./adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fudict-001.firebaseio.com"
});
const db = admin.firestore();

module.exports = { admin, db };