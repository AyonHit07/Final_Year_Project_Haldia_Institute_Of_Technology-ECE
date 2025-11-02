import {Router} from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { login, signup } from "../controllers/auth.controllers.js"


const router = Router()

router.post('/signup',signup)
router.post('/login',login)

export default router 