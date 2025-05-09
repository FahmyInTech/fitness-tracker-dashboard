const express = require("express")
const router = express.Router()

// Mock data
const messagesData = [
  {
    id: 1,
    name: "Username One",
    message: "Hello!......",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 2,
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Username Two",
    message: "How are you?",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 3,
    name: "Username Three",
    message: "Do you have......",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
]

// Get all messages
router.get("/", (req, res) => {
  res.json(messagesData)
})

// Get message by id
router.get("/:id", (req, res) => {
  const message = messagesData.find((m) => m.id === Number.parseInt(req.params.id))

  if (!message) {
    return res.status(404).json({ message: "Message not found" })
  }

  res.json(message)
})

// Mark message as read
router.put("/:id/read", (req, res) => {
  const messageIndex = messagesData.findIndex((m) => m.id === Number.parseInt(req.params.id))

  if (messageIndex === -1) {
    return res.status(404).json({ message: "Message not found" })
  }

  messagesData[messageIndex].unread = 0

  res.json(messagesData[messageIndex])
})

// Add new message
router.post("/", (req, res) => {
  const { name, message, avatar } = req.body

  if (!name || !message) {
    return res.status(400).json({ message: "Name and message are required" })
  }

  const newMessage = {
    id: messagesData.length > 0 ? Math.max(...messagesData.map((m) => m.id)) + 1 : 1,
    name,
    message,
    avatar: avatar || "/placeholder.svg?height=40&width=40",
    unread: 0,
    timestamp: new Date().toISOString(),
  }

  messagesData.unshift(newMessage)

  res.status(201).json(newMessage)
})

module.exports = router
