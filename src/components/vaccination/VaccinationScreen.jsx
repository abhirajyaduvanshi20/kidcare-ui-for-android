import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Syringe, CheckCircle2, Clock, AlertCircle, FileText, Camera, ShieldCheck, Search, Filter } from 'lucide-react';

export const VaccinationScreen = () => {
  const { closeModal, currentKid, vaccines, openModal } = useApp();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const kidVaccines = vaccines.filter(v => v.kidId === currentKid.id);

  const ageGroups = ['All', 'At Birth', '6 Weeks', '10 Weeks', '9 Months', '15 Months', '18 Months', 'Annual'];

  const filteredVaccines = kidVaccines.filter(vac => {
    const matchesAge = selectedAgeGroup === 'All' || vac.ageDue === selectedAgeGroup;
    const matchesStatus = selectedStatus === 'ALL' || vac.status === selectedStatus;
    const matchesSearch = vac.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vac.disease.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAge && matchesStatus && matchesSearch;
  });

  const givenCount = kidVaccines.filter(v => v.status === 'GIVEN').length;
  const dueCount = kidVaccines.filter(v => v.status === 'DUE').length;
  const upcomingCount = kidVaccines.filter(v => v.status === 'UPCOMING').length;

  return (
    <div className="modal-fullscreen">
      {/* Top App Bar */}
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
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#012741' }}>Immunization Record</h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>{currentKid.name} • IAP Schedule</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            background: '#E8F8F3',
            color: '#3AA17E',
            padding: '4px 8px',
            borderRadius: '12px'
          }}>
            {givenCount}/{kidVaccines.length} Done
          </span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 18px 40px', background: '#FAF9F7', overflowY: 'auto' }}>
        {/* Immunization Progress Card */}
        <div style={{
          background: 'linear-gradient(135deg, #53BF9D 0%, #056DB4 100%)',
          borderRadius: '24px',
          padding: '18px 20px',
          color: '#FFFFFF',
          marginBottom: '16px',
          boxShadow: '0 8px 24px rgba(83, 191, 157, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#FFFFFF" />
              <h4 style={{ fontSize: '15px', fontWeight: '800' }}>Vaccination Immunity Status</h4>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
              {Math.round((givenCount / (kidVaccines.length || 1)) * 100)}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.25)', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px' }}>
            <div style={{
              width: `${(givenCount / (kidVaccines.length || 1)) * 100}%`,
              height: '100%',
              background: '#FFFFFF',
              borderRadius: '10px',
              transition: 'width 0.4s ease'
            }} />
          </div>

          {/* Summary stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '12px' }}>
              <span style={{ fontSize: '10px', opacity: 0.85, textTransform: 'uppercase' }}>Given</span>
              <p style={{ fontSize: '16px', fontWeight: '800', marginTop: '2px' }}>{givenCount}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '12px' }}>
              <span style={{ fontSize: '10px', opacity: 0.85, textTransform: 'uppercase' }}>Due Soon</span>
              <p style={{ fontSize: '16px', fontWeight: '800', color: '#F5DC91', marginTop: '2px' }}>{dueCount}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '12px' }}>
              <span style={{ fontSize: '10px', opacity: 0.85, textTransform: 'uppercase' }}>Upcoming</span>
              <p style={{ fontSize: '16px', fontWeight: '800', color: '#EBF4FA', marginTop: '2px' }}>{upcomingCount}</p>
            </div>
          </div>
        </div>

        {/* Search & Status Filter */}
        <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            padding: '10px 14px',
            borderRadius: '14px',
            border: '1px solid #E2E8F0'
          }}>
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              placeholder="Search vaccine name (e.g. MMR, BCG, Polio)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
            />
          </div>

          {/* Age Filter Horizontal scroll */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {ageGroups.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAgeGroup(age)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '11.5px',
                  fontWeight: selectedAgeGroup === age ? '700' : '500',
                  border: 'none',
                  background: selectedAgeGroup === age ? '#056DB4' : '#FFFFFF',
                  color: selectedAgeGroup === age ? '#FFFFFF' : '#475569',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Vaccines List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredVaccines.length === 0 ? (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', textAlign: 'center', border: '1px dashed #CBD5E1' }}>
              <p style={{ fontSize: '13px', color: '#64748B' }}>No vaccines matching your filter criteria.</p>
            </div>
          ) : (
            filteredVaccines.map((vac) => {
              const isGiven = vac.status === 'GIVEN';
              const isDue = vac.status === 'DUE';

              return (
                <div
                  key={vac.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '16px',
                    border: isDue ? '2px solid #F59E0B' : '1px solid #EEF2F6',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '12px',
                        background: isGiven ? '#E8F8F3' : isDue ? '#FEF3C7' : '#EBF4FA',
                        color: isGiven ? '#3AA17E' : isDue ? '#D97706' : '#056DB4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Syringe size={18} />
                      </div>

                      <div>
                        <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#012741', lineHeight: 1.2 }}>
                          {vac.name}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#64748B' }}>
                          Protects against: <strong style={{ color: '#475569' }}>{vac.disease}</strong>
                        </p>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      background: isGiven ? '#E8F8F3' : isDue ? '#FEF3C7' : '#EBF4FA',
                      color: isGiven ? '#3AA17E' : isDue ? '#D97706' : '#056DB4',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isGiven ? <CheckCircle2 size={12} /> : isDue ? <AlertCircle size={12} /> : <Clock size={12} />}
                      {vac.status}
                    </span>
                  </div>

                  {/* Details row */}
                  <div style={{
                    background: '#F8FAFC',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    fontSize: '11.5px',
                    color: '#475569',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6px'
                  }}>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Due Stage:</span> <strong>{vac.ageDue}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Brand:</span> <strong>{vac.brand || 'Standard'}</strong>
                    </div>
                    {isGiven && (
                      <>
                        <div>
                          <span style={{ color: '#94A3B8' }}>Given on:</span> <strong style={{ color: '#3AA17E' }}>{vac.givenDate}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#94A3B8' }}>Batch:</span> <strong>{vac.batchNo}</strong>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '2px' }}>
                    {!isGiven && (
                      <button
                        onClick={() => openModal('update-vaccine', vac)}
                        className="btn-green"
                        style={{ padding: '8px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}
                      >
                        <CheckCircle2 size={14} /> Mark as Given
                      </button>
                    )}

                    {isGiven && (
                      <button
                        onClick={() => openModal('update-vaccine', vac)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#056DB4',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FileText size={13} /> View / Edit Certificate
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
