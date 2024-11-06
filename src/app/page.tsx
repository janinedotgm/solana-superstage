'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { Hero } from '../components/hero';

export default function Home() {
  const router = useRouter();
  const [currentUrl] = useState('https://solana-superstage.vercel.app/');

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
        highlightText="Solana Super Stage"
        headingText="an airdrop powered by SolFlare"
        subheadingText="Connect your wallet and sign a message to secure your airdrop."
      >
        {QrCodeComponent}
      </Hero>
    </div>
  );
}
