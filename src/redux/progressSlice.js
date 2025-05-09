import { createSlice } from '@reduxjs/toolkit';

const dummyData = {
  day: [
    { day: "Mon", workouts: 1 },
    { day: "Tue", workouts: 2 },
    { day: "Wed", workouts: 1 },
    { day: "Thu", workouts: 3 },
    { day: "Fri", workouts: 0 },
    { day: "Sat", workouts: 2 },
    { day: "Sun", workouts: 1 },
  ],
  week: [
    { week: "W1", workouts: 4 },
    { week: "W2", workouts: 6 },
    { week: "W3", workouts: 3 },
    { week: "W4", workouts: 5 },
  ],
  month: [
    { month: "Jan", workouts: 10 },
    { month: "Feb", workouts: 3 },
    { month: "Mar", workouts: 5 },
    { month: "Apr", workouts: 0 },
    { month: "May", workouts: 8 },
    { month: "Jun", workouts: 11 },
    { month: "Jul", workouts: 7 },
    { month: "Aug", workouts: 6 },
    { month: "Sep", workouts: 9 },
    { month: "Oct", workouts: 10 },
    { month: "Nov", workouts: 12 },
    { month: "Dec", workouts: 6 },
  ],
};

const workoutCategories = {
  day: [
    { name: "Cardio", value: 2 },
    { name: "Strength", value: 3 },
    { name: "Yoga", value: 1 },
  ],
  week: [
    { name: "Cardio", value: 7 },
    { name: "Strength", value: 8 },
    { name: "Yoga", value: 3 },
  ],
  month: [
    { name: "Cardio", value: 35 },
    { name: "Strength", value: 42 },
    { name: "Yoga", value: 10 },
  ],
};


const monthlyGoals = {
  day: [
    { name: "Steps", current: 7500, target: 10000 },
    { name: "Calories", current: 350, target: 500 },
    { name: "Water", current: 6, target: 8 },
  ],
  week: [
    { name: "Steps", current: 52500, target: 70000 },
    { name: "Calories", current: 2450, target: 3500 },
    { name: "Water", current: 38, target: 56 },
  ],
  month: [
    { name: "Steps", current: 210000, target: 300000 },
    { name: "Calories", current: 10500, target: 15000 },
    { name: "Water", current: 150, target: 240 },
  ],
};


const recentActivities = {
   day: [
    {
      title: "Morning Jog",
      kcal: 120,
      bpm: 95,
      date: "08 May 2025",
      time: "06:00 AM - 07:00 AM",
    },
    {
      title: "Stretching",
      kcal: 60,
      bpm: 80,
      date: "08 May 2025",
      time: "08:00 AM - 08:30 AM",
    },
    {
        title: "Swimming",
        kcal: 400,
        bpm: 115,
        date: "01 May 2025",
        time: "08:00 AM - 09:00 AM",
      },
  ],
  week: [
    {
      title: "HIIT Session",
      kcal: 300,
      bpm: 130,
      date: "06 May 2025",
      time: "05:30 AM - 06:15 AM",
    },
    {
      title: "Yoga & Meditation",
      kcal: 100,
      bpm: 85,
      date: "07 May 2025",
      time: "07:00 AM - 08:00 AM",
    },
    {
      title: "Evening Walk",
      kcal: 90,
      bpm: 88,
      date: "04 May 2025",
      time: "06:00 PM - 06:45 PM",
    },
  ],
  month: [
    {
      title: "Swimming",
      kcal: 400,
      bpm: 115,
      date: "01 May 2025",
      time: "08:00 AM - 09:00 AM",
    },
    {
      title: "Boxing Class",
      kcal: 500,
      bpm: 140,
      date: "03 May 2025",
      time: "06:00 AM - 07:00 AM",
    },
    {
      title: "Cycling",
      kcal: 350,
      bpm: 110,
      date: "05 May 2025",
      time: "05:30 AM - 07:00 AM",
    },
  ],
};

const initialState = {
  activeTab: 'Month',
  chartData: dummyData.month,
  categoriesData: workoutCategories.month,
  goalsData: monthlyGoals.month,
  recentActivities: recentActivities.month,
  loading: false,
  error: null
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      const duration = action.payload.toLowerCase();
      state.chartData = dummyData[duration] || [];
      state.categoriesData = workoutCategories[duration] || [];
      state.goalsData = monthlyGoals[duration] || [];
      state.recentActivities = recentActivities[duration] || [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    addWorkout: (state, action) => {
      const { workout, duration } = action.payload;
    
      if (duration === 'day') {
       
      } else if (duration === 'week') {
       
      } else {
        
      }
    }
  },
});


export const { setActiveTab, setLoading, addWorkout } = progressSlice.actions;


export const selectActiveTab = (state) => state.progress.activeTab;
export const selectChartData = (state) => state.progress.chartData;
export const selectCategoriesData = (state) => state.progress.categoriesData;
export const selectGoalsData = (state) => state.progress.goalsData;
export const selectRecentActivities = (state) => state.progress.recentActivities;
export const selectLoading = (state) => state.progress.loading;

export default progressSlice.reducer;