const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const file = require("multer")();
const newsletter_controller = require("../controllers/newsletter_controller");
router.get("/", adminController.home);
router.post("/sign-in", adminController.signIn);
router.post("/sign-up", adminController.signUp);
router.get("/sign-out", adminController.signOut);
router.get("/alumni-admin", adminController.getAlumniAdmin);
router.put("/approve-alumni", adminController.approveAlumni);
router.get("/alumni", adminController.alumniHome);
router.put("/approve-blog", adminController.approveBlog);
router.delete("/disapprove-blog", adminController.disapproveBlog);
router.get("/blog-admin", adminController.getBlogAdmin);
router.get("/blog", adminController.blogHome);

router.post("/add-member", file.single("image"), adminController.addMember);
router.put("/update-info/:id", adminController.updateMemberInfo);
router.delete("/:id", adminController.deleteMember);

router.get("/member", adminController.memberHome);

router.get("/newsletter", newsletter_controller.home);
router.post("/postnewsletter", newsletter_controller.postnewsletter);

module.exports = router;
