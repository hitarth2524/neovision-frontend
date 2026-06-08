import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://neovision-backend-ngm8.onrender.com';
    const res = await fetch(`${backendUrl}/api/products`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
