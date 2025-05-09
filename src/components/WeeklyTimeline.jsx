import React, { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Key hours to show by default (5 AM, 1 PM, 9 PM)
const KEY_HOURS = ['05:00', '13:00', '21:00'];

function getDayNameFromDate(dateStr) {
  const date = new Date(dateStr);
  return DAYS[date.getDay()];
}

const AvatarGroup = ({ participants }) => (
  <div className="flex -space-x-2 ml-2">
    {participants.slice(0, 3).map((p, i) =>
      p.includes('/') ? (
        <img
          key={i}
          src={p}
          alt="avatar"
          className="w-6 h-6 rounded-full border-2 border-white object-cover shadow font-poppins"
        />
      ) : (
        <span
          key={i}
          className="w-6 h-6 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white shadow font-poppins"
        >
          {p[0]}
        </span>
      )
    )}
    {participants.length > 3 && (
      <span className="w-6 h-6 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white shadow font-poppins">+{participants.length - 3}</span>
    )}
  </div>
);

const formatTime = (time) => {
  const [hours] = time.split(':').map(Number);
  const h = hours % 12 || 12;
  const ampm = hours < 12 ? 'am' : 'pm';
  return (
    <span className="text-[16px]">
      {h}:00 <span className="text-[13px] font-normal">{ampm}</span>
    </span>
  );
};

// Helper to normalize time string to HH:MM
function normalizeTimeStr(timeStr) {
  if (!timeStr) return '00:00';
  let [h, m] = timeStr.trim().split(':');
  if (!h) h = '00';
  if (!m) m = '00';
  h = h.padStart(2, '0');
  m = m.padStart(2, '0');
  return `${h}:${m}`;
}

// Returns a percentage (0 for 5:00, 100 for 23:00)
function timeToPercent(timeStr) {
  const [h, m] = normalizeTimeStr(timeStr).split(':').map(Number);
  const minutes = h * 60 + m;
  const start = 5 * 60;
  const end = 23 * 60;
  if (minutes < start || minutes > end) return null; // Out of range
  return ((minutes - start) / (end - start)) * 100;
}

// Dynamically set transform to avoid overflow at timeline edges
function getActivityTransform(percent) {
  if (percent <= 0) return 'translate(0, 0)';         // Exactly 5 AM
  if (percent >= 100) return 'translate(-100%, 0)';   // Exactly 11 PM
  return 'translate(-50%, 0)';                        // Middle
}

const WeeklyTimeline = ({ activities, selectedDate, onEditActivity }) => {
  const [hoveredActivity, setHoveredActivity] = useState(null);
  
  let filteredActivities = activities;
  if (selectedDate) {
    filteredActivities = activities.filter(a => a.date === selectedDate);
  }

  // Timeline height and row height
  const timelineHeight = 7 * 80; // 7 days, 80px per row
  const rowHeight = 80;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#e5e7eb] font-inter relative" style={{ minHeight: timelineHeight + 60, width: '100%', maxWidth: '1200px' }}>
      {/* Tracking Activity Title */}
      <div
        style={{
          position: 'absolute',
          left: '4.06%',
          top: '4.24%',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 23,
          lineHeight: '28px',
          color: '#000',
          zIndex: 20,
        }}
      >
        Tracking Activity
      </div>
      {/* Hour labels - hidden but maintaining layout */}
      <div className="relative w-full" style={{ height: 40, marginBottom: 8, visibility: 'hidden' }}>
        {KEY_HOURS.map((time) => (
          <div
            key={time}
            className="absolute top-0 -translate-x-1/2 font-inter font-medium text-[16px] leading-[20px] text-[#908B8B]"
            style={{ left: `${timeToPercent(time)}%` }}
          >
            {formatTime(time)}
          </div>
        ))}
      </div>
      {/* Timeline area */}
      <div className="relative w-full" style={{ height: timelineHeight, width: '100%' }}>
        {/* Day labels */}
        {DAYS.map((day, i) => {
          const isSelected = selectedDate && getDayNameFromDate(selectedDate) === day;
          return (
            <div
              key={day}
              className={`absolute font-poppins font-medium text-[23px] leading-[80px] tracking-[.03em] text-left transition-colors ${
                isSelected ? 'text-[#329D7F]' : 'text-[#908B8B]'
              }`}
              style={{ top: i * rowHeight, height: rowHeight, width: 84, zIndex: 2, left: 0 }}
            >
              {day}
            </div>
          );
        })}
        {/* Timeline and activities container */}
        <div
          className="absolute"
          style={{
            left: 84,
            width: 'calc(100% - 84px)',
            top: 0,
            height: timelineHeight,
          }}
        >
          {/* Horizontal dashed lines */}
          {DAYS.map((_, i) => (
            <div
              key={i}
              className="absolute border-t border-dashed border-[#bdbdbd]"
              style={{
                left: 0,
                width: '100%',
                top: i * rowHeight + rowHeight / 2,
                height: 0,
                borderWidth: 1,
                zIndex: 1,
              }}
            />
          ))}
          {/* Activities */}
          {DAYS.map((day, i) => {
            const dayActivities = filteredActivities
              .filter(a => getDayNameFromDate(a.date) === day)
              .filter(a => timeToPercent(normalizeTimeStr(a.startTime)) !== null)
              .sort((a, b) => {
                const [ah, am] = normalizeTimeStr(a.startTime).split(':').map(Number);
                const [bh, bm] = normalizeTimeStr(b.startTime).split(':').map(Number);
                return (ah * 60 + am) - (bh * 60 + bm);
              });
            return dayActivities.map((activity) => {
              const normTime = normalizeTimeStr(activity.startTime);
              const leftPercent = timeToPercent(normTime);
              console.log(activity.title, activity.startTime, leftPercent); // DEBUG
              if (leftPercent === null) return null;
              const percent = leftPercent;
              const isFiveAM = leftPercent === 0;
              const leftStyle = isFiveAM ? '0%' : `calc(${leftPercent}% + 26px)`;
              return (
                <div
                  key={activity.id}
                  className="relative"
                  style={{
                    position: 'absolute',
                    top: i * rowHeight + rowHeight / 2 - 24,
                    left: leftStyle,
                    transform: getActivityTransform(percent),
                    zIndex: 10,
                  }}
                >
                  {/* Time tooltip */}
                  {hoveredActivity === activity.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#222] text-white text-xs rounded-md font-medium whitespace-nowrap">
                      {formatTime(activity.startTime)}
                    </div>
                  )}
                  {/* Activity card */}
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-white text-sm font-semibold shadow font-poppins cursor-pointer transition hover:scale-105 ${activity.color}`}
                    style={{
                      minWidth: 96,
                      maxWidth: 180,
                    }}
                    onClick={() => onEditActivity && onEditActivity(activity)}
                    onMouseEnter={() => setHoveredActivity(activity.id)}
                    onMouseLeave={() => setHoveredActivity(null)}
                  >
                    {activity.title}
                    {activity.participants && activity.participants.length > 0 && (
                      <AvatarGroup participants={activity.participants} />
                    )}
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimeline; 