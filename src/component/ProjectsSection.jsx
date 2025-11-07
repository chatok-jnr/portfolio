import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';

export default function ProjectsSection({ projects = [], onOpen }) {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 bg-gray-900/50">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12 text-center">
          <Briefcase className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Projects
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              onClick={() => onOpen && onOpen(project)}
              className="cursor-pointer glass glow p-8"
            >
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.tech}</p>
              <p className="text-gray-300 mb-4">{project.short}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20">
                    {h}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold group"
              >
                View Project
                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
