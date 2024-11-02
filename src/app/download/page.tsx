'use client';

import { useState, useEffect } from 'react';

interface WalletStats {
  totalWallets: number;
}

export default function DownloadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<WalletStats>({
    totalWallets: 0
  });
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch stats when page loads
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      // Refresh stats every 30 seconds
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/wallets');
      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const content = await response.text();
      const lines = content.split('\n').filter(line => line.trim());
      // Remove header row from count
      const walletCount = Math.max(0, lines.length - 1);
      
      setStats({
        totalWallets: walletCount,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/wallets');
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'wallet-addresses.csv';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch('/api/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const body = await response.json();

      if (response.ok && body.success) {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Password check failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {!isAuthenticated ? (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Enter Password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Password"
          />
          <button
            onClick={handlePasswordSubmit}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-8">Wallet Collection Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {stats.totalWallets}
              </div>
              <div className="text-gray-600">Total Wallets Collected</div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg ${
              isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold transition-colors`}
          >
            {isLoading ? 'Downloading...' : 'Download CSV'}
          </button>
        </>
      )}
    </div>
  );
} 