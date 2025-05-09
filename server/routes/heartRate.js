const express = require("express")
const router = express.Router()

// Mock data
const heartRateData = {
  current: 105,
  unit: "bpm",
  history: [100, 105, 95, 110, 100, 115, 105, 90, 100, 110, 105, 120, 110, 100, 95, 105, 115, 105, 100, 105],
}

// Get heart rate data
router.get("/", (req, res) => {
  res.json(heartRateData)
})

// Update current heart rate
router.put("/", (req, res) => {
  const { current } = req.body

  if (current) {
    heartRateData.current = current
    // Add to history and keep only the last 20 readings
    heartRateData.history.push(current)
    if (heartRateData.history.length > 20) {
      heartRateData.history.shift()
    }
  }

  res.json(heartRateData)
})

module.exports = router
