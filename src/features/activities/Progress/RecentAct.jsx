import React from "react";
import { useSelector } from "react-redux";
import { selectRecentActivities, selectActiveTab } from "../../../redux/progressSlice";

const RecentAct = () => {
  const activeTab = useSelector(selectActiveTab);
  const activities = useSelector(selectRecentActivities);

   return (
    <>
      <div className="flex justify-between flex-wrap items-center mb-2">
        <h3 className="text-sm font-medium">Recent Activities</h3>
      </div>

      <div className="flex flex-col gap-2">
        {activities.map((act, idx) => (
          <div
            key={idx}
            className="flex justify-between border rounded-xl inset-shadow-xs p-1"
          >
            <div>
              <h6>{act.title}</h6>
              <div className="flex justify-between">
                <p className="text-[#696767] pr-3">🔥 {act.kcal} kcal</p>
                <p className="text-[#696767]">❤ {act.bpm} bpm</p>
              </div>
            </div>

            <div>
              <div className="text-[#696767] flex gap-2">
                <i className="fa-regular fa-calendar-days text-base"></i>
                <p className="text-base">{act.date}</p>
              </div>

              <div className="text-[#696767] flex gap-2">
                <i className="fa-solid fa-bell text-base"></i>
                <p className="text-base">{act.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentAct;