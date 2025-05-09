import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { selectActiveTab, selectChartData, selectLoading } from "../../../redux/progressSlice";

const LineCharts = () => {
  const activeTab = useSelector(selectActiveTab);
  const chartData = useSelector(selectChartData);
  const loading = useSelector(selectLoading);

  const xKey = {
    Day: "day",
    Week: "week",
    Month: "month",
  }[activeTab];

  return (
    <div style={{ width: "100%" }} className="histTracke">
      <h4>Tracking History ({activeTab})</h4>
      <p>You have {chartData.length === 0 ? "no" : "some"} recent activity</p>
      {loading ? (
        <div>Loading chart data...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              padding={{ left: 20, right: 20 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="workouts"
              stroke="#329D7F"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineCharts;