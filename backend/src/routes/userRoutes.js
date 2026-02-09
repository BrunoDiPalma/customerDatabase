import { Router } from "express"
import { deleteUser, getUsers, postUsers } from "../controllers/userControllers.js"

const router = Router()

router.get("/", getUsers)
router.post("/", postUsers)
router.delete("/", deleteUser)

export default router