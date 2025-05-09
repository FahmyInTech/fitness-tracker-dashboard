import React from "react";
import { useSelector } from "react-redux";
import { selectGoalsData, selectActiveTab } from "../../../redux/progressSlice";

const MonthGoals = () => {
  const activeTab = useSelector(selectActiveTab);
  const goalsData = useSelector(selectGoalsData);

  return (
    <div className="p-3">
      <h4>Goals ({activeTab})</h4>
      <p>Your progress towards fitness goals</p>
      
      <div className="mt-4">
        {goalsData.map((goal, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{goal.name}</span>
              <span>
                {goal.current}/{goal.target}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div
                className="h-5 bg-[#329D7FA3] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(goal.current / goal.target) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthGoals;