import React, { useState, useEffect } from 'react';
import { activities as dummyActivities } from '../data/dummySchedule';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import WeeklyTimeline from '../components/WeeklyTimeline';
import Calendar from '../components/Calendar';
import RecentEvents from '../components/RecentEvents';
import AddScheduleModal from '../components/AddScheduleModal';
import ShareModal from '../components/ShareModal';

const STORAGE_KEY_ACTIVITIES = 'primefit_activities';

const Schedule = () => {
  const [activities, setActivities] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    return stored ? JSON.parse(stored) : dummyActivities;
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  const handleAddActivity = (a) => {
    setActivities(prev => [...prev, a]);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setShowAddModal(true);
  };

  const handleUpdateActivity = (updated) => {
    setActivities(prev => prev.map(a => a.id === updated.id ? updated : a));
    setSelectedActivity(null);
  };

  const handleDeleteActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id));
    setSelectedActivity(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedActivity(null);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-[308px]">
        <div className="fixed top-0 right-0 left-0 md:left-[308px] z-10 bg-[#f8f9fa]">
          <Navbar />
        </div>
        <div className="max-w-6xl mx-auto w-full px-8 py-8 mt-[72px]">
          {/* Button group for small screens */}
          <div className="flex gap-3 justify-end mb-4 lg:hidden">
            <button className="px-5 py-2 rounded-xl border border-[#4ec7a8] text-[#4ec7a8] font-semibold bg-white hover:bg-[#e5e7eb] transition" onClick={() => setShowShareModal(true)}>Share</button>
            <button className="px-5 py-3 rounded-[20px] bg-[#4ec7a8] text-white font-semibold hover:bg-[#22b893] transition" onClick={() => { setShowAddModal(true); setSelectedActivity(null); }}>+ Add Schedule</button>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 mt-8">
            <div className="flex-1 min-w-0">
              <div className="relative" style={{ minHeight: '32px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '-32px',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '22px',
                    color: '#908B8B',
                  }}
                >
                  MainMenu &gt; <span style={{ color: '#222', fontWeight: 600 }}>Schedule</span>
                </span>
              </div>
              <div className="flex items-center mb-6" style={{ minHeight: '44px' }}>
                <div>
                  <h1 className="text-3xl font-bold text-[#222]">Schedule</h1>
                  <p className="text-[#bdbdbd] text-base">Monitor your time</p>
                </div>
              </div>
              <WeeklyTimeline activities={activities} selectedDate={selectedDate} onEditActivity={handleEditActivity} />
            </div>
            <div className="w-full lg:w-[400px] flex flex-col gap-8">
              {/* Button group for large screens */}
              <div className="flex gap-3 justify-end mt-6 hidden lg:flex">
                <button className="px-5 py-2 rounded-xl border border-[#4ec7a8] text-[#4ec7a8] font-semibold bg-white hover:bg-[#e5e7eb] transition" onClick={() => setShowShareModal(true)}>Share</button>
                <button className="px-5 py-3 rounded-[20px] bg-[#4ec7a8] text-white font-semibold hover:bg-[#22b893] transition" onClick={() => { setShowAddModal(true); setSelectedActivity(null); }}>+ Add Schedule</button>
              </div>
              <div style={{ marginTop: '18px' }}>
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} activities={activities} />
              </div>
              <RecentEvents activities={activities} />
            </div>
          </div>
        </div>
      </div>
      {showAddModal && (
        <AddScheduleModal
          open={showAddModal}
          onClose={handleCloseModal}
          onAdd={handleAddActivity}
          activity={selectedActivity}
          onUpdate={handleUpdateActivity}
          onDelete={handleDeleteActivity}
        />
      )}
      {showShareModal && (
        <ShareModal open={showShareModal} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default Schedule;
