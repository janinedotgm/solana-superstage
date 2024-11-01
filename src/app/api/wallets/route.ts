import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const CSV_PATH = path.join(process.cwd(), 'wallets.csv');

export async function POST(request: Request) {
  try {
    const { addresses } = await request.json();
    const csvContent = ['Wallet Address', ...addresses].join('\n');
    await writeFile(CSV_PATH, csvContent);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save addresses' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const content = await readFile(CSV_PATH, 'utf-8');
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=wallet-addresses.csv'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read addresses' }, { status: 500 });
  }
} 