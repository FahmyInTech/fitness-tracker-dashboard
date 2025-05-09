"use client"

import { useState, useEffect } from "react"
import { MoreVerticalIcon } from "lucide-react"
import { activitiesAPI } from "../services/api"

export default function ActivityCard() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        const data = await activitiesAPI.getAll()
        setActivities(data)
        setError(null)
      } catch (err) {
        setError("Failed to load activities")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Today Activities</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-2.5 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{activity.name}</span>
                <span className="text-xs text-gray-500">
                  {activity.current}/{activity.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: `${activity.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
