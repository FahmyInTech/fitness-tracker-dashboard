"use client"

import {
  BarChart2Icon,
  TrendingUpIcon,
  CalendarIcon,
  UsersIcon,
  AwardIcon,
  SettingsIcon,
  HelpCircleIcon,
  ChevronLeftIcon,
  DumbbellIcon,
} from "lucide-react"

const menuItems = [
  { icon: BarChart2Icon, label: "Dashboard", active: true },
  { icon: TrendingUpIcon, label: "Progress" },
  { icon: CalendarIcon, label: "Schedule" },
  { icon: UsersIcon, label: "Community" },
  { icon: AwardIcon, label: "Achievements" },
]

const bottomMenuItems = [
  { icon: SettingsIcon, label: "Setting" },
  { icon: HelpCircleIcon, label: "Help" },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <DumbbellIcon className="h-6 w-6 text-teal-500" />
          {!collapsed && <span className="ml-2 text-xl font-semibold text-teal-500">PrimeFit</span>}
          <button className="ml-auto p-1 rounded-full hover:bg-gray-100" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Main menu */}
        <div className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-600 group ${
                    item.active ? "bg-teal-100 text-teal-600" : ""
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${item.active ? "text-teal-500" : "text-gray-500 group-hover:text-teal-500"}`}
                  />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Manage section */}
        {!collapsed && (
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Manage</h3>
          </div>
        )}

        {/* Bottom menu */}
        <div className="py-4">
          <ul className="space-y-1">
            {bottomMenuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-600 group"
                >
                  <item.icon className="w-6 h-6 text-gray-500 group-hover:text-teal-500" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Dumbbell image at bottom */}
        {!collapsed && (
          <div className="p-4 mt-auto">
            <img src="/placeholder.svg?height=100&width=150" alt="Dumbbell" className="w-full max-w-[150px] mx-auto" />
          </div>
        )}
      </div>
    </div>
  )
}
