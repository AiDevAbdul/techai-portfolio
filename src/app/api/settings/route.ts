import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json({ data: settings, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ data: setting, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to update setting' },
      { status: 400 }
    );
  }
}
