"use client"

import { useState, useEffect } from "react"
import { MessageCircleIcon } from "lucide-react"
import { messagesAPI } from "../services/api"

export default function MessagesCard() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const data = await messagesAPI.getAll()
        setMessages(data)
        setError(null)
      } catch (err) {
        setError("Failed to load messages")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      await messagesAPI.markAsRead(id)
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, unread: 0 } : msg)))
    } catch (err) {
      console.error("Failed to mark message as read:", err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="w-5 h-5 text-gray-500" />
          <MessageCircleIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-md"
              onClick={() => message.unread > 0 && handleMarkAsRead(message.id)}
            >
              <div className="relative">
                <img src={message.avatar || "/placeholder.svg"} alt={message.name} className="w-10 h-10 rounded-full" />
                {message.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {message.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{message.name}</p>
                <p className="text-sm text-gray-500 truncate">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <button className="text-teal-500 text-sm font-medium hover:text-teal-600">See all</button>
      </div>
    </div>
  )
}
