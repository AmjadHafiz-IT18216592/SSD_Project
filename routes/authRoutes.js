module.exports = app => {
    const authControlller = require("../controllers/authController");

    // Get auth url
    app.get("/getAuthURL", authControlller.getAuthUrl);

    // Get token
    app.post("/getToken", authControlller.getToken);


};