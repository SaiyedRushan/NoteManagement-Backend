import app from "./app.js"
import connectDB from "./src/config/database.js"
import config from "./config.js"
const port = config.PORT || 8080

connectDB()

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
