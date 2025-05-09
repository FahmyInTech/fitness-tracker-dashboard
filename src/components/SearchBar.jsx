import React from 'react';

const SearchBar = () => (
  <div className="flex justify-center w-full mb-6">
    <input
      type="text"
      placeholder="Search"
      className="w-full max-w-lg px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8] bg-[#f8f9fa] text-[#222] placeholder-[#bdbdbd] shadow-sm text-base"
    />
  </div>
);

export default SearchBar; 