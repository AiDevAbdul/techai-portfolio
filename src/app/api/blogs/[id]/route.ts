import { prisma } from '@/lib/prisma';
import { blogSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json(
        { data: null, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: blog, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch blog' },
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
    const validated = blogSchema.parse(body);

    const blog = await prisma.blog.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({ data: blog, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to update blog' },
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
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ data: null, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
