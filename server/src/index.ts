import "reflect-metadata"
import express from "express"

const PORT = 3000

const app = express()

app.listen(PORT, () => "Server running on port 3000")