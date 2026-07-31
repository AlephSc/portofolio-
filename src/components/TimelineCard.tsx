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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`timeline-node ${item.isIntenseMoment ? 'node-intense' : ''}`}>
        {item.isIntenseMoment ? <Flame size={14} /> : <span className="node-inner-dot" />}
      </div>

      <div className={`timeline-card glass-card ${item.isIntenseMoment ? 'card-intense-style' : ''}`}>
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

        <h3 className="card-title">{item.title}</h3>
        <div className="card-role">
          <ChevronRight size={16} className="role-arrow" />
          <span>{item.role}</span>
        </div>

        <p className="card-description">{item.description}</p>

        <ul className="card-highlights">
          {item.highlights.map((h, hIdx) => (
            <li key={hIdx} className="highlight-item">
              <CheckCircle2 size={15} className="check-icon" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {item.metrics && (
          <div className="metric-banner">
            <Award size={16} className="metric-icon" />
            <span className="metric-text">{item.metrics}</span>
          </div>
        )}

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
