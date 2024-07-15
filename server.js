import express from "express"
import routes from "./src/routes/index.js"
import connectDB from "./src/config/database.js"
import config from "./config.js"

const app = express()
const port = config.PORT || 8080

connectDB()

app.use(express.json())
app.get("/api", routes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
