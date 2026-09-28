import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, Check, Camera } from 'lucide-react';

export const AddKidModal = () => {
  const { closeModal, addKid } = useApp();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('2024-01-10');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [weight, setWeight] = useState('9.5');
  const [height, setHeight] = useState('74.0');
  const [allergies, setAllergies] = useState('');

  const calculateAge = (dobString) => {
    const birth = new Date(dobString);
    const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (months < 12) return `${Math.max(1, months)} mos`;
    const yrs = Math.floor(months / 12);
    const remMonths = months % 12;
    return `${yrs} yr${yrs > 1 ? 's' : ''} ${remMonths} mo${remMonths !== 1 ? 's' : ''}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addKid({
      name,
      gender,
      dob,
      age: calculateAge(dob),
      bloodGroup,
      weight: parseFloat(weight) || 5.0,
      height: parseFloat(height) || 60.0,
      allergies
    });

    closeModal();
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-sheet animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#012741' }}>Add New Child Profile</h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>Create pediatric record and vaccination schedule</p>
          </div>
          <button 
            onClick={closeModal}
            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '72vh', overflowY: 'auto' }}>
          {/* Child Name */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Child's Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Reyansh Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14px' }}
            />
          </div>

          {/* Gender & Blood Group */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF' }}
              >
                <option value="Male">Male (Boy)</option>
                <option value="Female">Female (Girl)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF' }}
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          {/* Initial Weight & Height */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Current Height (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Known Allergies */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Known Allergies (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Lactose, Peanuts, Eggs"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <button
            type="submit"
            className="btn-green"
            style={{ width: '100%', padding: '14px', borderRadius: '16px', marginTop: '8px' }}
          >
            <UserPlus size={18} /> Register Child & Generate Schedule
          </button>
        </form>
      </div>
    </div>
  );
};
