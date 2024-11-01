'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Solflare from "@solflare-wallet/sdk";
import QRCode from 'react-qr-code';

export default function Home() {
  const router = useRouter();
  const [currentUrl] = useState('https://6588-79-140-117-42.ngrok-free.app');

  useEffect(() => {
    // Check if we're in Solflare's in-app browser
    const isSolflare = /solflare/i.test(navigator.userAgent);
    
    if (isSolflare) {
      // Redirect to wallet page if we're in Solflare
      router.push('/wallet');
    }
  }, [router]);

  const getSolflareDeepLink = () => {
    // Remove the extra /wallet at the end of the deep link URL
    const targetPath = `${currentUrl}/wallet`;
    const encodedUrl = encodeURIComponent(targetPath);
    const encodedRef = encodeURIComponent(targetPath);
    return `https://solflare.com/ul/v1/browse/${encodedUrl}?ref=${encodedRef}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center">
        {currentUrl && <QRCode value={getSolflareDeepLink()} size={256} />}
        <p className="mt-4">Scan to connect your wallet!</p>
      </div>
    </div>
  );
}
