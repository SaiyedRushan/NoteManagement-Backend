import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Management API",
      version: "1.0.0",
      description: "A simple Note Management API",
    },
  },
  apis: ["./src/routes/*.js"],
}

const specs = swaggerJsdoc(options)
export default specs
