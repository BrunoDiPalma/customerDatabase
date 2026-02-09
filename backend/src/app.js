import express from "express"
import usersRoutes from "./routes/userRoutes.js"

const app = express()
app.use(express.json())

app.use("/users", usersRoutes)

export default app