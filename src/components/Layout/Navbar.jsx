import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCommentDots,
  faSearch,
  faCheck,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/66df6175959cf43d44f90bd5b4e55eeb2f264183.png";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Daily workout completed", time: "2 hours ago", isRead: false },
    { id: 2, text: "You've achieved your weekly goal", time: "5 hours ago", isRead: false },
    { id: 3, text: "Reminder: Workout tomorrow at 9 AM", time: "1 day ago", isRead: true }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "Ahmad Mohammed", text: "How was your workout today?", time: "12:30", avatar: user, isRead: true },
    { id: 2, sender: "Sarah Ali", text: "Will you attend tomorrow?", time: "10:15", avatar: user, isRead: true },
    { id: 3, sender: "Mohammed Khalid", text: "Thanks for the fitness tips", time: "Yesterday", avatar: user, isRead: true }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6 , ul, li');
      let found = false;
      
      elements.forEach(el => {
        if (el.textContent.toLowerCase().includes(searchQuery.toLowerCase())) {
          found = true;
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
          const originalHTML = el.innerHTML;
          el.innerHTML = originalHTML.replace(
            new RegExp(searchQuery, 'gi'),
            match => `<span style="background-color: #329D7F9C ; color:white">${match}</span>`
          );
          
          setTimeout(() => {
            el.innerHTML = originalHTML;
          }, 3000);
        }
      });
      
      if (!found) {
        alert('No matching headings found');
      }
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showMessages) setShowMessages(false);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    if (showNotifications) setShowNotifications(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const markMessageAsRead = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, isRead: true } : message
    ));
  };

  return (
    <>
      <div className={`flex justify-between items-center px-10 py-4 shadow-sm w-full relative ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-[#D9D9D952] text-gray-800'
      }`}>
        <form onSubmit={handleSearch} className={`flex items-center gap-2 px-3 py-2 rounded-full w-72 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        }`}>
          <FontAwesomeIcon icon={faSearch} className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder='Search in page...'
            className={`outline-none text-sm w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-4 relative'>
            <div className="relative">
              <FontAwesomeIcon 
                icon={faCommentDots} 
                className={`w-5 h-5 cursor-pointer p-2 rounded-full hover:text-[#329D7F] ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
                }`}
                onClick={toggleMessages}
              />
              {messages.filter(msg => !msg.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {messages.filter(msg => !msg.isRead).length}
                </span>
              )}
              
              {showMessages && (
                <div className={`absolute top-12 right-0 w-72 rounded-lg shadow-lg z-10 overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className={`p-3 flex justify-between items-center ${
                    isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  }`}>
                    <h3 className="font-medium">Messages</h3>
                    <span className="text-xs text-[#329D7F] cursor-pointer">View All</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {messages.length > 0 ? (
                      messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`p-3 flex items-start gap-3 cursor-pointer ${
                            isDarkMode 
                              ? `border-b border-gray-700 ${!message.isRead ? 'bg-blue-900' : ''} hover:bg-gray-700` 
                              : `border-b border-gray-100 ${!message.isRead ? 'bg-blue-50' : ''} hover:bg-gray-50`
                          }`}
                          onClick={() => markMessageAsRead(message.id)}
                        >
                          <img src={message.avatar} alt={message.sender} className="w-10 h-10 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : ''}`}>
                                {message.sender}
                              </span>
                              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {message.time}
                              </span>
                            </div>
                            <p className={`text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {message.text}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={`p-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No messages
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <FontAwesomeIcon 
                icon={faBell} 
                className={`w-5 h-5 cursor-pointer p-2 rounded-full hover:text-[#329D7F] ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
                }`}
                onClick={toggleNotifications}
              />
              {notifications.filter(note => !note.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications.filter(note => !note.isRead).length}
                </span>
              )}
              
              {showNotifications && (
                <div className={`absolute top-12 right-0 w-72 rounded-lg shadow-lg z-10 overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className={`p-3 flex justify-between items-center ${
                    isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  }`}>
                    <h3 className="font-medium">Notifications</h3>
                    <span 
                      className="text-xs text-[#329D7F] cursor-pointer hover:underline"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div key={notification.id} 
                          className={`p-3 hover:bg-gray-50 ${
                            isDarkMode 
                              ? `border-b border-gray-700 ${!notification.isRead ? 'bg-blue-900' : ''} hover:bg-gray-700` 
                              : `border-b border-gray-100 ${!notification.isRead ? 'bg-blue-50' : ''} hover:bg-gray-50`
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className={`text-sm ${isDarkMode ? 'text-white' : ''}`}>
                                {notification.text}
                              </p>
                              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {notification.time}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button 
                                className={`text-green-500 p-1 rounded ${isDarkMode ? 'hover:bg-green-900' : 'hover:bg-green-100'}`}
                                onClick={() => markNotificationAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                              </button>
                              <button 
                                className={`text-red-500 p-1 rounded ${isDarkMode ? 'hover:bg-red-900' : 'hover:bg-red-100'}`}
                                onClick={() => deleteNotification(notification.id)}
                                title="Delete"
                              >
                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={`p-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className={`p-2 text-center ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
                    <button className="text-sm text-[#329D7F] font-medium hover:underline">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={`flex items-center gap-3 ${isDarkMode ? 'border-l-2 border-gray-700' : 'border-l-2 border-[#908B8B52]'}`}>
            <img src={user} alt="User" className='w-10 h-10 pl-2 rounded-full object-cover' />
            <div className='text-sm'>
              <span className={`block font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Ahmedreda
              </span>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Ahmedreda@.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;