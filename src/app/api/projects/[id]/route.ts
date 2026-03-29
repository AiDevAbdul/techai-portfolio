import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: project, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch project' },
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
    const validated = projectSchema.parse(body);

    const project = await prisma.project.update({
      where: { id: params.id },
      data: validated,
    });

    return NextResponse.json({ data: project, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to update project' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ data: null, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
