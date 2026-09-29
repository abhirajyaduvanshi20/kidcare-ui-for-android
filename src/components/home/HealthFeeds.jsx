import React, { useState } from 'react';
import { HEALTH_FEEDS } from '../../data/initialData';
import { Clock } from 'lucide-react';

export const HealthFeeds = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Nutrition & Brain', 'Vaccines & Immunity', 'Sleep & Growth'];

  const filteredFeeds = selectedTag === 'All' 
    ? HEALTH_FEEDS 
    : HEALTH_FEEDS.filter(f => f.tag === selectedTag);

  return (
    <div style={{ padding: '8px 18px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#012741' }}>Pediatric Health & Insights</h3>
          <p style={{ fontSize: '11px', color: '#64748B' }}>Evidence-based parenting guides by Dr. Ila B</p>
        </div>
      </div>

      {/* Filter Category Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '10px' }}>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: selectedTag === tag ? '700' : '500',
              border: 'none',
              background: selectedTag === tag ? '#056DB4' : '#F1F5F9',
              color: selectedTag === tag ? '#FFFFFF' : '#475569',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredFeeds.map((feed) => (
          <div
            key={feed.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #EEF2F6',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', height: '140px', background: '#F1F5F9' }}>
              <img 
                src={feed.image || "/assets/kid_meditating_mat_2.png"} 
                alt={feed.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(1, 39, 65, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase'
              }}>
                {feed.tag}
              </span>
            </div>

            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748B', marginBottom: '6px' }}>
                <span>By <strong style={{ color: '#012741' }}>{feed.author}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={11} /> {feed.readTime}
                </span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#012741', lineHeight: 1.3, marginBottom: '6px' }}>
                {feed.title}
              </h4>

              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                {feed.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
