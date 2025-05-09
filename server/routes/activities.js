const express = require("express")
const router = express.Router()

// Mock data
const activitiesData = [
  { name: "Walking", progress: 65, target: 10000, current: 6500 },
  { name: "Running", progress: 45, target: 5000, current: 2250 },
  { name: "Push up", progress: 20, target: 100, current: 20 },
]

// Get all activities
router.get("/", (req, res) => {
  res.json(activitiesData)
})

// Get activity by name
router.get("/:name", (req, res) => {
  const activity = activitiesData.find((a) => a.name.toLowerCase() === req.params.name.toLowerCase())

  if (!activity) {
    return res.status(404).json({ message: "Activity not found" })
  }

  res.json(activity)
})

// Update activity progress
router.put("/:name", (req, res) => {
  const { current } = req.body
  const activityIndex = activitiesData.findIndex((a) => a.name.toLowerCase() === req.params.name.toLowerCase())

  if (activityIndex === -1) {
    return res.status(404).json({ message: "Activity not found" })
  }

  // Update current value and recalculate progress
  activitiesData[activityIndex].current = current
  activitiesData[activityIndex].progress = Math.round((current / activitiesData[activityIndex].target) * 100)

  res.json(activitiesData[activityIndex])
})

module.exports = router
