import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  const profile = {
    name: "Abhijeet Shinde",
    title: "Systems Engineer & Full-Stack Web Developer",
    location: "Mumbai, India",
    bio: "Full-Stack Software Engineer specializing in scalable backend architecture, distributed systems, DevOps, and modern frontend development. Experienced in building high-performance APIs, containerized microservices, vector search pipelines, and automated workflows.",
    years_of_experience: "3+ years",
    resume_url: "https://profitable-azure.vercel.app/Resume.pdf",
    social_links: {
      github: "https://github.com/Hellnight2005",
      linkedin: "https://www.linkedin.com/in/abhi2005jeet/",
      blog: "https://hashnode.com/@abhijeet2005",
      portfolio: "https://profitable-azure.vercel.app"
    },
    skills: {
      frontend: ["React", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "Modern CSS"],
      backend: ["Node.js", "Express.js", "REST API Design", "GraphQL", "Microservices Architecture"],
      databases_messaging: ["PostgreSQL", "Redis", "Kafka", "Neo4j", "Qdrant", "MongoDB", "Supabase"],
      devops_cloud: ["Docker", "Git", "GitHub Actions", "Linux", "Grafana", "Loki", "Vercel"],
      ai_automation: ["LLM Application Development", "RAG (Retrieval-Augmented Generation)", "n8n Workflow Automation", "AI Agents & Chatbots", "MCP (Model Context Protocol)"]
    },
    services_offered: [
      {
        title: "Full-Stack Web Development",
        description: "Building production-grade, fast, responsive web applications using Next.js, React, TypeScript, and Tailwind CSS."
      },
      {
        title: "Backend & Scalable API Architecture",
        description: "Designing resilient RESTful and microservice backend systems with high-throughput messaging (Kafka/Redis) and polyglot database solutions."
      },
      {
        title: "DevOps, Containerization & CI/CD",
        description: "Dockerizing applications, setting up CI/CD deployment pipelines, and configuring distributed logging and telemetry with Grafana/Loki."
      },
      {
        title: "AI Integration & Workflow Automation",
        description: "Building custom AI agents, RAG search pipelines with vector databases (Qdrant), and business workflow automation using n8n."
      }
    ],
    experience_highlights: [
      {
        role: "Freelance Software Engineer & Tech Consultant",
        period: "2023 - Present",
        description: "Architecting full-stack applications, containerizing services with Docker, and building high-performance data systems."
      }
    ]
  };

  return NextResponse.json(profile, { headers: corsHeaders });
}
