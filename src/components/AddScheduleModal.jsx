import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Generate hours from 05:00 to 23:00
const HOURS = Array.from({ length: 19 }, (_, i) => {
  const hour = (i + 5).toString().padStart(2, '0');
  return `${hour}:00`;
});

const COLOR_OPTIONS = [
  { value: 'bg-green-500', label: 'Green', hex: '#22c55e', icon: '🌿' },
  { value: 'bg-orange-400', label: 'Orange', hex: '#fb923c', icon: '🍊' },
  { value: 'bg-blue-400', label: 'Blue', hex: '#60a5fa', icon: '🌊' },
  { value: 'bg-purple-500', label: 'Purple', hex: '#a855f7', icon: '💜' },
  { value: 'bg-pink-500', label: 'Pink', hex: '#ec4899', icon: '🌸' },
  { value: 'bg-teal-500', label: 'Teal', hex: '#14b8a6', icon: '🌊' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AddScheduleModal = ({ open, onClose, onAdd, activity, onUpdate, onDelete }) => {
  const isEdit = !!activity;
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(HOURS[0]);
  const [participants, setParticipants] = useState('');
  const [color, setColor] = useState('bg-green-500');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState(HOURS[0].split(':')[0] < 12 ? 'AM' : 'PM');
  const timePickerRef = useRef(null);

  useEffect(() => {
    if (isEdit && activity) {
      setTitle(activity.title || '');
      setDate(activity.date || '');
      setTime(activity.startTime || HOURS[0]);
      setParticipants(activity.participants ? activity.participants.join(', ') : '');
      setColor(activity.color || 'bg-green-500');
    } else {
      setTitle(''); setDate(''); setTime(HOURS[0]); setParticipants(''); setColor('bg-green-500');
    }
  }, [activity, isEdit, open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!open) return null;

  const formatTimeForDisplay = (time) => {
    const [hours] = time.split(':').map(Number);
    const h = hours % 12 || 12;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${h}:00 ${ampm}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !time) return;
    
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 5 || hour > 23) {
      alert('Please select a time between 05:00 AM and 11:00 PM.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newActivity = {
        id: isEdit ? activity.id : Date.now(),
        title,
        type: '',
        date,
        startTime: time,
        endTime: time,
        participants: participants.split(',').map(p => p.trim()).filter(Boolean),
        color,
      };
      
      if (isEdit) {
        await onUpdate(newActivity);
      } else {
        await onAdd(newActivity);
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isEdit && onDelete) {
      setIsSubmitting(true);
      try {
        await onDelete(activity.id);
        onClose();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Fixed date handling
  const handleDateSelect = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
    setShowDatePicker(false);
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
    setShowTimePicker(false);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const filteredHours = HOURS.filter(t => {
    const hour = parseInt(t.split(':')[0], 10);
    return selectedPeriod === 'AM' ? hour < 12 : hour >= 12;
  });

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const today = new Date();
    const selectedDateObj = date ? new Date(date) : null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-white/40 overflow-hidden"
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handlePrevMonth}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-semibold text-gray-800">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handleNextMonth}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isToday = date.toDateString() === today.toDateString();
              const isSelected = selectedDateObj && date.toDateString() === selectedDateObj.toDateString();
              
              // Fixed date string generation
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const dayStr = String(date.getDate()).padStart(2, '0');
              const dateStr = `${year}-${month}-${dayStr}`;

              return (
                <button
                  key={day}
                  type="button"
                  className={`aspect-square flex items-center justify-center text-sm font-medium rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#4ec7a8] text-white'
                      : isToday
                      ? 'bg-gray-100 text-gray-800'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => handleDateSelect(date)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };



  const renderTimePicker = () => {
    return (
      <motion.div
        ref={timePickerRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-white/40 overflow-hidden"
      >
        <div className="p-2 flex gap-2 border-b border-gray-100">
          <button
            type="button"
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedPeriod === 'AM' ? 'bg-[#4ec7a8] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handlePeriodChange('AM')}
          >
            AM
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedPeriod === 'PM' ? 'bg-[#4ec7a8] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handlePeriodChange('PM')}
          >
            PM
          </button>
        </div>
        <div className="max-h-48 overflow-y-auto custom-scrollbar">
          {filteredHours.map((t) => (
            <button
              key={t}
              type="button"
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-all ${
                time === t ? 'bg-[#4ec7a8]/10 text-[#4ec7a8] font-medium' : 'text-gray-600'
              }`}
              onClick={() => handleTimeSelect(t)}
            >
              {formatTimeForDisplay(t)}
            </button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-end md:items-center md:justify-end bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md md:rounded-3xl rounded-t-3xl rounded-l-3xl shadow-2xl border border-white/30 p-6 md:p-10 flex flex-col bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-2xl"
          style={{
            margin: 0,
            right: 0,
            bottom: 0,
            minHeight: '60vh',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="md:hidden flex justify-center items-center pt-2 pb-4">
            <div className="w-12 h-1.5 rounded-full bg-[#bdbdbd] opacity-60" />
          </div>
        
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-6 text-[#4ec7a8] text-3xl hover:text-[#22b893] z-10 bg-white/60 rounded-full p-1 shadow-md border border-white/40 transition-all" 
            onClick={onClose} 
            aria-label="Close"
          >
            ×
          </motion.button>

          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-extrabold mb-8 text-[#222] tracking-tight drop-shadow-sm"
          >
            {isEdit ? 'Edit Activity' : 'Add Schedule'}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-[#222]">Title</label>
              <div className="relative">
                <input 
                  className={`w-full border ${activeField === 'title' ? 'border-[#4ec7a8]' : 'border-white/40'} shadow-sm rounded-2xl px-4 py-3 bg-white/70 text-[#222] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8] transition-all placeholder:text-gray-400`}
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Enter activity title"
                  onFocus={() => setActiveField('title')}
                  onBlur={() => setActiveField(null)}
                  required 
                />
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={false}
                  animate={{ 
                    boxShadow: activeField === 'title' ? '0 0 0 2px rgba(78, 199, 168, 0.2)' : 'none'
                  }}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-[#222]">Date</label>
              <div className="relative">
                <button
                  type="button"
                  className={`w-full border ${activeField === 'date' ? 'border-[#4ec7a8]' : 'border-white/40'} shadow-sm rounded-2xl px-4 py-3 bg-white/70 text-[#222] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8] transition-all text-left flex items-center justify-between`}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  onFocus={() => setActiveField('date')}
                  onBlur={() => setActiveField(null)}
                >
                  <span>{date || 'Select date'}</span>
                  <svg className="w-4 h-4 text-[#4ec7a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showDatePicker && renderCalendar()}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-[#222]">Time</label>
              <div className="relative">
                <button
                  type="button"
                  className={`w-full border ${activeField === 'time' ? 'border-[#4ec7a8]' : 'border-white/40'} shadow-sm rounded-2xl px-4 py-3 bg-white/70 text-[#222] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8] transition-all text-left flex items-center justify-between`}
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  onFocus={() => setActiveField('time')}
                  onBlur={() => setActiveField(null)}
                >
                  <span>{formatTimeForDisplay(time)}</span>
                  <svg className="w-4 h-4 text-[#4ec7a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showTimePicker && renderTimePicker()}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-[#222]">Participants (comma separated)</label>
              <div className="relative">
                <input 
                  className={`w-full border ${activeField === 'participants' ? 'border-[#4ec7a8]' : 'border-white/40'} shadow-sm rounded-2xl px-4 py-3 bg-white/70 text-[#222] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8] transition-all placeholder:text-gray-400`}
                  value={participants} 
                  onChange={e => setParticipants(e.target.value)}
                  placeholder="e.g. John, Jane, Mike"
                  onFocus={() => setActiveField('participants')}
                  onBlur={() => setActiveField(null)}
                />
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={false}
                  animate={{ 
                    boxShadow: activeField === 'participants' ? '0 0 0 2px rgba(78, 199, 168, 0.2)' : 'none'
                  }}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-[#222]">Color</label>
              <div className="grid grid-cols-3 gap-3">
                {COLOR_OPTIONS.map(({ value, label, hex, icon }) => (
                  <motion.button
                    key={value}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      color === value 
                        ? 'border-[#4ec7a8] scale-105' 
                        : 'border-transparent hover:border-[#4ec7a8]/50'
                    }`}
                    onClick={() => setColor(value)}
                  >
                    <div 
                      className="w-full h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: hex }}
                    >
                      <span className="text-lg">{icon}</span>
                    </div>
                    <motion.span 
                      initial={false}
                      animate={{ 
                        opacity: color === value ? 1 : 0,
                        y: color === value ? 0 : 10
                      }}
                      className="absolute inset-0 flex items-center justify-center text-white font-medium bg-black/20 rounded-lg"
                    >
                      {label}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 mt-8"
            >
              {isEdit && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button" 
                  className="flex-1 bg-red-500/90 text-white px-4 py-3 rounded-2xl font-semibold hover:bg-red-600/90 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  Delete
                </motion.button>
              )}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="flex-1 bg-gradient-to-r from-[#4ec7a8] to-[#22b893] text-white py-3 rounded-2xl font-semibold shadow-md hover:from-[#22b893] hover:to-[#4ec7a8] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Saving...' : (isEdit ? 'Update' : 'Add Activity')}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddScheduleModal;
