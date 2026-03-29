import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status } = body;

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ data: lead, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to update lead' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.lead.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: null, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
