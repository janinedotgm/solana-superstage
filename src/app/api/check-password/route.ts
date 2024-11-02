import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {

    const body = await request.json();
    const { password } = body;
    const correctPassword = process.env.AUTH_PWD;

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
} 