'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { Hero } from '../components/hero';
import { Connection } from '@solana/web3.js';

export default function Home() {
  const router = useRouter();
  const [currentUrl] = useState('https://6588-79-140-117-42.ngrok-free.app');

  // Initialize Helius connection
  const connection = new Connection(
    `https://rpc.helius.xyz/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
    'confirmed'
  );

  useEffect(() => {
    const isSolflare = /solflare/i.test(navigator.userAgent);
    if (isSolflare) {
      router.push('/wallet');
    }
  }, [router]);

  const getSolflareDeepLink = () => {
    const targetPath = `${currentUrl}/wallet`;
    const encodedUrl = encodeURIComponent(targetPath);
    const encodedRef = encodeURIComponent(targetPath);
    return `https://solflare.com/ul/v1/browse/${encodedUrl}?ref=${encodedRef}`;
  };

  const QrCodeComponent = (
    <div className="w-[300px] h-[300px] bg-white rounded-lg flex items-center justify-center">
      {currentUrl && <QRCode value={getSolflareDeepLink()} size={256} />}
    </div>
  );

  return (
    <div>
      <Hero
        highlightText="Solana Superstage"
        headingText="Art, Innovation, Change"
        subheadingText="We believe in a future where ownership, copyrights, and fairness matter. We can't give you that today, but we can invite you to join us on this quest and get some free tokens. ;)"
      >
        {QrCodeComponent}
      </Hero>
    </div>
  );
}
