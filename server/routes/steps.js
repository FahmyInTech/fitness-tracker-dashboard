const express = require("express")
const router = express.Router()

// Mock data
const stepsData = {
  current: 1045,
  unit: "Steps",
  target: 10000,
  history: [1000, 1200, 900, 1500, 1300, 1100, 1400, 1600, 1200, 1000],
}

// Get steps data
router.get("/", (req, res) => {
  res.json(stepsData)
})

// Update steps count
router.put("/", (req, res) => {
  const { current } = req.body

  if (current) {
    stepsData.current = current
    // Add to history and keep only the last 10 readings
    stepsData.history.push(current)
    if (stepsData.history.length > 10) {
      stepsData.history.shift()
    }
  }

  res.json(stepsData)
})

module.exports = router
