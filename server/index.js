const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Import routes
const activityRoutes = require("./routes/activities")
const caloriesRoutes = require("./routes/calories")
const heartRateRoutes = require("./routes/heartRate")
const stepsRoutes = require("./routes/steps")
const trackingRoutes = require("./routes/tracking")
const messagesRoutes = require("./routes/messages")

// Use routes
app.use("/api/activities", activityRoutes)
app.use("/api/calories", caloriesRoutes)
app.use("/api/heart-rate", heartRateRoutes)
app.use("/api/steps", stepsRoutes)
app.use("/api/tracking", trackingRoutes)
app.use("/api/messages", messagesRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("PrimeFit API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
