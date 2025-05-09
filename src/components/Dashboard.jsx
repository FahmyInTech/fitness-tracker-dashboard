import { ShareIcon, ChevronDownIcon } from "lucide-react"
import ActivityCard from "./ActivityCard"
import CaloriesCard from "./CaloriesCard"
import HeartRateCard from "./HeartRateCard"
import StepsCard from "./StepsCard"
import TrackingHistoryCard from "./TrackingHistoryCard"
import MessagesCard from "./MessagesCard"

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb and title */}
      <div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>MainMenu</span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-700">Dashboard</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Manage and monitoring working towards achieving your fitness objectives</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-gray-700">
                <span>Run</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>

            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2">
              <ShareIcon className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today Activities */}
        <ActivityCard />

        {/* Calories */}
        <CaloriesCard />

        {/* Heart Rate */}
        <HeartRateCard />

        {/* Steps */}
        <StepsCard />

        {/* Tracking History */}
        <TrackingHistoryCard className="lg:col-span-2" />

        {/* Messages */}
        <MessagesCard />
      </div>
    </div>
  )
}
