import {
  ArrowDownToLine,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  MoveRight,
  ServerCog,
  TerminalSquare
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CodingStats } from "@/components/CodingStats";
import { ExternalButton } from "@/components/ExternalButton";
import { Header } from "@/components/Header";
import { ProofStrip } from "@/components/ProofStrip";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";

const journey = [
  "HTTP fundamentals",
  "Routing",
  "Serialization / Deserialization",
  "Authentication and Authorization",
  "Sessions and JWT",
  "CORS",
  "Middleware",
  "Validation",
  "Databases",
  "Caching",
  "Concurrency and Parallelism",
  "Scaling"
];

const projects = [
  {
    title: "Kafka + gRPC Order Pipeline",
    description:
      "A microservice-based order processing system using Node.js, gRPC, Apache Kafka, and Docker. It includes Order, Payment, and Inventory services communicating through event-driven architecture.",
    tags: [
      "Node.js",
      "gRPC",
      "Kafka",
      "Docker",
      "Microservices",
      "Event-Driven Architecture"
    ]
  },
  {
    title: "Speech Diarization and Meeting Analytics",
    description:
      "A meeting analytics system that processes audio, performs speaker diarization, transcribes speech, and generates speaker-wise meeting insights and KPIs.",
    tags: [
      "Python",
      "FunASR",
      "Faster-Whisper",
      "Audio Processing",
      "Speaker Diarization",
      "Analytics"
    ]
  },
  {
    title: "Cloudinary Image Upload Backend",
    description:
      "A backend service for image upload, storage, and metadata management using Cloudinary, APIs, validation, and clean backend structure.",
    tags: ["Node.js", "Express", "Cloudinary", "REST API", "File Uploads"]
  }
];

const skillGroups = [
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "gRPC", "Authentication", "JWT", "Kafka"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis basics"]
  },
  {
    title: "Tools",
    skills: ["Docker", "Git", "GitHub", "Postman", "Linux basics"]
  },
  {
    title: "Languages",
    skills: ["C++", "JavaScript", "TypeScript", "Python"]
  },
  {
    title: "Concepts",
    skills: [
      "HTTP",
      "CORS",
      "Sessions",
      "JWT",
      "Microservices",
      "Event-driven systems",
      "Scaling basics"
    ]
  }
];

const focusItems = [
  ["Studying", "Backend first principles, auth, APIs"],
  ["Building", "Kafka + gRPC service communication"],
  ["Practicing", "DSA and competitive programming"],
  ["Mindset", "discipline --steady-like-current"]
];

const architectureNotes = [
  "Order, Payment, and Inventory service boundaries",
  "Event-driven flow over Kafka topics",
  "gRPC contracts between internal services",
  "Dockerized local development environment"
];

export default function Home() {
  return (
    <main id="home" className="relative min-h-screen overflow-hidden">
      <div className="background-grid pointer-events-none absolute inset-0" />
      <div className="flow-field pointer-events-none absolute inset-x-[-12%] top-0 h-[48rem]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-electric/[0.045] blur-3xl" />
      <Header />

      <section className="relative mx-auto flex min-h-[86vh] max-w-7xl items-center px-5 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded border border-electric/15 bg-white/[0.02] px-3 py-1.5 text-xs text-slate-300 backdrop-blur">
              <ServerCog size={16} className="text-electric" />
              <span className="truncate">
                Backend systems, APIs, auth, and distributed architecture
              </span>
            </div>
            <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.1rem] lg:leading-[1.05]">
              Hi, I&apos;m Vrund Kasodariya.
              <span className="mt-2 block text-electric">
                Backend Engineer building scalable systems from first principles.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              I build backend systems, study distributed architecture, solve DSA
              problems, and document my journey from fundamentals to
              production-grade engineering.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              I like swimming, and I try to bring the same rhythm into
              engineering: calm, consistent, and always moving forward.
            </p>
            <div className="mt-5 max-w-2xl rounded border border-line bg-black/35 px-3 py-2 font-mono text-xs leading-6 text-slate-400">
              <span className="text-electric">vrund@backend</span>
              <span className="text-slate-600"> :~$ </span>
              <span className="text-signal">discipline</span>{" "}
              --steady-like-current
            </div>
            <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap">
              <ExternalButton href="#projects" variant="primary">
                View Projects <MoveRight size={17} />
              </ExternalButton>
              <ExternalButton href="/resume.pdf">
                Download Resume <ArrowDownToLine size={17} />
              </ExternalButton>
              <ExternalButton
                href="https://github.com/VrundKasodariya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Vrund Kasodariya GitHub profile"
              >
                GitHub <Github size={17} />
              </ExternalButton>
              <ExternalButton
                href="https://www.linkedin.com/in/vrund-kasodariya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Vrund Kasodariya LinkedIn profile"
              >
                LinkedIn <Linkedin size={17} />
              </ExternalButton>
            </div>
          </div>

          <div className="relative">
            <div className="rounded border border-line bg-[#070907] p-4">
              <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <TerminalSquare className="text-electric" size={18} />
                  <span className="text-xs font-semibold text-white">
                    current_work.md
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded border border-linkblue/25 px-2 py-1 text-[0.68rem] font-medium text-linkblue">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-redglow" />
                  current focus
                </span>
              </div>
              <div className="space-y-0 font-mono">
                {focusItems.map(([label, value]) => (
                  <div
                    key={label}
                    className="table-line grid grid-cols-[6rem_1fr] gap-4 py-3 last:border-b-0"
                  >
                    <span className="text-[0.7rem] uppercase tracking-[0.12em] text-slate-500">
                      {label.toLowerCase()}
                    </span>
                    <span className="text-xs leading-6 text-slate-300">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flow-divider" />
        <ProofStrip />

        <AnimatedSection id="about" className="py-14 sm:py-16">
          <SectionHeader eyebrow="About" title="Engineer by fundamentals." />
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <p className="text-lg font-medium leading-7 text-white sm:text-xl sm:leading-8">
              I am a Computer Science student and backend-focused software
              engineer.
            </p>
            <p className="max-w-3xl text-base leading-7 text-slate-400">
              I enjoy understanding systems deeply instead of only learning
              tools. My current focus is backend first principles,
              authentication, APIs, databases, distributed systems, and clean
              architecture.
            </p>
          </div>
        </AnimatedSection>

        <div className="flow-divider" />

        <AnimatedSection id="journey" className="py-14 sm:py-16">
          <SectionHeader
            eyebrow="Backend Journey"
            title="A structured roadmap from protocol basics to scale."
            description="I am learning backend from first principles and turning concepts into working projects."
          />
          <div className="overflow-hidden rounded border border-line bg-[#070907]">
            {journey.map((item, index) => (
              <div
                key={item}
                className="grid gap-3 border-b border-line p-3.5 transition last:border-b-0 hover:bg-white/[0.025] sm:grid-cols-[7.5rem_1fr]"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-linkblue/85">
                  step_{String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-medium leading-5 text-slate-200">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="flow-divider" />

        <AnimatedSection id="projects" className="py-14 sm:py-16">
          <SectionHeader
            eyebrow="Projects"
            title="Backend projects with real engineering constraints."
          />
          <div className="mb-4 rounded border border-line bg-[#070907] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-linkblue">
              <BookOpen size={14} />
              Kafka + gRPC implementation details
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {architectureNotes.map((note) => (
                <div
                  key={note}
                  className="flex gap-2 text-sm leading-6 text-slate-400"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric/80" />
                  {note}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </AnimatedSection>

        <div className="flow-divider" />

        <AnimatedSection className="py-14 sm:py-16">
          <SectionHeader
            eyebrow="DSA / Competitive Programming"
            title="Algorithmic practice for sharper backend problem solving."
            description="I track my coding practice through Codolio and actively practice competitive programming to improve algorithmic thinking, debugging, and problem-solving speed."
          />
          <CodingStats />
        </AnimatedSection>

        <div className="flow-divider" />

        <AnimatedSection id="skills" className="py-14 sm:py-16">
          <SectionHeader
            eyebrow="Skills"
            title="Tools and concepts I use to build backend systems."
          />
          <div className="overflow-hidden rounded border border-line bg-[#070907]">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="grid gap-3 border-b border-line p-4 last:border-b-0 md:grid-cols-[9rem_1fr]"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-linkblue/85">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-line bg-black/35 px-2 py-1 text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-14 sm:py-16">
          <SectionHeader eyebrow="Experience" title="Backend engineering in practice." />
          <div className="surface rounded-lg p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  Software Engineer Intern - Backend
                </h3>
                <p className="mt-2 text-slate-400">
                  Arvasit Technolabs Pvt. Ltd.
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-signal">
                Internship
              </span>
            </div>
            <p className="mt-5 max-w-4xl text-sm leading-6 text-slate-400">
              Worked on backend systems using Docker, Apache Kafka, gRPC, and
              Node.js. Built microservice communication flows and documented
              backend architecture.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-14 sm:py-20">
          <div className="rounded border border-electric/20 bg-[#070907] p-5 sm:p-6">
            <SectionHeader
              eyebrow="Contact"
              title="Want to collaborate, discuss backend engineering, or connect for opportunities?"
              description="Let's talk."
            />
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ExternalButton href="mailto:vrundkasodariya@gmail.com" variant="primary">
                Email <Mail size={17} />
              </ExternalButton>
              <ExternalButton
                href="https://www.linkedin.com/in/vrund-kasodariya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Vrund Kasodariya LinkedIn profile"
              >
                LinkedIn <Linkedin size={17} />
              </ExternalButton>
              <ExternalButton
                href="https://github.com/VrundKasodariya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Vrund Kasodariya GitHub profile"
              >
                GitHub <Github size={17} />
              </ExternalButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
