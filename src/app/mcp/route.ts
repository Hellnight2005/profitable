import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const skillsData = {
  skills: {
    FRONTEND: ["React", "Next.js", "Vite", "TypeScript", "Modern CSS"],
    BACKEND: ["Node.js", "REST API Design", "GraphQL", "Microservices Architecture"],
    DATA_MESSAGING: ["PostgreSQL", "Redis", "Kafka", "Neo4j", "Qdrant", "MongoDB"],
    DEVOPS_TOOLS: ["Docker", "Git", "GitHub", "Linux", "VS Code", "Grafana", "Loki"],
    AI_AUTOMATION: ["LLM Application Development", "RAG (Retrieval-Augmented Generation)", "n8n Workflow Automation", "AI Agents & Chatbots"]
  },
  services: [
    { name: "FULL-STACK WEB DEVELOPMENT", desc: "Building modern web applications using React, Next.js, and Node.js." },
    { name: "BACKEND & API ARCHITECTURE", desc: "Designing robust, scalable, and secure API layers and backend services." },
    { name: "DEVOPS & SCALING", desc: "Setting up CI/CD pipelines, Docker containerization, and configuring servers for scaling." }
  ]
};

const experienceData = {
  title: "Systems Engineer & Freelance Web Developer",
  years_of_experience: "3+ years focused on backend architecture, DevOps, and automation.",
  roles: [
    {
      role: "Freelance Software Engineer & Tech Consultant",
      period: "2023 - Present",
      responsibilities: [
        "Architecting and building full-stack applications with React, Next.js, and Node.",
        "Designing scalable databases (SQL/NoSQL) and vector search pipelines.",
        "Containerizing and deploying microservices using Docker and local registries."
      ]
    }
  ],
  highlights: {
    postgresql_experience: "Used PostgreSQL for structural schema design, relational modeling, and polyglot indexing alongside NoSQL and Graph databases (Neo4j).",
    system_design: "Experienced with Kafka for stream processing, Loki/Grafana for distributed logging, and Qdrant for vector retrieval systems."
  }
};

const socialLinks = {
  github: "https://github.com/Hellnight2005",
  linkedin: "https://www.linkedin.com/in/abhi2005jeet/",
  blog: "https://hashnode.com/@abhijeet2005",
  portfolio: "https://profitable-azure.vercel.app"
};

interface Project {
  name: string;
  description: string;
  tech_used: string[];
  learned_tools: string[];
  what_learned: string;
  why_not_live: string | null;
}

// Helper to fetch projects safely
const getProjectsList = async (): Promise<Project[]> => {
  try {
    const filePath = path.join(process.cwd(), "public", "projects.json");
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
};

export async function POST(req: NextRequest) {
  let reqId: string | number | null = null;
  try {
    const body = await req.json();
    const { jsonrpc, method, params, id } = body;
    reqId = id !== undefined ? id : null;

    if (jsonrpc !== "2.0") {
      return NextResponse.json(
        { jsonrpc: "2.0", error: { code: -32600, message: "Invalid Request" }, id: reqId },
        { status: 400 }
      );
    }

    if (method === "tools/list") {
      const filePath = path.join(process.cwd(), "public", "webmcp.json");
      const fileContent = await fs.readFile(filePath, "utf8");
      const manifest = JSON.parse(fileContent);

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          result: {
            tools: manifest.tools,
          },
          id: reqId,
        },
        {
          headers: getCorsHeaders(),
        }
      );
    }

    if (method === "tools/call") {
      const { name, arguments: args } = params;

      let resultText = "";

      switch (name) {
        case "get_profile_summary":
          resultText = JSON.stringify({
            name: "Abhijeet Shinde",
            title: "Web Developer",
            location: "Mumbai",
            bio: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems.",
            socials: socialLinks,
          });
          break;

        case "get_skills":
          resultText = JSON.stringify(skillsData);
          break;

        case "get_projects": {
          const projects = await getProjectsList();
          resultText = JSON.stringify(projects);
          break;
        }

        case "get_project": {
          const { name: projName } = args || {};
          if (!projName) {
            return NextResponse.json(
              { jsonrpc: "2.0", error: { code: -32602, message: "Missing required argument 'name'" }, id: reqId },
              { headers: getCorsHeaders() }
            );
          }
          const projects = await getProjectsList();
          const project = projects.find(
            (p: Project) => p.name.toLowerCase().includes(projName.toLowerCase())
          );
          resultText = project ? JSON.stringify(project) : `Project "${projName}" not found.`;
          break;
        }

        case "get_experience":
          resultText = JSON.stringify(experienceData);
          break;

        case "get_social_links":
          resultText = JSON.stringify(socialLinks);
          break;

        case "find_projects_by_technology": {
          const { tech } = args || {};
          if (!tech) {
            return NextResponse.json(
              { jsonrpc: "2.0", error: { code: -32602, message: "Missing required argument 'tech'" }, id: reqId },
              { headers: getCorsHeaders() }
            );
          }
          const projects = await getProjectsList();
          const filtered = projects.filter((p: Project) =>
            p.tech_used.some((t: string) => t.toLowerCase().includes(tech.toLowerCase()))
          );
          resultText = JSON.stringify(filtered);
          break;
        }

        case "find_projects_by_skill": {
          const { skill } = args || {};
          if (!skill) {
            return NextResponse.json(
              { jsonrpc: "2.0", error: { code: -32602, message: "Missing required argument 'skill'" }, id: reqId },
              { headers: getCorsHeaders() }
            );
          }
          const projects = await getProjectsList();
          const filtered = projects.filter((p: Project) =>
            p.learned_tools.some((s: string) => s.toLowerCase().includes(skill.toLowerCase()))
          );
          resultText = JSON.stringify(filtered);
          break;
        }

        case "find_projects_by_domain": {
          const { domain } = args || {};
          if (!domain) {
            return NextResponse.json(
              { jsonrpc: "2.0", error: { code: -32602, message: "Missing required argument 'domain'" }, id: reqId },
              { headers: getCorsHeaders() }
            );
          }
          const projects = await getProjectsList();
          const keyword = domain.toLowerCase();
          const filtered = projects.filter((p: Project) =>
            p.description.toLowerCase().includes(keyword) ||
            p.name.toLowerCase().includes(keyword)
          );
          resultText = JSON.stringify(filtered);
          break;
        }

        case "find_projects_by_architecture": {
          const { architecture } = args || {};
          if (!architecture) {
            return NextResponse.json(
              { jsonrpc: "2.0", error: { code: -32602, message: "Missing required argument 'architecture'" }, id: reqId },
              { headers: getCorsHeaders() }
            );
          }
          const projects = await getProjectsList();
          const keyword = architecture.toLowerCase();
          const filtered = projects.filter((p: Project) =>
            p.description.toLowerCase().includes(keyword) ||
            p.what_learned.toLowerCase().includes(keyword) ||
            (p.why_not_live && p.why_not_live.toLowerCase().includes(keyword))
          );
          resultText = JSON.stringify(filtered);
          break;
        }

        case "list_blog_posts":
          resultText = JSON.stringify({
            blog_url: "https://hashnode.com/@abhijeet2005",
            categories: ["Web Development", "Hackathon Diaries", "Project Logs", "DevOps"],
            description: "Technical articles and project updates hosted on Hashnode.",
          });
          break;

        case "send_contact_message": {
          const { name: senderName, email, subject, message } = args || {};
          if (!senderName || !email || !subject || !message) {
            return NextResponse.json(
              {
                jsonrpc: "2.0",
                error: {
                  code: -32602,
                  message: "Invalid params: name, email, subject, and message are required.",
                },
                id: reqId,
              },
              {
                headers: getCorsHeaders(),
              }
            );
          }

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD,
            },
          });

          await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: "abhijeet2005shinde@gmail.com",
            replyTo: email,
            subject: `New Portfolio Inquiry: ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; background:#f6f7f9; padding:30px;">
                <div style="max-width:620px; margin:auto; background:#ffffff; border:1px solid #e5e7eb; padding:28px; border-radius:8px;">
                  <h2>New Message From WebMCP Contact</h2>
                  <p><strong>Name:</strong> ${senderName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background:#fafafa; padding:16px; border:1px solid #eee; border-radius:6px;">${message}</p>
                </div>
              </div>
            `,
          });

          resultText = "Message sent successfully via MCP server!";
          break;
        }

        default:
          return NextResponse.json(
            {
              jsonrpc: "2.0",
              error: { code: -32601, message: `Method not found: ${name}` },
              id: reqId,
            },
            {
              headers: getCorsHeaders(),
            }
          );
      }

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          result: {
            content: [
              {
                type: "text",
                text: resultText,
              },
            ],
          },
          id: reqId,
        },
        {
          headers: getCorsHeaders(),
        }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: { code: -32601, message: "Method not found" },
        id: reqId,
      },
      {
        headers: getCorsHeaders(),
      }
    );
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: { code: -32603, message: errMessage },
        id: reqId,
      },
      {
        headers: getCorsHeaders(),
      }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      name: "Abhijeet Shinde Portfolio MCP Server",
      version: "1.1.0",
      status: "online",
    },
    {
      headers: getCorsHeaders(),
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
