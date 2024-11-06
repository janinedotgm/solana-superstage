'use client';

import React, { useState, useEffect } from "react";
import Solflare from "@solflare-wallet/sdk";
import { Hero } from '../../components/hero';
import { Button } from '../../components/button';
import { useToast } from '@/components/toast';
import { PublicKey } from "@solana/web3.js";
import nacl from 'tweetnacl';

const MSG = 'Yes, please sign me up for the airdrop!';

export default function WalletPage() {
  const { showToast } = useToast();
  const [connected, setConnected] = useState(false);
  const [solflare, setSolflare] = useState<any>(null);
  const [currentWallet, setCurrentWallet] = useState<string>('');
  const [showSignButton, setShowSignButton] = useState(true);

  useEffect(() => {
    const sf = new Solflare();
    
    setSolflare(sf);
    
    sf.detectWallet().then((detected: boolean) => console.log('Wallet detected', detected));
  }, []);

  const handleDisconnected = () => {
    setConnected(false);
    setCurrentWallet('');
    solflare?.removeAllListeners('disconnect');
  };

  const handleConnect = async () => {
    try {
      await solflare?.connect();

      const publicKeyStr = solflare?.publicKey.toString();
      setCurrentWallet(publicKeyStr);

      solflare?.on('disconnect', handleDisconnected);

      solflare?.on('accountChanged', (publicKey: any) => {
        if (!publicKey) {
          handleDisconnected();
        } else {
          const newPublicKeyStr = publicKey.toString();
          setCurrentWallet(newPublicKeyStr);
        }
      });

      setConnected(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignMessage = async () => {
    try {

      const signature = await solflare?.signMessage(
        new TextEncoder().encode(MSG),
        'utf8'
      );

      const pubKey = new PublicKey(currentWallet);
      const messageBuffer = new TextEncoder().encode(MSG);
      const signatureUint8Array = new Uint8Array(signature);
      const publicKeyUint8Array = pubKey.toBytes();
      const verified = nacl.sign.detached.verify(messageBuffer, signatureUint8Array, publicKeyUint8Array);

      if (!verified) {
        showToast('Failed to verify signature.', 'error');
        return;
      }
      
      if (currentWallet) {
        const response = await fetch('/api/wallets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicKey: currentWallet }),
        });

        if (!response.ok) {
          throw new Error('Failed to save wallet address');
        }
      }
      setShowSignButton(false);
      showToast('That worked! You\'ll receive your tokens soon!🚀', 'success');
    } catch (e) {
      console.error(e);
      showToast('Failed to sign message. Please try again.', 'error');
    }
  };

  return (
    <Hero
      highlightText="Solana Superstage"
      headingText="Almost there!"
      subheadingText={connected ? "Click on the button below to sign a message, to prove you want to receive crypto." : "Click on the button below to connect your wallet, so you can receive crypto."}
    >
      {connected ? (
        <div className="flex flex-col gap-4 items-center">
          { showSignButton && (<Button 
            onClick={handleSignMessage} 
            className="px-4 py-2 bg-white text-white font-bold rounded hover:bg-blue-600 transition-colors"
          >
            Sign Message
          </Button> ) }
 
        </div>
      ) : (
        <Button 
          onClick={handleConnect} 
          className="px-4 py-2 bg-white text-white font-bold rounded hover:bg-blue-600 transition-colors"
        >
          Connect Wallet
        </Button>
      )}
    </Hero>
  );
} 
