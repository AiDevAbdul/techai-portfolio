import { prisma } from '@/lib/prisma';
import { blogSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: blogs, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = blogSchema.parse(body);

    const blog = await prisma.blog.create({
      data: validated,
    });

    return NextResponse.json({ data: blog, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to create blog' },
      { status: 400 }
    );
  }
}
