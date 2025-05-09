import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { selectCategoriesData, selectActiveTab } from "../../../redux/progressSlice";

const COLORS = ["#329D7F", "#D74040", "#6C3993"];


const PieChartComponent = () => {
  const activeTab = useSelector(selectActiveTab);
  const data = useSelector(selectCategoriesData);

  return (
    <div style={{ width: "100%" }} className="resTracke">
      <h2>Result Tracker</h2>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={170}
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>

      <div className="flex pt-2">
        <p className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#329D7F] mr-1"></span>
          Calories
        </p>
        <p className="flex items-center px-4">
          <span className="w-3 h-3 rounded-full bg-[#D74040] mr-1"></span>
          Heart Rate
        </p>
        <p className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#6C3993] mr-1"></span>
          Steps
        </p>
      </div>
    </div>
  );
};

export default PieChartComponent;