'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Solflare from "@solflare-wallet/sdk";
import { Hero } from '../../components/hero';
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
    <Hero
        highlightText="Solana Superstage"
        headingText="Last step. I promise ;)"
        subheadingText="Click on the button below to connect your wallet, so you can receive crypto."
      >
      <p>Connecting wallet...</p>
    </Hero>
  );
} 