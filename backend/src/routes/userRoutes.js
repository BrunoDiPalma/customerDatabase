import { Router } from "express"
import { postUsers, getUsers, GetUserbyID, deleteUser, updateUser, loginUser } from "../controllers/userControllers.js"

const router = Router()

router.post("/", postUsers)
router.get("/", getUsers)
router.get("/:id", GetUserbyID)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)
router.post("/login", loginUser)

export default router