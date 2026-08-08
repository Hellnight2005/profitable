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

    // 1. Register get_profile_summary
    modelContext.registerTool({
      name: "get_profile_summary",
      description: "Retrieve Abhijeet Shinde's professional bio, job title, location, and social profile links.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        return {
          type: "text",
          text: JSON.stringify({
            name: "Abhijeet Shinde",
            title: "Web Developer",
            location: "Mumbai",
            bio: "Experienced Web Developer in Mumbai specializing in backend architecture, DevOps, and scalable systems. Available for hire or website audits.",
            socials: {
              github: "https://github.com/Hellnight2005",
              linkedin: "https://www.linkedin.com/in/abhi2005jeet/",
              blog: "https://hashnode.com/@abhijeet2005"
            }
          })
        };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering get_profile_summary:", err));

    // 2. Register list_projects
    modelContext.registerTool({
      name: "list_projects",
      description: "Retrieve the list of completed and ongoing portfolio projects built by Abhijeet Shinde.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        try {
          const res = await fetch("/projects.json");
          const projects = await res.json();
          return {
            type: "text",
            text: JSON.stringify(projects)
          };
        } catch {
          return {
            type: "text",
            text: "Error loading projects data."
          };
        }
      }
    }).catch((err: unknown) => console.error("WebMCP error registering list_projects:", err));

    // 3. Register list_skills_and_services
    modelContext.registerTool({
      name: "list_skills_and_services",
      description: "Retrieve categories of technical expertise (Frontend, Backend, DevOps, Data & Messaging, AI & Automation), developer tools, and client services offered.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        return {
          type: "text",
          text: JSON.stringify({
            skills: {
              FRONTEND: ["React", "Next.js", "Vite", "TypeScript", "Modern CSS"],
              BACKEND: ["Node.js", "REST API Design", "GraphQL", "Microservices Architecture"],
              DATA_MESSAGING: ["PostgreSQL", "Redis", "Kafka", "Neo4j"],
              DEVOPS_TOOLS: ["Docker", "Git", "GitHub", "Linux", "VS Code"],
              AI_AUTOMATION: ["LLM Application Development", "RAG (Retrieval-Augmented Generation)", "n8n Workflow Automation", "AI Agents & Chatbots"]
            },
            services: [
              { name: "FULL-STACK WEB DEVELOPMENT", desc: "Building modern web applications using React, Next.js, and Node.js." },
              { name: "BACKEND & API ARCHITECTURE", desc: "Designing robust, scalable, and secure API layers and backend services." },
              { name: "DEVOPS & SCALING", desc: "Setting up CI/CD pipelines, Docker containerization, and configuring servers for scaling." }
            ]
          })
        };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering list_skills_and_services:", err));

    // 4. Register list_blog_posts
    modelContext.registerTool({
      name: "list_blog_posts",
      description: "Retrieve blog topics, Hackathon Diaries, and Project Log index details.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        return {
          type: "text",
          text: JSON.stringify({
            blog_url: "https://hashnode.com/@abhijeet2005",
            categories: ["Web Development", "Hackathon Diaries", "Project Logs", "DevOps"],
            description: "Technical articles and project updates hosted on Hashnode."
          })
        };
      }
    }).catch((err: unknown) => console.error("WebMCP error registering list_blog_posts:", err));

    // 5. Register send_contact_message
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
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
          });
          const result = await res.json();
          if (res.ok) {
            return {
              type: "text",
              text: "Message sent successfully!"
            };
          } else {
            return {
              type: "text",
              text: `Failed to send message: ${result.error || "Unknown error"}`
            };
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          return {
            type: "text",
            text: `Network or server error while sending message: ${message}`
          };
        }
      }
    }).catch((err: unknown) => console.error("WebMCP error registering send_contact_message:", err));

  }, []);

  return null;
}
