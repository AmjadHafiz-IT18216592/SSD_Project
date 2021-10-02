module.exports = app => {
    const driveController = require("../controllers/driveController");

    // Get user profile info
    app.post("/getUserInfo", driveController.getUserProfileInfo);

    // Get files from google drive
    app.post("/readDrive", driveController.readDriveDetail);

    //Upload file to google drive
    app.post("/fileUpload", driveController.uploadFilestoDrivre);

};