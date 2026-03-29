import { prisma } from '@/lib/prisma';
import { blogSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = blogSchema.parse(body);

    const blog = await prisma.blog.update({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: null, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
