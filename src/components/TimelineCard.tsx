import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import type { TimelineItem } from '../types';

interface TimelineCardProps {
  item: TimelineItem;
  isEven: boolean;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ item, isEven }) => {
  return (
    <motion.div
      className={`timeline-item-wrapper ${isEven ? 'item-even' : 'item-odd'}`}
      data-intense-trigger={item.isIntenseMoment ? 'true' : 'false'}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline Node Point */}
      <div className={`timeline-node ${item.isIntenseMoment ? 'node-intense' : ''}`}>
        {item.isIntenseMoment ? <Flame size={14} /> : <span className="node-inner-dot" />}
      </div>

      {/* Timeline Card */}
      <div className={`timeline-card glass-card ${item.isIntenseMoment ? 'card-intense-style' : ''}`}>
        {/* Card Header metadata */}
        <div className="card-top-bar">
          {(item.year || item.quarter) && (
            <div className="year-group">
              {item.year && <span className="year-badge">{item.year}</span>}
              {item.quarter && <span className="quarter-badge">{item.quarter}</span>}
            </div>
          )}
          <span className={`category-tag ${item.isIntenseMoment ? 'category-intense' : ''}`}>
            {item.category}
          </span>
        </div>

        {/* Card Title & Role */}
        <h3 className="card-title">{item.title}</h3>
        <div className="card-role">
          <ChevronRight size={16} className="role-arrow" />
          <span>{item.role}</span>
        </div>

        {/* Narrative Description */}
        <p className="card-description">{item.description}</p>

        {/* Highlights List */}
        <ul className="card-highlights">
          {item.highlights.map((h, hIdx) => (
            <li key={hIdx} className="highlight-item">
              <CheckCircle2 size={15} className="check-icon" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Outcome Metric Badge if available */}
        {item.metrics && (
          <div className="metric-banner">
            <Award size={16} className="metric-icon" />
            <span className="metric-text">{item.metrics}</span>
          </div>
        )}

        {/* Technologies Badges */}
        <div className="card-tech-stack">
          {item.technologies.map((tech, tIdx) => (
            <span key={tIdx} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
