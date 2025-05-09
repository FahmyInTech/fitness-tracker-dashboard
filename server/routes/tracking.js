const express = require("express")
const router = express.Router()

// Mock data
const trackingData = {
  averageSpeed: "5.2 km/h",
  weeklyData: [
    { day: "Sun", value: 20 },
    { day: "Mon", value: 20 },
    { day: "Tue", value: 25 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 8 },
    { day: "Fri", value: 12 },
    { day: "Sat", value: 25 },
  ],
}

// Get tracking history data
router.get("/", (req, res) => {
  res.json(trackingData)
})

// Update tracking data for a specific day
router.put("/:day", (req, res) => {
  const { value } = req.body
  const dayIndex = trackingData.weeklyData.findIndex((d) => d.day.toLowerCase() === req.params.day.toLowerCase())

  if (dayIndex === -1) {
    return res.status(404).json({ message: "Day not found" })
  }

  trackingData.weeklyData[dayIndex].value = value

  // Recalculate average speed (just a mock calculation)
  const totalValue = trackingData.weeklyData.reduce((sum, day) => sum + day.value, 0)
  const avgValue = totalValue / trackingData.weeklyData.length
  trackingData.averageSpeed = `${(avgValue / 4).toFixed(1)} km/h`

  res.json(trackingData)
})

module.exports = router
