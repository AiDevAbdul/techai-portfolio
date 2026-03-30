import { prisma } from '@/lib/prisma';
import { leadSchema } from '@/lib/validations';
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
    const validated = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: validated,
    });

    // Send emails asynchronously
    Promise.all([
      sendLeadNotification(validated.name, validated.email, validated.message),
      sendWelcomeEmail(validated.email, validated.name),
    ]).catch((err) => console.error('Email sending failed:', err));

    return NextResponse.json({ data: lead, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to create lead' },
      { status: 400 }
    );
  }
}
