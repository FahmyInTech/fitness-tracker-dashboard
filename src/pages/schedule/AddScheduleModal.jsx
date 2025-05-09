import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const AddScheduleDrawer = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    activityName: '',
    date: '',
    startTime: '',
    endTime: '',
    activityType: '',
    participants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.activityName || !formData.date || !formData.startTime || !formData.endTime || !formData.activityType) {
      alert('Please fill in all required fields');
      return;
    }
    // Format the time for display
    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${period}`;
    };
    const newEvent = {
      date: formData.date,
      title: formData.activityName,
      time: `${formatTime(formData.startTime)} - ${formatTime(formData.endTime)}`,
      type: formData.activityType,
      participants: formData.participants
    };
    // Save to localStorage
    const existingEvents = JSON.parse(localStorage.getItem('fitnessEvents') || '[]');
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem('fitnessEvents', JSON.stringify(updatedEvents));
    onSubmit?.(newEvent);
    onClose();
  };

  // Drawer animation variants
  const drawerVariants = {
    hidden: {
      x: '100%',
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Drawer */}
          <motion.div
            className="w-full max-w-md h-full bg-white shadow-xl rounded-l-2xl p-8 flex flex-col overflow-y-auto"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#222]">Add Schedule</h2>
              <button
                onClick={onClose}
                className="text-[#bdbdbd] hover:text-[#222] text-2xl"
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto">
              <div>
                <label htmlFor="activityName" className="block text-sm font-semibold text-[#222] mb-2">
                  Activity Name
                </label>
                <input
                  type="text"
                  id="activityName"
                  name="activityName"
                  value={formData.activityName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-[#222] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-semibold text-[#222] mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-semibold text-[#222] mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="activityType" className="block text-sm font-semibold text-[#222] mb-2">
                  Activity Type
                </label>
                <select
                  id="activityType"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                  required
                >
                  <option value="">Select activity type</option>
                  <option value="Running">Running</option>
                  <option value="Gym">Gym</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Yoga">Yoga</option>
                </select>
              </div>
              <div>
                <label htmlFor="participants" className="block text-sm font-semibold text-[#222] mb-2">
                  Add Participants
                </label>
                <input
                  type="text"
                  id="participants"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                  placeholder="Enter participant names"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-semibold text-[#222] bg-[#f8f9fa] rounded-lg hover:bg-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-semibold text-white bg-[#4ec7a8] rounded-lg hover:bg-[#22b893] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8]"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddScheduleDrawer; 