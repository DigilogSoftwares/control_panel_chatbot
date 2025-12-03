import { useState } from 'react';
import { Home, MessageSquare, Calendar, FileText, BarChart3, Users, ChevronDown, User } from 'lucide-react';

export default function SidebarLayout() {
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: MessageSquare, label: 'FAQs', href: '#' },
    { icon: MessageSquare, label: 'Chat Record', href: '#' },
    { icon: Calendar, label: 'Calendar', href: '#' },
    { icon: FileText, label: 'Documents', href: '#' },
    { icon: BarChart3, label: 'Reports', href: '#' },
  ];

  const teams = [
    { name: 'Heroicons', initial: 'H', color: 'bg-indigo-500' },
    { name: 'Tailwind Labs', initial: 'T', color: 'bg-cyan-500' },
    { name: 'Workcation', initial: 'W', color: 'bg-pink-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">Acme</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors group"
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              {item.label}
            </a>
          ))}

          {/* Your Teams Section */}
          <div className="pt-4">
            <button
              onClick={() => setIsTeamsOpen(!isTeamsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
            >
              <span>Your Teams</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isTeamsOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {isTeamsOpen && (
              <div className="mt-2 space-y-1">
                {teams.map((team, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors group"
                  >
                    <div
                      className={`w-6 h-6 ${team.color} rounded-md flex items-center justify-center mr-3 text-white text-xs font-bold`}
                    >
                      {team.initial}
                    </div>
                    {team.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              TC
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Tom Cook</p>
              <p className="text-xs text-gray-500">Your profile</p>
            </div>
            <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Tom! Here's what's happening today.</p>
          
          {/* Placeholder content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Card {item}</h3>
                <p className="text-gray-600 text-sm">
                  This is a placeholder card to demonstrate the layout.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}