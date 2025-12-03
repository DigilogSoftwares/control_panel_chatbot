import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  Eye,
  EyeOff,
  Tag,
} from "lucide-react";
export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600">
        Welcome back, Tom! Here's what's happening today.
      </p>

      {/* Placeholder content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Card {item}
            </h3>
            <p className="text-gray-600 text-sm">
              This is a placeholder card to demonstrate the layout.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
