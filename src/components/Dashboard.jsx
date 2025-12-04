import React, { useState } from 'react';
import { LogOut, RefreshCw, Shield, User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
  const { user, logout, authenticatedFetch } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProtectedData = async () => {
    setLoading(true);
    try {
      const response = await authenticatedFetch('/api/protected/data');
      const data = await response.json();
      setProtectedData(data);
    } catch (error) {
      console.error('Failed to fetch protected data:', error);
      alert('Failed to fetch protected data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Welcome, {user?.name}!</h3>
            <p className="text-sm text-gray-600">Authenticated User</p>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">User ID:</span> {user?.id}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={fetchProtectedData}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Fetch Protected Data
            </>
          )}
        </button>

        {protectedData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Protected Data:
            </h4>
            <pre className="text-sm bg-white p-3 rounded overflow-auto border border-green-100">
              {JSON.stringify(protectedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;