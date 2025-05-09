import React from 'react';

function formatEventDate(dateStr) {
  const date = new Date(dateStr);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  return { weekday, day };
}

function formatEventTime(time) {
  // Format as 09:00 AM
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12.toString().padStart(2, '0')}:${m} ${ampm}`;
}

function isFutureActivity(activity) {
  const now = new Date();
  const activityDate = new Date(activity.date + 'T' + (activity.startTime || '00:00'));
  return activityDate >= now;
}

const RecentEvents = ({ activities }) => {
  // Only future activities, sorted by time added (id descending), take latest 3
  const upcoming = activities
    .filter(isFutureActivity)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#e5e7eb] font-inter" style={{ minWidth: 340 }}>
      <h2 className="font-bold text-2xl mb-6 text-[#000000] font-poppins">Recent Events</h2>
      <div className="flex flex-col gap-4 items-center">
        {upcoming.length === 0 && <div className="text-[#696767] text-sm">No upcoming activities</div>}
        {upcoming.map(activity => {
          const { weekday, day } = formatEventDate(activity.date);
          return (
            <div
              key={activity.id}
              className="flex items-center justify-between bg-white"
              style={{
                width: 334,
                height: 53,
                boxShadow: '0px 0px 4px rgba(84,76,76,0.15)',
                borderRadius: 10,
                padding: '0 12px',
                overflow: 'hidden',
                minWidth: 334,
                minHeight: 53,
                border: '1px solid #e5e7eb',
              }}
            >
              {/* Date block */}
              <div className="flex flex-col items-center justify-center min-w-[56px] pr-3" style={{height: '100%'}}>
                <span className="font-bold text-base text-[#000000] font-poppins leading-none">{weekday}</span>
                <span className="font-bold text-lg text-[#000000] font-poppins leading-none">{day}</span>
              </div>
              {/* Divider */}
              <div style={{height: 36, width: 1, background: '#e5e7eb', margin: '0 10px'}} />
              {/* Event info */}
              <div className="flex-1 flex flex-col justify-center min-w-0" style={{overflow: 'hidden'}}>
                <span className="font-semibold text-[#000000] text-sm font-poppins truncate" style={{lineHeight: '1.1'}}>{activity.title}</span>
                <div className="flex items-center gap-1 text-[#696767] text-xs mt-0.5">
                  <span className="inline-block align-middle" style={{ fontSize: 15, color: '#544C4C' }}>⏰</span>
                  <span className="align-middle font-medium truncate">
                    {formatEventTime(activity.startTime || '00:00')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentEvents;
