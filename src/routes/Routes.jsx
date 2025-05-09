import React from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Progress from "../features/activities/Progress/Progress";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="progress" element={<Progress/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
