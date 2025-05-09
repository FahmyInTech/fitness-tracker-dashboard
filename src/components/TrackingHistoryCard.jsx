"use client"

import { useEffect, useRef, useState } from "react"
import { MoreVerticalIcon, ChevronDownIcon } from "lucide-react"
import Chart from "chart.js/auto"
import { trackingAPI } from "../services/api"

export default function TrackingHistoryCard({ className = "" }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setLoading(true)
        const data = await trackingAPI.get()
        setTrackingData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load tracking data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingData()
  }, [])

  useEffect(() => {
    if (chartRef.current && trackingData) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: trackingData.weeklyData.map((item) => item.day),
          datasets: [
            {
              data: trackingData.weeklyData.map((item) => item.value),
              backgroundColor: (context) => {
                // Make Wednesday's bar a different color
                return context.dataIndex === 3 ? "#10b981" : "#5eead4"
              },
              borderRadius: 6,
              barThickness: 20,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 30,
              ticks: {
                stepSize: 5,
              },
              grid: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [trackingData])

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Tracking History</h2>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>
          </div>
          <div className="w-5 h-5"></div>
        </div>
        <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Tracking History</h2>
            <p className="text-sm text-gray-500">Your average speed is...</p>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow p-5 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Tracking History</h2>
          <p className="text-sm text-gray-500">Your average speed is {trackingData.averageSpeed}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-sm text-gray-700">
              <span>Last week</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
