'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Solflare from "@solflare-wallet/sdk";

export default function Connect() {
  const router = useRouter();

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const sf = new Solflare();
        await sf.connect();
        router.push('/'); // Redirect to main page after connecting
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Connecting wallet...</p>
    </div>
  );
} 