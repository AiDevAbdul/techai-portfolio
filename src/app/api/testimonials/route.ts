import { prisma } from '@/lib/prisma';
import { testimonialSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ data: testimonials, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: validated,
    });

    return NextResponse.json({ data: testimonial, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to create testimonial' },
      { status: 400 }
    );
  }
}
