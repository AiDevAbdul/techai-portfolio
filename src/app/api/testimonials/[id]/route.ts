import { prisma } from '@/lib/prisma';
import { testimonialSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json(
        { data: null, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: testimonial, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({ data: testimonial, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to update testimonial' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ data: null, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
