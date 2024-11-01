'use client';

import React, { useState, useEffect } from "react";
import Solflare from "@solflare-wallet/sdk";
import { Connection } from '@solana/web3.js';

export default function WalletPage() {
  const [connected, setConnected] = useState(false);
  const [solflare, setSolflare] = useState<any>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [currentWallet, setCurrentWallet] = useState<string>('');

  useEffect(() => {
    const sf = new Solflare();
    const conn = new Connection(
      'https://fittest-crimson-night.solana-mainnet.discover.quiknode.pro/ce5a19f97c9f96af9d395263ffb2bdba8ea007eb/',
      'confirmed'
    );
    
    setSolflare(sf);
    setConnection(conn);
    
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
      console.log('✨ Connected! Public Key:', publicKeyStr);
      setCurrentWallet(publicKeyStr);

      solflare?.on('disconnect', handleDisconnected);

      solflare?.on('accountChanged', (publicKey: any) => {
        console.log('accountChanged', publicKey);
        if (!publicKey) {
          handleDisconnected();
        } else {
          const newPublicKeyStr = publicKey.toString();
          setCurrentWallet(newPublicKeyStr);
        }
      });

      setConnected(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisconnect = async () => {
    try {
      await solflare?.disconnect();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignMessage = async () => {
    console.log('handleSignMessage ::: ');
    try {
      const signature = await solflare?.signMessage(
        new TextEncoder().encode('Test message'),
        'utf8'
      );
      document.body.append(JSON.stringify(signature));
      console.log('signature ::: ', signature);
    } catch (e) {
      console.log('handleSignMessage ::: error ::: ', e);
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {connected ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-sm text-gray-600 mb-4">
            Connected: {currentWallet}
          </div>
          <button 
            onClick={handleSignMessage} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Sign Message
          </button>
          <button 
            onClick={handleDisconnect} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={handleConnect} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
} 