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

  // Fetch stats when page loads
  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
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
    </div>
  );
} 