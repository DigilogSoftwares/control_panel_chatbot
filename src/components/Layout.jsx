import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Calendar,
  FileText,
  BarChart3,
  Users,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function SidebarLayout() {
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: MessageSquare, label: "FAQs", href: "/faqs" },
    { icon: MessageSquare, label: "Chat Record", href: "/chat" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
  ];

  const teams = [
    { name: "Heroicons", initial: "H", color: "bg-indigo-500" },
    { name: "Tailwind Labs", initial: "T", color: "bg-cyan-500" },
    { name: "Workcation", initial: "W", color: "bg-pink-500" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar - Polaris style */}
      <div className="h-16 flex items-center justify-between px-6 bg-white shadow-sm rounded-b-2xl p-4 mx-4">

        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">Acme</span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - Polaris style */}
        <div className="w-64 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm ml-4 mt-4 flex flex-col overflow-y-auto">
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group
      ${
        isActive
          ? "bg-indigo-50 text-indigo-700 font-semibold"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        isActive
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}

            {/* Teams Section */}
            <div className="pt-4">
              <button
                onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
              >
                <span>Your Teams</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isTeamsOpen ? "rotate-180" : ""
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
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "SAMPLE"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "digilog.pk"}
                </p>
              </div>
              <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
