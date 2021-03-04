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
router.put('/approve-blog',adminController.approveBlog);
router.get('/blog-admin',adminController.getBlogAdmin);
router.get('/blog',adminController.blogHome);
router.put('/approve-member',adminController.approveMember);
router.get('/member-admin',adminController.getMemberAdmin);
router.get('/member',adminController.memberHome);
module.exports = router;
