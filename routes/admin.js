const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin_controller");
router.get("/", adminController.home);
router.post("/sign-in", adminController.signIn);
router.post("/sign-up", adminController.signUp);
router.get("/sign-out", adminController.signOut);
router.get('/alumni-admin',adminController.getAlumniAdmin);
router.put('/approve-alumni',adminController.approveAlumni);
router.get("/alumni", adminController.alumniHome);
// router.get("/events", adminController.eventshome);
// router.get("/admin-events", adminController.getAdminEvents);
// router.put("/delete-event",adminController.deleteevent);
module.exports = router;
