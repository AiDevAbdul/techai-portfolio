import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'uploads';

    if (!file) {
      return NextResponse.json(
        { data: null, error: 'No file provided' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const url = await uploadFile(file, bucket, filename);

    return NextResponse.json({ data: { url, filename }, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
