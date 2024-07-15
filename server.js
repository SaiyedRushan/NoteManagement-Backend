import express from "express"
import routes from "./src/routes/index.js"
import connectDB from "./src/config/database.js"
import config from "./config.js"
import specs from "./swagger.js"
import swaggerUi from "swagger-ui-express"
import { loggingMiddleware } from "./src/middleware/loggingMiddleware.js"

const app = express()
const port = config.PORT || 8080

connectDB()

app.use(express.json())
app.use(loggingMiddleware)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
app.use("/api", routes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
