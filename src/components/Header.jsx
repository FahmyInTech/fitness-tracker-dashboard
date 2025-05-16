import React from 'react';

const Header = () => (
  <header className="flex items-center justify-between px-8 py-4 border-b border-[#e5e7eb] bg-white">
    <div className="text-[#bdbdbd] text-sm font-medium tracking-wide">MainMenu &gt; <span className="text-[#222] font-semibold">Schedule</span></div>
    <div className="flex items-center gap-6">
      <button className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center text-xl hover:bg-[#e5e7eb] transition">💬</button>
      <button className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center text-xl hover:bg-[#e5e7eb] transition">🔔</button>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-[#222]">👤</div>
        <div className="hidden md:block">
          <div className="font-semibold text-base text-[#222] leading-tight">Username</div>
          <div className="text-xs text-[#bdbdbd]">usernameid@.com</div>
        </div>
      </div>
    </div>
  </header>
);

export default Header; 