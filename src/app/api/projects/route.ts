import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

interface ProjectItem {
  id?: number;
  name?: string;
  description?: string;
  short_problem?: string;
  what_learned?: string;
  tech_used?: string[];
  [key: string]: unknown;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'projects.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    let projects: ProjectItem[] = JSON.parse(fileContent);

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase();
    const tech = searchParams.get('tech')?.toLowerCase();

    if (query) {
      projects = projects.filter((p: ProjectItem) =>
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.short_problem?.toLowerCase().includes(query) ||
        p.what_learned?.toLowerCase().includes(query)
      );
    }

    if (tech) {
      projects = projects.filter((p: ProjectItem) =>
        p.tech_used?.some((t: string) => t.toLowerCase().includes(tech))
      );
    }

    return NextResponse.json(projects, { headers: corsHeaders });
  } catch (error) {
    console.error('API /api/projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500, headers: corsHeaders });
  }
}
