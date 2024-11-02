import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Specify that this function should run as a Serverless Function
export const runtime = 'nodejs';
const token = process.env.EDGE_CONFIG_TOKEN;
const id = process.env.EDGE_CONFIG_ID;

export async function POST(request: NextRequest) {
  try {

    console.log("🚀 ~ id:", id)
    console.log("🚀 ~ token:", token)

    const data = await request.json();
    const { publicKey } = data;

    if (!publicKey) {
      return NextResponse.json(
        { error: 'Address is required in request body' },
        { status: 400 }
      );
    }

    // Use an allowed format for the key (remove colon)
    const walletKey = `wallet${publicKey}`; 

    // Upsert the new walletKey directly
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${id}/items`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: walletKey,
              value: publicKey,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error('Error updating Edge Config:', await response.text());
      return NextResponse.json(
        { error: 'Failed to update Edge Config' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Wallet registered successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${id}/items?key=walletKeys`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching Edge Config:', errorText);
      return NextResponse.json(
        { error: `Failed to fetch wallet data: ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Log the entire response for debugging

    if (!data) {
      console.error('No items found in the response');
      return NextResponse.json(
        { error: 'No wallet data found' },
        { status: 500 }
      );
    }

    const wallets = data.map((item: any) => item.value);

    // Convert wallet data to CSV format
    const csvContent = ['publicKey', ...wallets].join('\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="wallet-addresses.csv"',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


