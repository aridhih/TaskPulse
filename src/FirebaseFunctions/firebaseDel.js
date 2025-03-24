const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();
const corsHandler = cors({ origin: true });

exports.deleteUser = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (req.method === "OPTIONS") {
            return res.status(204).send(""); // Preflight request allowed
        }

        if (req.method !== "DELETE") {
            return res.status(405).send({ error: "Method Not Allowed" });
        }

        const { uid } = req.query;
        if (!uid) {
            return res.status(400).send({ error: "Missing UID" });
        }

        try {
            // Delete user from Firebase Authentication
            await admin.auth().deleteUser(uid);
            // Delete user from Firestore
            await admin.firestore().collection("users").doc(uid).delete();

            return res.status(200).send({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).send({ error: "Internal Server Error" });
        }
    });
});
