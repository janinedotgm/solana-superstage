import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { publicKey } = await request.json();
    
    if (!publicKey) {
      return NextResponse.json(
        { error: 'Public key is required' },
        { status: 400 }
      );
    }

    const csvPath = path.join(process.cwd(), 'wallets.csv');
    
    // Create file with headers if it doesn't exist
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, 'public_key\n');
    }

    // Append the new wallet
    fs.appendFileSync(csvPath, `${publicKey}\n`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving wallet:', error);
    return NextResponse.json(
      { error: 'Failed to save wallet' },
      { status: 500 }
    );
  }
} 