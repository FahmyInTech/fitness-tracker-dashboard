"use client"

import { useEffect, useRef, useState } from "react"
import { MoreVerticalIcon, FootprintsIcon } from "lucide-react"
import Chart from "chart.js/auto"
import { stepsAPI } from "../services/api"

export default function StepsCard() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [stepsData, setStepsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setLoading(true)
        const data = await stepsAPI.get()
        setStepsData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load steps data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSteps()
  }, [])

  useEffect(() => {
    if (chartRef.current && stepsData) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: stepsData.history.length }, (_, i) => i),
          datasets: [
            {
              data: stepsData.history,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.4,
              fill: true,
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
              min: 500,
              max: 2000,
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
  }, [stepsData])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FootprintsIcon className="w-5 h-5 text-teal-500 mr-2" />
            <h2 className="text-lg font-semibold">Steps</h2>
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
            <FootprintsIcon className="w-5 h-5 text-teal-500 mr-2" />
            <h2 className="text-lg font-semibold">Steps</h2>
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
          <FootprintsIcon className="w-5 h-5 text-teal-500 mr-2" />
          <h2 className="text-lg font-semibold">Steps</h2>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-baseline mb-2">
        <div className="text-3xl font-bold">{stepsData.current.toLocaleString()}</div>
        <div className="text-gray-500 ml-1">{stepsData.unit}</div>
      </div>

      <div className="h-16 relative">
        <canvas ref={chartRef}></canvas>
        <div className="absolute top-0 right-0 bg-white rounded-full w-6 h-6 flex items-center justify-center border border-teal-200">
          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
