"use client";

import { useEffect } from "react";

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (params: unknown) => Promise<{ type: string; text: string }>;
}

interface ModelContext {
  registerTool: (tool: ModelContextTool) => Promise<void>;
}

interface Project {
  name: string;
  description: string;
  tech_used: string[];
  learned_tools: string[];
  what_learned: string;
  why_not_live: string | null;
}

export default function WebMCPInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect browser implementation of WebMCP (document or navigator namespace)
    const docWithContext = document as unknown as { modelContext?: ModelContext };
    const navWithContext = navigator as unknown as { modelContext?: ModelContext };
    const modelContext = docWithContext.modelContext || navWithContext.modelContext;

    if (!modelContext || typeof modelContext.registerTool !== "function") {
      console.log("WebMCP: document.modelContext or navigator.modelContext not available in this browser.");
      return;
    }

    console.log("WebMCP: Initializing tool registrations...");

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

    // Helper to fetch projects safely
    const fetchProjects = async (): Promise<Project[]> => {
      try {
        const res = await fetch("/projects.json");
        return (await res.json()) as Project[];
      } catch {
        return [];
      }
    };

    // 1. get_profile_summary
    modelContext.registerTool({
      name: "get_profile_summary",
      description: "Retrieve Abhijeet Shinde's professional bio, job title, location, and social profile links.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        type: "text",
        text: JSON.stringify({
          name: "Abhijeet Shinde",
          title: "Web Developer",
          location: "Mumbai",
          bio: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems.",
          socials: socialLinks
        })
      })
    }).catch((err: unknown) => console.error("WebMCP error registering get_profile_summary:", err));

    // 2. get_skills
    modelContext.registerTool({
      name: "get_skills",
      description: "Retrieve categories of technical expertise (Frontend, Backend, DevOps, Data & Messaging, AI & Automation), developer tools, and client services offered.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        type: "text",
        text: JSON.stringify(skillsData)
      })
    }).catch((err: unknown) => console.error("WebMCP error registering get_skills:", err));

    // 3. get_projects
    modelContext.registerTool({
      name: "get_projects",
      description: "Retrieve the full list of completed and ongoing development projects.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const projects = await fetchProjects();
        return { type: "text", text: JSON.stringify(projects) };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering get_projects:", err));

    // 4. get_project
    modelContext.registerTool({
      name: "get_project",
      description: "Retrieve details of a specific project by name.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string", description: "Project name" } },
        required: ["name"]
      },
      execute: async (params: unknown) => {
        const typedParams = params as { name: string };
        const projects = await fetchProjects();
        const project = projects.find(
          (p: Project) => p.name.toLowerCase().includes(typedParams.name.toLowerCase())
        );
        return {
          type: "text",
          text: project ? JSON.stringify(project) : `Project "${typedParams.name}" not found.`
        };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering get_project:", err));

    // 5. get_experience
    modelContext.registerTool({
      name: "get_experience",
      description: "Retrieve professional experience depth, role history, years of experience, and key accomplishments.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        type: "text",
        text: JSON.stringify(experienceData)
      })
    }).catch((err: unknown) => console.error("WebMCP error registering get_experience:", err));

    // 6. get_social_links
    modelContext.registerTool({
      name: "get_social_links",
      description: "Retrieve links to Github, LinkedIn, Blog, Resume, and other social profiles.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        type: "text",
        text: JSON.stringify(socialLinks)
      })
    }).catch((err: unknown) => console.error("WebMCP error registering get_social_links:", err));

    // 7. find_projects_by_technology
    modelContext.registerTool({
      name: "find_projects_by_technology",
      description: "Filter projects by a specific technology or language used.",
      inputSchema: {
        type: "object",
        properties: { tech: { type: "string", description: "Technology name" } },
        required: ["tech"]
      },
      execute: async (params: unknown) => {
        const typedParams = params as { tech: string };
        const projects = await fetchProjects();
        const filtered = projects.filter((p: Project) =>
          p.tech_used.some((t: string) => t.toLowerCase().includes(typedParams.tech.toLowerCase()))
        );
        return { type: "text", text: JSON.stringify(filtered) };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering find_projects_by_technology:", err));

    // 8. find_projects_by_skill
    modelContext.registerTool({
      name: "find_projects_by_skill",
      description: "Filter projects by structural skills or concepts learned.",
      inputSchema: {
        type: "object",
        properties: { skill: { type: "string", description: "Skill/concept keyword" } },
        required: ["skill"]
      },
      execute: async (params: unknown) => {
        const typedParams = params as { skill: string };
        const projects = await fetchProjects();
        const filtered = projects.filter((p: Project) =>
          p.learned_tools.some((s: string) => s.toLowerCase().includes(typedParams.skill.toLowerCase()))
        );
        return { type: "text", text: JSON.stringify(filtered) };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering find_projects_by_skill:", err));

    // 9. find_projects_by_domain
    modelContext.registerTool({
      name: "find_projects_by_domain",
      description: "Search projects by domain (e.g. AI, RAG, visualizer, logging).",
      inputSchema: {
        type: "object",
        properties: { domain: { type: "string", description: "Domain keyword" } },
        required: ["domain"]
      },
      execute: async (params: unknown) => {
        const typedParams = params as { domain: string };
        const projects = await fetchProjects();
        const keyword = typedParams.domain.toLowerCase();
        const filtered = projects.filter((p: Project) =>
          p.description.toLowerCase().includes(keyword) ||
          p.name.toLowerCase().includes(keyword)
        );
        return { type: "text", text: JSON.stringify(filtered) };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering find_projects_by_domain:", err));

    // 10. find_projects_by_architecture
    modelContext.registerTool({
      name: "find_projects_by_architecture",
      description: "Search projects based on architectural style.",
      inputSchema: {
        type: "object",
        properties: { architecture: { type: "string", description: "Architecture keyword" } },
        required: ["architecture"]
      },
      execute: async (params: unknown) => {
        const typedParams = params as { architecture: string };
        const projects = await fetchProjects();
        const keyword = typedParams.architecture.toLowerCase();
        const filtered = projects.filter((p: Project) =>
          p.description.toLowerCase().includes(keyword) ||
          p.what_learned.toLowerCase().includes(keyword) ||
          (p.why_not_live && p.why_not_live.toLowerCase().includes(keyword))
        );
        return { type: "text", text: JSON.stringify(filtered) };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering find_projects_by_architecture:", err));

    // 11. list_blog_posts
    modelContext.registerTool({
      name: "list_blog_posts",
      description: "Retrieve blog topics, Hackathon Diaries, and Project Log index details.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => ({
        type: "text",
        text: JSON.stringify({
          blog_url: "https://hashnode.com/@abhijeet2005",
          categories: ["Web Development", "Hackathon Diaries", "Project Logs", "DevOps"],
          description: "Technical articles and project updates hosted on Hashnode."
        })
      })
    }).catch((err: unknown) => console.error("WebMCP error registering list_blog_posts:", err));

    // 12. send_contact_message
    modelContext.registerTool({
      name: "send_contact_message",
      description: "Send a message or work inquiry directly to Abhijeet Shinde.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "The sender's name" },
          email: { type: "string", description: "The sender's email address" },
          subject: { type: "string", description: "Subject of the message or goal of collaboration" },
          message: { type: "string", description: "The detailed message or inquiry content" }
        },
        required: ["name", "email", "subject", "message"]
      },
      execute: async (params: unknown) => {
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
          });
          const result = await res.json();
          if (res.ok) {
            return { type: "text", text: "Message sent successfully!" };
          } else {
            return { type: "text", text: `Failed to send message: ${result.error || "Unknown error"}` };
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          return { type: "text", text: `Network or server error while sending message: ${message}` };
        }
      }
    }).catch((err: unknown) => console.error("WebMCP error registering send_contact_message:", err));

  }, []);

  return null;
}
