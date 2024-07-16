import express from "express"
import routes from "./src/routes/index.js"
import specs from "./swagger.js"
import swaggerUi from "swagger-ui-express"
import { loggingMiddleware } from "./src/middleware/loggingMiddleware.js"
import { globalLimiter } from "./src/middleware/rateLimitMiddleware.js"

const app = express()

app.use(express.json())
app.use(loggingMiddleware)
app.use(globalLimiter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
app.use("/api", routes)

export default app
