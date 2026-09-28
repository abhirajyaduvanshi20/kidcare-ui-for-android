import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WHO_GROWTH_PERCENTILES } from '../../data/initialData';
import { ChevronLeft, Plus, TrendingUp, Scale, Ruler, Table, Info, Activity, Calendar } from 'lucide-react';

export const GrowthChartScreen = () => {
  const { closeModal, currentKid, growthLogs, openModal } = useApp();
  const [activeMetric, setActiveMetric] = useState('weight'); // 'weight' | 'height'
  const [activeView, setActiveView] = useState('chart'); // 'chart' | 'table'

  const isWeight = activeMetric === 'weight';
  const percentileData = isWeight ? WHO_GROWTH_PERCENTILES.weightBoys : WHO_GROWTH_PERCENTILES.heightBoys;

  // Chart SVG Coordinates mapping
  const svgWidth = 360;
  const svgHeight = 220;
  const padding = { top: 20, right: 25, bottom: 35, left: 35 };

  const minX = 0;
  const maxX = 24; // months
  const minY = isWeight ? 2 : 45;
  const maxY = isWeight ? 16 : 95;

  const getX = (month) => padding.left + ((month - minX) / (maxX - minX)) * (svgWidth - padding.left - padding.right);
  const getY = (val) => svgHeight - padding.bottom - ((val - minY) / (maxY - minY)) * (svgHeight - padding.top - padding.bottom);

  // Generate paths for WHO percentiles
  const p97Path = percentileData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.month)} ${getY(d.p97)}`).join(' ');
  const p50Path = percentileData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.month)} ${getY(d.p50)}`).join(' ');
  const p3Path = percentileData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.month)} ${getY(d.p3)}`).join(' ');

  // Child data points
  const childPoints = growthLogs.map(l => ({
    x: getX(l.ageMonth),
    y: getY(isWeight ? l.weight : l.height),
    month: l.ageMonth,
    val: isWeight ? l.weight : l.height,
    date: l.date
  }));

  const childPath = childPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');

  return (
    <div className="modal-fullscreen">
      {/* Top Bar */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <ChevronLeft size={20} color="#012741" />
          </button>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#012741' }}>WHO Growth Tracker</h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>{currentKid.name} • {currentKid.age}</p>
          </div>
        </div>

        <button
          onClick={() => openModal('update-growth')}
          className="btn-primary"
          style={{ padding: '8px 14px', borderRadius: '12px', fontSize: '12px' }}
        >
          <Plus size={15} /> Log Metrics
        </button>
      </div>

      <div style={{ flex: 1, padding: '16px 18px 40px', background: '#FAF9F7', overflowY: 'auto' }}>
        {/* Metric Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#E2E8F0',
          padding: '4px',
          borderRadius: '16px',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => setActiveMetric('weight')}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '12px',
              background: isWeight ? '#FFFFFF' : 'transparent',
              color: isWeight ? '#056DB4' : '#64748B',
              fontWeight: isWeight ? '800' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: isWeight ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <Scale size={16} /> Weight Curve (kg)
          </button>

          <button
            onClick={() => setActiveMetric('height')}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '12px',
              background: !isWeight ? '#FFFFFF' : 'transparent',
              color: !isWeight ? '#056DB4' : '#64748B',
              fontWeight: !isWeight ? '800' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: !isWeight ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <Ruler size={16} /> Height Curve (cm)
          </button>
        </div>

        {/* Current Metric Snapshot Card */}
        <div style={{
          background: 'linear-gradient(135deg, #056DB4 0%, #012741 100%)',
          borderRadius: '22px',
          padding: '16px 20px',
          color: '#FFFFFF',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(5, 109, 180, 0.25)'
        }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', fontWeight: '700' }}>
              Current Recorded {isWeight ? 'Weight' : 'Height'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: isWeight ? '#F5DC91' : '#53BF9D' }}>
                {isWeight ? currentKid.weight : currentKid.height}
              </h2>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                {isWeight ? 'kg' : 'cm'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
              WHO Percentile: <strong style={{ color: '#53BF9D' }}>65th - 75th (Ideal Healthy Range)</strong>
            </p>
          </div>

          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={24} color="#53BF9D" />
          </div>
        </div>

        {/* Interactive Growth Curve Canvas */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '22px',
          padding: '18px 14px',
          border: '1px solid #EEF2F6',
          boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#012741' }}>
              WHO Growth Chart ({isWeight ? 'Weight kg' : 'Height cm'} vs Months)
            </h4>
            <span style={{ fontSize: '11px', color: '#64748B' }}>0 - 24 Months</span>
          </div>

          {/* SVG Multi-Line Chart */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Horizontal Grid lines */}
              {[0.25, 0.5, 0.75, 1].map((factor, i) => {
                const yVal = minY + (maxY - minY) * factor;
                const yPos = getY(yVal);
                return (
                  <g key={i}>
                    <line x1={padding.left} y1={yPos} x2={svgWidth - padding.right} y2={yPos} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={padding.left - 6} y={yPos + 4} fill="#94A3B8" fontSize="9" textAnchor="end">{Math.round(yVal)}</text>
                  </g>
                );
              })}

              {/* Month X Axis Markers */}
              {[0, 6, 12, 18, 24].map((m) => (
                <g key={m}>
                  <line x1={getX(m)} y1={padding.top} x2={getX(m)} y2={svgHeight - padding.bottom} stroke="#F1F5F9" strokeWidth="1" />
                  <text x={getX(m)} y={svgHeight - padding.bottom + 16} fill="#94A3B8" fontSize="9" textAnchor="middle">{m}m</text>
                </g>
              ))}

              {/* WHO 97th Percentile (Upper limit) */}
              <path d={p97Path} fill="none" stroke="#F94C66" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
              <text x={svgWidth - padding.right} y={getY(percentileData[percentileData.length-1].p97) - 4} fill="#F94C66" fontSize="8" fontWeight="700">97th</text>

              {/* WHO 50th Percentile (Median ideal) */}
              <path d={p50Path} fill="none" stroke="#53BF9D" strokeWidth="2" opacity="0.9" />
              <text x={svgWidth - padding.right} y={getY(percentileData[percentileData.length-1].p50) - 4} fill="#53BF9D" fontSize="8" fontWeight="700">50th</text>

              {/* WHO 3rd Percentile (Lower limit) */}
              <path d={p3Path} fill="none" stroke="#F7931E" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
              <text x={svgWidth - padding.right} y={getY(percentileData[percentileData.length-1].p3) + 10} fill="#F7931E" fontSize="8" fontWeight="700">3rd</text>

              {/* Child's Actual Growth Trajectory */}
              <path d={childPath} fill="none" stroke="#056DB4" strokeWidth="3" />

              {/* Child Data Points Circles */}
              {childPoints.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#056DB4" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx={pt.x} cy={pt.y} r="8" fill="rgba(5, 109, 180, 0.15)" />
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '12px', fontSize: '11px', color: '#64748B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#056DB4' }}></span>
              <strong style={{ color: '#012741' }}>{currentKid.name}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '3px', background: '#53BF9D' }}></span>
              <span>50th Median</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '2px', background: '#F94C66', borderStyle: 'dashed' }}></span>
              <span>97th (High)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '2px', background: '#F7931E', borderStyle: 'dashed' }}></span>
              <span>3rd (Low)</span>
            </div>
          </div>
        </div>

        {/* Growth Table View History */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px',
          border: '1px solid #EEF2F6',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#012741' }}>Historical Logs</h4>
            <span style={{ fontSize: '11px', color: '#64748B' }}>{growthLogs.length} Records</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                  <th style={{ padding: '8px 6px' }}>Date</th>
                  <th style={{ padding: '8px 6px' }}>Age</th>
                  <th style={{ padding: '8px 6px' }}>Weight</th>
                  <th style={{ padding: '8px 6px' }}>Height</th>
                  <th style={{ padding: '8px 6px' }}>Head</th>
                </tr>
              </thead>
              <tbody>
                {growthLogs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 6px', fontWeight: '600', color: '#012741' }}>{log.date}</td>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>{log.ageMonth} mos</td>
                    <td style={{ padding: '10px 6px', fontWeight: '700', color: '#056DB4' }}>{log.weight} kg</td>
                    <td style={{ padding: '10px 6px', fontWeight: '700', color: '#53BF9D' }}>{log.height} cm</td>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>{log.headCircumference || 46.5} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
