const express = require("express")
const router = express.Router()

// Mock data
const caloriesData = {
  food: 25,
  exercise: 25,
  remaining: 50,
  total: 2000,
  consumed: 500,
  burned: 500,
  left: 1000,
}

// Get calories data
router.get("/", (req, res) => {
  res.json(caloriesData)
})

// Update calories data
router.put("/", (req, res) => {
  const { consumed, burned } = req.body

  if (consumed) {
    caloriesData.consumed = consumed
    caloriesData.food = Math.round((consumed / caloriesData.total) * 100)
  }

  if (burned) {
    caloriesData.burned = burned
    caloriesData.exercise = Math.round((burned / caloriesData.total) * 100)
  }

  // Recalculate remaining
  caloriesData.left = caloriesData.total - caloriesData.consumed + caloriesData.burned
  caloriesData.remaining = Math.round((caloriesData.left / caloriesData.total) * 100)

  res.json(caloriesData)
})

module.exports = router
