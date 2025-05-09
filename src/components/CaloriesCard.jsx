"use client"

import { useEffect, useRef, useState } from "react"
import { MoreVerticalIcon } from "lucide-react"
import Chart from "chart.js/auto"
import { caloriesAPI } from "../services/api"

export default function CaloriesCard() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [caloriesData, setCaloriesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        setLoading(true)
        const data = await caloriesAPI.get()
        setCaloriesData(data)
        setError(null)
      } catch (err) {
        setError("Failed to load calories data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCalories()
  }, [])

  useEffect(() => {
    if (chartRef.current && caloriesData) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Food", "Exercise", "Remaining"],
          datasets: [
            {
              data: [caloriesData.food, caloriesData.exercise, caloriesData.remaining],
              backgroundColor: [
                "#10b981", // Food - teal-500
                "#5eead4", // Exercise - teal-300
                "#e5e7eb", // Remaining - gray-200
              ],
              borderWidth: 0,
              cutout: "75%",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
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
  }, [caloriesData])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Calories</h2>
          <div className="w-5 h-5"></div>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="animate-pulse w-32 h-32 rounded-full bg-gray-200"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Calories</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Calories</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="relative h-48">
        <canvas ref={chartRef}></canvas>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold">{caloriesData?.remaining}%</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
          <span className="text-sm">Food</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-teal-300 rounded-full mr-2"></span>
          <span className="text-sm">Exercise</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-gray-200 rounded-full mr-2"></span>
          <span className="text-sm">Remaining</span>
        </div>
      </div>
    </div>
  )
}
