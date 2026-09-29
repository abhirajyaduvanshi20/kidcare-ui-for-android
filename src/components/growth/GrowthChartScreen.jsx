import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  MoreVertical, 
  BarChart2, 
  Scale, 
  Gauge, 
  Info, 
  Maximize2, 
  ChevronRight, 
  Plus,
  User
} from 'lucide-react';

export const GrowthChartScreen = () => {
  const { closeModal, currentKid, growthLogs, openModal } = useApp();
  const [activeTab, setActiveTab] = useState('height'); // 'height' | 'weight' | 'bmi'

  const childName = currentKid?.name || 'Sourav Mishra';
  const childGender = currentKid?.gender || 'Male';
  const childAge = currentKid?.age || '4 years 1 month';
  const childAgeShort = '4y 1m';

  // Metrics based on active tab
  const metricConfigs = {
    height: {
      key: 'height',
      label: 'Height',
      title: `Height for Age (${childGender === 'Female' ? 'Girls' : 'Boys'})`,
      unit: 'cm',
      color: '#059669', // Green
      lightColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      currentValue: currentKid?.height ? `${currentKid.height} cm` : '55.0 cm',
      percentile: '35th',
      status: 'Normal',
      yMin: 45.5,
      yMax: 121.5,
      yLabels: ['45.5', '64.5', '83.5', '102.5', '121.5'],
      xLabels: ['0', '5', '10', '15'],
      markerPoint: { x: 5, y: 55.0, label: `${childAgeShort}\n55.0 cm` },
      pastVal: currentKid?.height ? `${currentKid.height} cm` : '55.0 cm'
    },
    weight: {
      key: 'weight',
      label: 'Weight',
      title: `Weight for Age (${childGender === 'Female' ? 'Girls' : 'Boys'})`,
      unit: 'kg',
      color: '#0077D7', // Blue
      lightColor: '#EFF6FF',
      borderColor: '#BFDBFE',
      currentValue: currentKid?.weight ? `${currentKid.weight} kg` : '5.0 kg',
      percentile: '42nd',
      status: 'Normal',
      yMin: 2.3,
      yMax: 26.3,
      yLabels: ['2.3', '8.3', '14.3', '20.3', '26.3'],
      xLabels: ['0', '7', '14'],
      markerPoint: { x: 7, y: 5.0, label: `${childAgeShort}\n5.0 kg` },
      pastVal: currentKid?.weight ? `${currentKid.weight} kg` : '5.0 kg'
    },
    bmi: {
      key: 'bmi',
      label: 'BMI',
      title: `BMI for Age (${childGender === 'Female' ? 'Girls' : 'Boys'})`,
      unit: '',
      color: '#7C3AED', // Purple
      lightColor: '#F5F3FF',
      borderColor: '#DDD6FE',
      currentValue: '16.53',
      percentile: '48th',
      status: 'Normal',
      yMin: 11.5,
      yMax: 19.5,
      yLabels: ['11.5', '13.5', '15.5', '17.5', '19.5'],
      xLabels: ['0', '7', '14'],
      markerPoint: { x: 7, y: 16.53, label: `${childAgeShort}\n16.53` },
      pastVal: '16.53'
    }
  };

  const currentCfg = metricConfigs[activeTab];

  // SVG Chart dimensions - mobile scaled
  const svgWidth = 330;
  const svgHeight = 160;
  const pad = { top: 20, right: 15, bottom: 25, left: 35 };

  const mapX = (val, min = 0, max = activeTab === 'height' ? 15 : 14) => {
    return pad.left + ((val - min) / (max - min)) * (svgWidth - pad.left - pad.right);
  };

  const mapY = (val) => {
    return svgHeight - pad.bottom - ((val - currentCfg.yMin) / (currentCfg.yMax - currentCfg.yMin)) * (svgHeight - pad.top - pad.bottom);
  };

  return (
    <div 
      className="modal-fullscreen"
      style={{ 
        background: '#FAF9F7', 
        display: 'flex', 
        flexDirection: 'column'
      }}
    >
      {/* 1. Top App Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: '#FAF9F7',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <button
          onClick={closeModal}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A'
          }}
          title="Back"
        >
          <ArrowLeft size={22} color="#0F172A" />
        </button>

        <h2 
          style={{ 
            fontSize: '16.5px', 
            fontWeight: '800', 
            color: '#0F172A',
            margin: 0
          }}
        >
          Kid Growth Chart
        </h2>

        <button
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A'
          }}
          title="More options"
        >
          <MoreVertical size={20} color="#0F172A" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '0 16px 85px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        {/* 2. Child Profile Header Card */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '2px 0'
          }}
        >
          <div 
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#E2E8F0',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              flexShrink: 0
            }}
          >
            <img 
              src={currentKid?.photo || "/assets/kid1_1.png"} 
              alt={childName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/kid1_1.png';
              }}
            />
          </div>

          <div>
            <h3 
              style={{ 
                fontSize: '16px', 
                fontWeight: '800', 
                color: '#0F172A', 
                margin: 0,
                lineHeight: 1.2 
              }}
            >
              {childName}
            </h3>
            <p 
              style={{ 
                fontSize: '12px', 
                color: '#64748B', 
                margin: '3px 0 0 0',
                fontWeight: '500' 
              }}
            >
              {childAge} • {childGender}
            </p>
          </div>
        </div>

        {/* 3. Metric Selector Pills (Height | Weight | BMI) */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '8px'
          }}
        >
          {/* Height Pill */}
          <button
            onClick={() => setActiveTab('height')}
            style={{
              padding: '9px 6px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'height' ? '#059669' : '#F1F5F9',
              color: activeTab === 'height' ? '#FFFFFF' : '#475569',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer',
              boxShadow: activeTab === 'height' ? '0 3px 10px rgba(5, 150, 105, 0.3)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <BarChart2 size={15} strokeWidth={2.5} />
            Height
          </button>

          {/* Weight Pill */}
          <button
            onClick={() => setActiveTab('weight')}
            style={{
              padding: '9px 6px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'weight' ? '#0077D7' : '#F1F5F9',
              color: activeTab === 'weight' ? '#FFFFFF' : '#475569',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer',
              boxShadow: activeTab === 'weight' ? '0 3px 10px rgba(0, 119, 215, 0.3)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <Scale size={15} strokeWidth={2.5} />
            Weight
          </button>

          {/* BMI Pill */}
          <button
            onClick={() => setActiveTab('bmi')}
            style={{
              padding: '9px 6px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'bmi' ? '#7C3AED' : '#F1F5F9',
              color: activeTab === 'bmi' ? '#FFFFFF' : '#475569',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer',
              boxShadow: activeTab === 'bmi' ? '0 3px 10px rgba(124, 58, 237, 0.3)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <Gauge size={15} strokeWidth={2.5} />
            BMI
          </button>
        </div>

        {/* 4. Category Title & WHO Standards Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4 
              style={{ 
                fontSize: '14.5px', 
                fontWeight: '800', 
                color: '#0F172A', 
                margin: 0 
              }}
            >
              {currentCfg.title}
            </h4>
            <Info size={14} color="#64748B" />
          </div>
          <p 
            style={{ 
              fontSize: '11px', 
              color: '#64748B', 
              margin: '2px 0 0 0' 
            }}
          >
            WHO Child Growth Standards (5th - 95th Percentile)
          </p>
        </div>

        {/* 5. Two Metric Summary Cards Side-by-Side */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '10px' 
          }}
        >
          {/* Card Left: Current Recorded Value */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: currentCfg.lightColor,
                color: currentCfg.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {activeTab === 'height' && <User size={18} />}
              {activeTab === 'weight' && <Scale size={18} />}
              {activeTab === 'bmi' && <Gauge size={18} />}
            </div>

            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '500', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Current {currentCfg.label}
              </span>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', display: 'block', marginTop: '1px' }}>
                {currentCfg.currentValue}
              </span>
              <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block' }}>
                {childAgeShort}
              </span>
            </div>
          </div>

          {/* Card Right: Percentile & Normal Tag */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: currentCfg.lightColor,
                color: currentCfg.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <BarChart2 size={18} />
            </div>

            <div>
              <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#0F172A', display: 'block' }}>
                {currentCfg.percentile}
              </span>
              <span style={{ fontSize: '10px', color: '#64748B', display: 'block', marginBottom: '2px' }}>
                Percentile
              </span>
              <span 
                style={{
                  background: '#DCFCE7',
                  color: '#166534',
                  fontSize: '9.5px',
                  fontWeight: '800',
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}
              >
                {currentCfg.status}
              </span>
            </div>
          </div>
        </div>

        {/* 6. WHO Growth Curve Canvas Card */}
        <div 
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            border: '1px solid #E2E8F0',
            padding: '14px 12px',
            boxShadow: '0 3px 12px rgba(0,0,0,0.03)'
          }}
        >
          {/* Top Fullscreen expand button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2px' }}>
            <button 
              style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer', color: '#64748B' }}
              title="Expand Chart"
            >
              <Maximize2 size={15} />
            </button>
          </div>

          {/* SVG Chart Canvas */}
          <div style={{ width: '100%', position: 'relative' }}>
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            >
              {/* Y Axis Grid Lines & Labels */}
              {currentCfg.yLabels.map((lbl, idx) => {
                const yVal = parseFloat(lbl);
                const yPos = mapY(yVal);
                return (
                  <g key={idx}>
                    <line 
                      x1={pad.left} 
                      y1={yPos} 
                      x2={svgWidth - pad.right} 
                      y2={yPos} 
                      stroke="#F1F5F9" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={pad.left - 5} 
                      y={yPos + 3} 
                      fill="#94A3B8" 
                      fontSize="8.5" 
                      textAnchor="end"
                      fontWeight="500"
                    >
                      {lbl}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {currentCfg.xLabels.map((m, idx) => {
                const xVal = parseFloat(m);
                const xPos = mapX(xVal);
                return (
                  <text 
                    key={idx} 
                    x={xPos} 
                    y={svgHeight - 6} 
                    fill="#94A3B8" 
                    fontSize="8.5" 
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {m}
                  </text>
                );
              })}

              {/* Y Axis Title & X Axis Title */}
              <text 
                x={10} 
                y={svgHeight / 2} 
                fill="#64748B" 
                fontSize="8.5" 
                transform={`rotate(-90, 10, ${svgHeight / 2})`}
                textAnchor="middle"
                fontWeight="600"
              >
                {currentCfg.label} ({currentCfg.unit})
              </text>
              <text 
                x={(svgWidth + pad.left) / 2} 
                y={svgHeight + 10} 
                fill="#64748B" 
                fontSize="8.5" 
                textAnchor="middle"
                fontWeight="600"
              >
                Age (Months)
              </text>

              {/* Ideal Range Shaded Area (Yellow Tint) */}
              <path 
                d={activeTab === 'height' 
                  ? `M ${mapX(0)} ${mapY(52)} C ${mapX(4)} ${mapY(70)}, ${mapX(10)} ${mapY(86)}, ${mapX(15)} ${mapY(96)} L ${mapX(15)} ${mapY(72)} C ${mapX(10)} ${mapY(66)}, ${mapX(4)} ${mapY(58)}, ${mapX(0)} ${mapY(46)} Z`
                  : `M ${mapX(0)} ${mapY(3.5)} C ${mapX(4)} ${mapY(7.8)}, ${mapX(9)} ${mapY(12)}, ${mapX(14)} ${mapY(15.5)} L ${mapX(14)} ${mapY(9.2)} C ${mapX(9)} ${mapY(7.5)}, ${mapX(4)} ${mapY(5.2)}, ${mapX(0)} ${mapY(2.5)} Z`
                }
                fill="#FEF3C7" 
                opacity="0.55"
              />

              {/* Curve: 95th Percentile (Upper Red) */}
              <path 
                d={activeTab === 'height' 
                  ? `M ${mapX(0)} ${mapY(54)} C ${mapX(4)} ${mapY(74)}, ${mapX(10)} ${mapY(91)}, ${mapX(15)} ${mapY(101)}`
                  : `M ${mapX(0)} ${mapY(4.2)} C ${mapX(4)} ${mapY(9.2)}, ${mapX(9)} ${mapY(14.5)}, ${mapX(14)} ${mapY(18.5)}`
                }
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="1.6" 
              />

              {/* Curve: 50th Percentile Median (Green) */}
              <path 
                d={activeTab === 'height' 
                  ? `M ${mapX(0)} ${mapY(50)} C ${mapX(4)} ${mapY(66)}, ${mapX(10)} ${mapY(80)}, ${mapX(15)} ${mapY(89)}`
                  : `M ${mapX(0)} ${mapY(3.3)} C ${mapX(4)} ${mapY(7.0)}, ${mapX(9)} ${mapY(10.8)}, ${mapX(14)} ${mapY(13.8)}`
                }
                fill="none" 
                stroke="#10B981" 
                strokeWidth="1.8" 
              />

              {/* Curve: 5th Percentile (Lower Red) */}
              <path 
                d={activeTab === 'height' 
                  ? `M ${mapX(0)} ${mapY(46)} C ${mapX(4)} ${mapY(58)}, ${mapX(10)} ${mapY(68)}, ${mapX(15)} ${mapY(74)}`
                  : `M ${mapX(0)} ${mapY(2.5)} C ${mapX(4)} ${mapY(5.0)}, ${mapX(9)} ${mapY(7.2)}, ${mapX(14)} ${mapY(9.2)}`
                }
                fill="none" 
                stroke="#F97316" 
                strokeWidth="1.6" 
              />

              {/* Measured Child Point & Callout Pin */}
              {(() => {
                const px = mapX(currentCfg.markerPoint.x);
                const py = mapY(currentCfg.markerPoint.y);
                return (
                  <g>
                    {/* Vertical dashed line to point */}
                    <line 
                      x1={px} 
                      y1={py} 
                      x2={px} 
                      y2={svgHeight - pad.bottom} 
                      stroke={currentCfg.color} 
                      strokeWidth="1.5" 
                      strokeDasharray="3 3" 
                    />
                    
                    {/* Plotted circle */}
                    <circle cx={px} cy={py} r="4.5" fill={currentCfg.color} stroke="#FFFFFF" strokeWidth="1.8" />

                    {/* Speech Bubble Tag on Top */}
                    <g transform={`translate(${px - 30}, ${py - 35})`}>
                      <rect 
                        width="60" 
                        height="24" 
                        rx="7" 
                        fill={currentCfg.color} 
                        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
                      />
                      <polygon 
                        points="26,24 34,24 30,28" 
                        fill={currentCfg.color} 
                      />
                      <text 
                        x="30" 
                        y="10.5" 
                        fill="#FFFFFF" 
                        fontSize="8" 
                        fontWeight="700" 
                        textAnchor="middle"
                      >
                        {childAgeShort}
                      </text>
                      <text 
                        x="30" 
                        y="20" 
                        fill="#FFFFFF" 
                        fontSize="8" 
                        fontWeight="800" 
                        textAnchor="middle"
                      >
                        {activeTab === 'bmi' ? '16.53' : currentCfg.pastVal}
                      </text>
                    </g>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Chart Legend */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '6px', 
              marginTop: '18px', 
              paddingTop: '8px',
              borderTop: '1px solid #F1F5F9',
              fontSize: '10px', 
              color: '#64748B' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: currentCfg.color }} />
              <span>Sourav's {currentCfg.label}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '6px', borderRadius: '2px', background: '#FEF3C7' }} />
              <span>Ideal Range (WHO)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '2px', background: '#10B981' }} />
              <span>50th Percentile</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '2px', background: '#EF4444' }} />
              <span>95th Percentile</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '10px', height: '2px', background: '#F97316' }} />
              <span>5th Percentile</span>
            </div>
          </div>
        </div>

        {/* 7. Past Measurements Section */}
        <div>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '8px' 
            }}
          >
            <h4 
              style={{ 
                fontSize: '14.5px', 
                fontWeight: '800', 
                color: '#0F172A', 
                margin: 0 
              }}
            >
              Past Measurements ({currentCfg.label})
            </h4>

            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#0077D7', 
                fontSize: '12px', 
                fontWeight: '700', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              View All <ChevronRight size={13} />
            </button>
          </div>

          {/* Past Measurement Row Card */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A', display: 'block' }}>
                06/06/2026
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block', marginTop: '1px' }}>
                {childAgeShort}
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>
                {currentCfg.pastVal}
              </span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A', display: 'block' }}>
                {currentCfg.percentile}
              </span>
              <span style={{ fontSize: '10px', color: '#64748B' }}>
                Percentile
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span 
                style={{
                  background: '#DCFCE7',
                  color: '#166534',
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 7px',
                  borderRadius: '6px'
                }}
              >
                {currentCfg.status}
              </span>
              <ChevronRight size={15} color="#94A3B8" />
            </div>
          </div>
        </div>

      </div>

      {/* 8. Bottom Action Button - Mobile absolute container */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px 16px 16px',
          background: 'linear-gradient(to top, #FAF9F7 80%, rgba(250, 249, 247, 0))',
          zIndex: 20
        }}
      >
        <button
          onClick={() => openModal('update-growth')}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: '14px',
            border: 'none',
            background: currentCfg.color,
            color: '#FFFFFF',
            fontSize: '14.5px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: `0 4px 14px ${currentCfg.color}40`,
            transition: 'all 0.18s ease'
          }}
        >
          <Plus size={17} strokeWidth={2.5} /> Add New Measurement
        </button>
      </div>

    </div>
  );
};
