router.post("/signup", (request, response) => {
    var token = "abc";
    var userData;
    const newOwner = {
        email: request.body.email,
        password: request.body.password,

    }

    firebase.auth()
        .createUserWithEmailAndPassword(
            newOwner.email,
            newOwner.password,
        )
        .then((data) => {
            ownerId = data.user.uid;

            var setHash = db.collection('Owner-Email-Verifications').doc(ownerId).set({ ownerId });
            var verificationLink = "http://localhost:5001/fudict-001/us-central1/app/restaurant/confirm_email/" + ownerId;
            sendVerificationEmail(newOwner.email, verificationLink);

            return data.user.getIdToken();


        })
        .then((idtoken) => {
            token = idtoken
            // Set admin privilege on the user corresponding to uid.
            const ownerDetails = {
                email: request.body.email,

                name: request.body.name,
                createdAt: new Date().toISOString(),
                ownerId
            };

            return db.doc(`owners/${ownerId}`).set(ownerDetails);

        })
        .then((data) => {
            userData = data;
            // Verify the ID token and decode its payload.
            // &&claims.email_verified &&claims.email.endsWith('@admin.example.com')
            return admin.auth().verifyIdToken(token)
                .then((claims) => {
                    // Verify user is eligible for additional privileges.
                    if (typeof claims.email !== 'undefined' &&
                        typeof claims.email_verified !== 'undefined') {
                        // Add custom claims for additional privileges.
                        return admin.auth().setCustomUserClaims(claims.sub, {
                            owner: true
                        })
                            .then((data) => {
                                return response.status(200).json({ token });
                            })
                            .catch((error) => {
                                return response.status(500).json({ error });

                            })
                    }
                    else {
                        // Return nothing.
                        return response.end(JSON.stringify({ status: 'ineligible' }));
                    }
                })
                .catch((error) => {
                    return response.status(201).json({ error });

                })

        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return response.status(400).json({ email: 'Email already in use' });
            } else {
                return response.status(500).json({ general: 'Something went wrong, please try again' });
            }
        });

});