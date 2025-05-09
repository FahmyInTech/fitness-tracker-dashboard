import React from 'react';
import avatar1 from '../images/download (4) 1.png';
import avatar2 from '../images/download (2) 3.png';
import avatar3 from '../images/download (5) 1.png';
import avatar4 from '../images/Rectangle 333.png';
import avatar5 from '../images/Rectangle 334.png';

const localAvatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5];

const renderAvatars = (participants) => {
  // Always render at least one avatar for demo
  const names = participants ? participants.split(/,| /).filter(Boolean).slice(0, 2) : ['Demo'];
  return (
    <span className="flex -space-x-2 ml-2">
      {names.map((name, idx) => (
        <img
          key={idx}
          src={localAvatarImages[idx % localAvatarImages.length]}
          alt={name}
          className="w-7 h-7 rounded-full border-2 border-[#fff] bg-[#e6f7f1] shadow object-cover"
          title={name}
        />
      ))}
    </span>
  );
};

const TrackingActivity = ({ activities, selectedDate }) => {
  // Group activities by date
  const grouped = activities.reduce((acc, activity) => {
    if (!acc[activity.date]) acc[activity.date] = [];
    acc[activity.date].push(activity);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(grouped).sort();

  // Generate time slots from 6 AM to 9 PM
  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 6;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Helper to get display date (e.g., Thu, Mar 14)
  const formatDisplayDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // For overflow handling
  const containerClass = "bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-7 max-h-[400px] overflow-y-auto";

  // If a date is selected, show only that date's activities
  if (selectedDate && grouped[selectedDate]) {
    const dayActivities = grouped[selectedDate];
    return (
      <div className={containerClass}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#222]">Tracking Activity</h3>
          <div className="flex gap-9 text-sm text-[#bdbdbd]">
            {timeSlots.map((time) => (
              <span key={time}>{time}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center min-h-9 text-base text-[#bdbdbd] border-b border-dotted border-[#bdbdbd] last:border-0">
          <span className="w-28 font-bold text-[#4ec7a8]">{formatDisplayDate(selectedDate)}</span>
          <div className="flex-1 flex items-center gap-2">
            {dayActivities.map((activity, index) => {
              const startHour = parseInt(activity.time.split(' - ')[0].split(':')[0]);
              const endHour = parseInt(activity.time.split(' - ')[1].split(':')[0]);
              const startPosition = ((startHour - 6) / 15) * 100;
              const width = ((endHour - startHour) / 15) * 100;
              return (
                <div
                  key={index}
                  className={`inline-flex items-center px-4 py-1 rounded-lg text-white font-semibold ${
                    activity.type === 'Running' ? 'bg-[#f9a26c]' :
                    activity.type === 'Gym' ? 'bg-[#22c55e]' :
                    activity.type === 'Swimming' ? 'bg-[#3b82f6]' :
                    'bg-[#8b5cf6]'
                  }`}
                  style={{ marginLeft: `${startPosition}%`, width: `${width}%` }}
                >
                  {activity.title}
                  {renderAvatars(activity.participants)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show all days with activities (grouped by date)
  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#222]">Tracking Activity</h3>
        <div className="flex gap-9 text-sm text-[#bdbdbd]">
          {timeSlots.map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {sortedDates.map((date) => (
          <div key={date} className="flex items-center min-h-9 text-base text-[#bdbdbd] border-b border-dotted border-[#bdbdbd] last:border-0">
            <span className="w-28 font-bold text-[#4ec7a8]">{formatDisplayDate(date)}</span>
            <div className="flex-1 flex items-center gap-2">
              {grouped[date].map((activity, index) => {
                const startHour = parseInt(activity.time.split(' - ')[0].split(':')[0]);
                const endHour = parseInt(activity.time.split(' - ')[1].split(':')[0]);
                const startPosition = ((startHour - 6) / 15) * 100;
                const width = ((endHour - startHour) / 15) * 100;
                return (
                  <div
                    key={index}
                    className={`inline-flex items-center px-4 py-1 rounded-lg text-white font-semibold ${
                      activity.type === 'Running' ? 'bg-[#f9a26c]' :
                      activity.type === 'Gym' ? 'bg-[#22c55e]' :
                      activity.type === 'Swimming' ? 'bg-[#3b82f6]' :
                      'bg-[#8b5cf6]'
                    }`}
                    style={{ marginLeft: `${startPosition}%`, width: `${width}%` }}
                  >
                    {activity.title}
                    {renderAvatars(activity.participants)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingActivity; 