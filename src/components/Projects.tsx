import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ExternalLink, Cpu, CheckCircle, FolderOpen } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/projects';

export const Projects: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Backend / Systems', 'Frontend / Architecture', 'Security / Infrastructure', 'Developer Tooling'];

  const filteredProjects = filterCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <Layers size={16} />
            <span>Koleksi Proyek Terpilih</span>
          </div>
          <h2 className="section-title">Proyek & Karya</h2>
          <p className="section-subtitle">
            Karya yang sudah dipublikasikan — jujur, terukur, dan bisa dikunjungi.
          </p>
        </motion.div>

        {/* Category Filters + Grid, or empty state */}
        {projectsData.length === 0 ? (
          <div className="projects-empty">
            <FolderOpen size={44} className="empty-icon" />
            <h3 className="empty-title">Belum ada proyek yang dipublikasikan</h3>
            <p className="empty-text">Proyek akan ditambahkan ke sini segera setelah tersedia untuk dipublikasikan.</p>
          </div>
        ) : (
          <>
            <div className="project-filters">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setFilterCategory(cat)}
                  className={`filter-btn ${filterCategory === cat ? 'filter-btn-active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Meta Header */}
              <div className="project-card-header">
                <span className="project-year-tag">{project.year}</span>
                <div className="project-status">
                  <span className={`status-dot-small ${project.status === 'Production' ? 'dot-prod' : 'dot-dev'}`} />
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>

              {/* Main Description */}
              <p className="project-description">{project.description}</p>

              {/* Architecture Spec Box */}
              <div className="architecture-box">
                <div className="box-header">
                  <Cpu size={14} className="box-icon" />
                  <span>Highlight Arsitektur</span>
                </div>
                <p className="box-text">{project.architecture}</p>
              </div>

              {/* Highlights List */}
              <ul className="project-highlights">
                {project.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="project-highlight-item">
                    <CheckCircle size={14} className="check-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="project-tech-list">
                {project.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links Footer */}
              <div className="project-card-footer">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <GithubIcon size={16} />
                    <span>Kode Repositori</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-primary"
                  >
                    <ExternalLink size={16} />
                    <span>Demo Aplikasi</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .projects-section {
          background-color: var(--bg-primary);
        }

        .projects-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.85rem;
          padding: 4rem 2rem;
          border: 1px dashed var(--border-medium);
          border-radius: 16px;
          background-color: var(--bg-card);
        }

        .empty-icon {
          color: var(--text-muted);
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .empty-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 460px;
        }

        .project-filters {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.75rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          background-color: var(--bg-card);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
        }

        .filter-btn-active {
          background-color: var(--color-accent-glow);
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }

        .project-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-subtle);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-glow);
          transform: translateY(-4px);
        }

        .project-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .project-year-tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-accent);
        }

        .project-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .status-dot-small {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .dot-prod {
          background-color: #10B981;
          box-shadow: 0 0 6px #10B981;
        }

        .dot-dev {
          background-color: #F59E0B;
        }

        .project-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .project-subtitle {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }

        .project-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .architecture-box {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.25rem;
        }

        .box-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }

        .box-icon {
          color: var(--color-accent);
        }

        .box-text {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .project-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .project-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.825rem;
          color: var(--text-secondary);
        }

        .project-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
          margin-bottom: 1.5rem;
        }

        .project-card-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .project-link:hover {
          color: var(--text-primary);
        }

        .project-link-primary {
          color: var(--color-accent);
        }

        .project-link-primary:hover {
          color: var(--color-accent-intense);
        }
      `}</style>
    </section>
  );
};
