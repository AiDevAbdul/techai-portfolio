import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ data: projects, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: validated,
    });

    return NextResponse.json({ data: project, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to create project' },
      { status: 400 }
    );
  }
}
