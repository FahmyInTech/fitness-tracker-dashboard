"use client"

import { useEffect, useRef, useState } from "react"
import { MoreVerticalIcon, HeartIcon } from "lucide-react"
import Chart from "chart.js/auto"
import { heartRateAPI } from "../services/api"

export default function HeartRateCard() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [heartRateData, setHeartRateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHeartRate = async () => {
      try {
        setLoading(true)
        const data = await heartRateAPI.get()
        setHeartRateData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load heart rate data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeartRate()
  }, [])

  useEffect(() => {
    if (chartRef.current && heartRateData) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: heartRateData.history.length }, (_, i) => i),
          datasets: [
            {
              data: heartRateData.history,
              borderColor: "#ef4444",
              borderWidth: 1.5,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
              min: 60,
              max: 140,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
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
  }, [heartRateData])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold">Heart Rate</h2>
          </div>
          <div className="w-5 h-5"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold">Heart Rate</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-red-500 py-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
          <h2 className="text-lg font-semibold">Heart Rate</h2>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-baseline mb-2">
        <div className="text-3xl font-bold">{heartRateData.current}</div>
        <div className="text-gray-500 ml-1">{heartRateData.unit}</div>
      </div>

      <div className="h-16">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
