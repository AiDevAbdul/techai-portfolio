import { prisma } from '@/lib/prisma';
import { sendLeadNotification, sendWelcomeEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: leads, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { data: null, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: { name, email, message },
    });

    // Send emails asynchronously
    Promise.all([
      sendLeadNotification(name, email, message),
      sendWelcomeEmail(email, name),
    ]).catch((err) => console.error('Email sending failed:', err));

    return NextResponse.json({ data: lead, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to create lead' },
      { status: 400 }
    );
  }
}
