const express = require('express')
const router = express.Router()

const ToughtController = require("../controllers/ToughtController")
const checkAuth = require("../helpers/checkAuth")





router.get("/", ToughtController.homeController)

router.get("/register", ToughtController.registerControllerGet)
router.post("/register", ToughtController.registerControllerPost)

router.get("/login", ToughtController.loginControllerGet)
router.post("/login", ToughtController.loginControllerPost)

router.get("/logout", ToughtController.logoutController)


router.get("/dashboard", checkAuth, ToughtController.dashBoardController)
router.get("/dashboard/add", checkAuth , ToughtController.dashBoardControllerAddGet)
router.post("/dashboard/add", checkAuth , ToughtController.dashBoardControllerAddPost)

router.get("/tought/edit/:id", checkAuth , ToughtController.dashBoardControllerEditGet)
router.post("/tought/edit/:id", checkAuth , ToughtController.dashBoardControllerEditPost)

router.post("/tought/delete/:id", checkAuth, ToughtController.dashBoardControllerDeletePost)


module.exports = router