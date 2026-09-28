import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_KIDS,
  INITIAL_PARENT,
  INITIAL_FLIPS,
  INITIAL_APPOINTMENTS,
  INITIAL_VACCINES,
  INITIAL_GROWTH_LOGS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from localStorage or fallback to defaults
  const [kids, setKids] = useState(() => {
    const saved = localStorage.getItem('kidcare_kids');
    return saved ? JSON.parse(saved) : INITIAL_KIDS;
  });

  const [currentKidId, setCurrentKidId] = useState(() => {
    return localStorage.getItem('kidcare_current_kid_id') || INITIAL_KIDS[0].id;
  });

  const [parent, setParent] = useState(() => {
    const saved = localStorage.getItem('kidcare_parent');
    return saved ? JSON.parse(saved) : INITIAL_PARENT;
  });

  const [flips, setFlips] = useState(() => {
    const saved = localStorage.getItem('kidcare_flips');
    return saved ? JSON.parse(saved) : INITIAL_FLIPS;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('kidcare_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [vaccines, setVaccines] = useState(() => {
    const saved = localStorage.getItem('kidcare_vaccines');
    return saved ? JSON.parse(saved) : INITIAL_VACCINES;
  });

  const [growthLogs, setGrowthLogs] = useState(() => {
    const saved = localStorage.getItem('kidcare_growth_logs');
    return saved ? JSON.parse(saved) : INITIAL_GROWTH_LOGS;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('kidcare_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('kidcare_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'appointments' | 'nutrition' | 'prescriptions' | 'profile'
  const [activeModal, setActiveModal] = useState(null); // 'create-flip' | 'flip-detail' | 'growth-chart' | 'update-growth' | 'vaccines' | 'update-vaccine' | 'new-appointment' | 'appointment-detail' | 'live-consultation' | 'prescription-viewer' | 'upload-record' | 'edit-profile' | 'add-kid' | 'privacy-settings' | 'faq' | 'help-support' | 'privacy-policy' | 'notifications' | 'login'
  const [modalData, setModalData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("kidcare_auth") === "true");
  const [isDeviceFrameEnabled, setIsDeviceFrameEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("kidcare_auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("kidcare_auth", "false");
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kidcare_kids', JSON.stringify(kids));
  }, [kids]);

  useEffect(() => {
    localStorage.setItem('kidcare_current_kid_id', currentKidId);
  }, [currentKidId]);

  useEffect(() => {
    localStorage.setItem('kidcare_flips', JSON.stringify(flips));
  }, [flips]);

  useEffect(() => {
    localStorage.setItem('kidcare_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('kidcare_vaccines', JSON.stringify(vaccines));
  }, [vaccines]);

  useEffect(() => {
    localStorage.setItem('kidcare_growth_logs', JSON.stringify(growthLogs));
  }, [growthLogs]);

  useEffect(() => {
    localStorage.setItem('kidcare_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('kidcare_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Current active kid
  const currentKid = kids.find(k => k.id === currentKidId) || kids[0];

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Actions
  const switchKid = (kidId) => {
    setCurrentKidId(kidId);
    showToast(`Switched to ${kids.find(k => k.id === kidId)?.name || 'Child'}`);
  };

  const addKid = (newKidData) => {
    const newKid = {
      id: `kid-${Date.now()}`,
      name: newKidData.name || 'New Child',
      gender: newKidData.gender || 'Male',
      dob: newKidData.dob || new Date().toISOString().split('T')[0],
      age: newKidData.age || '0 mos',
      bloodGroup: newKidData.bloodGroup || 'O+',
      weight: parseFloat(newKidData.weight) || 3.5,
      height: parseFloat(newKidData.height) || 50.0,
      headCircumference: parseFloat(newKidData.headCircumference) || 35.0,
      avatar: '/assets/sample_kid_svg.xml',
      photo: newKidData.photo || '/assets/kid1_1.png',
      allergies: newKidData.allergies ? newKidData.allergies.split(',').map(s => s.trim()) : [],
      illnesses: newKidData.illnesses ? newKidData.illnesses.split(',').map(s => s.trim()) : [],
      doctor: 'Dr. Ila B',
      hospital: 'KidCare Pediatrics',
      gradient: 'linear-gradient(135deg, #056DB4 0%, #012741 100%)',
      activeVaccinesCount: '0/15 Given'
    };
    setKids(prev => [...prev, newKid]);
    setCurrentKidId(newKid.id);
    showToast(`Added ${newKid.name} successfully!`);
  };

  const updateKidProfile = (kidId, updatedFields) => {
    setKids(prev => prev.map(k => k.id === kidId ? { ...k, ...updatedFields } : k));
    showToast("Child profile updated!");
  };

  const addFlip = (newFlip) => {
    const flip = {
      id: `flip-${Date.now()}`,
      kidId: currentKid.id,
      kidName: currentKid.name,
      type: newFlip.type || 'ASK_QUESTION',
      title: newFlip.title,
      description: newFlip.description,
      createdDate: new Date().toISOString(),
      status: 'Under Review',
      statusColor: '#F7931E',
      attachments: newFlip.attachments || [],
      doctorReply: null
    };
    setFlips(prev => [flip, ...prev]);
    showToast("Flip sent to Dr. Ila B!");
  };

  const bookAppointment = (appointmentData) => {
    const isFollowUp = appointmentData.type === 'FOLLOW_UP' || appointmentData.isFollowUp;
    const newApt = {
      id: `apt-${Date.now()}`,
      kidId: currentKid.id,
      kidName: currentKid.name,
      doctor: "Dr. Ila B",
      specialty: "Senior Pediatrician & Child Specialist",
      hospital: "KidCare Wellness Center",
      date: appointmentData.date,
      time: appointmentData.time,
      timestamp: `${appointmentData.date}, ${appointmentData.time}`,
      mode: appointmentData.mode || "Online Video Consultation",
      type: isFollowUp ? "FOLLOW_UP" : "UPCOMING",
      status: isFollowUp ? "Scheduled Follow-up" : "Confirmed",
      bookingCode: `KC-${Math.floor(10000 + Math.random() * 90000)}`,
      symptoms: appointmentData.symptoms || [],
      notes: appointmentData.notes || (isFollowUp ? "Pediatric follow-up check requested." : "Routine pediatric evaluation requested."),
      followUpReason: isFollowUp ? (appointmentData.followUpReason || "Post-Treatment Follow-up Review") : undefined,
      doctorAvatar: "/assets/dr_ila_b.png",
      guidelines: [
        "Keep child in a well-lit room for visual assessment",
        "Have previous prescription and thermometer handy",
        "Test camera and microphone 5 minutes prior to appointment"
      ]
    };
    setAppointments(prev => [newApt, ...prev]);
    showToast(isFollowUp ? "Follow-up consultation booked!" : "Appointment booked successfully!");
    return newApt;
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt => apt.id === appointmentId ? { ...apt, type: "CANCELLED", status: "Cancelled" } : apt));
    showToast("Appointment cancelled.");
  };

  const addGrowthLog = (newLog) => {
    const log = {
      date: newLog.date || new Date().toISOString().split('T')[0],
      ageMonth: parseFloat(newLog.ageMonth) || 18,
      weight: parseFloat(newLog.weight),
      height: parseFloat(newLog.height),
      headCircumference: parseFloat(newLog.headCircumference || 47.0),
      note: newLog.note || "Logged by Parent"
    };
    setGrowthLogs(prev => [...prev, log]);
    // update current kid latest weight/height
    setKids(prev => prev.map(k => k.id === currentKid.id ? { ...k, weight: log.weight, height: log.height, headCircumference: log.headCircumference } : k));
    showToast("Growth metrics recorded!");
  };

  const markVaccineGiven = (vaccineId, vaccineDetails) => {
    setVaccines(prev => prev.map(v => {
      if (v.id === vaccineId) {
        return {
          ...v,
          status: "GIVEN",
          givenDate: vaccineDetails.givenDate || new Date().toISOString().split('T')[0],
          brand: vaccineDetails.brand || v.brand,
          batchNo: vaccineDetails.batchNo || "BATCH-" + Math.floor(1000 + Math.random() * 9000),
          notes: vaccineDetails.notes || "Administered successfully"
        };
      }
      return v;
    }));
    showToast("Vaccination marked as Given!");
  };

  const addPrescriptionRecord = (record) => {
    const newRecord = {
      id: `rx-${Date.now()}`,
      kidId: currentKid.id,
      kidName: currentKid.name,
      title: record.title || "Uploaded Medical Document",
      date: record.date || new Date().toISOString().split('T')[0],
      doctor: record.doctor || "Dr. Ila B",
      specialty: record.specialty || "Pediatrics",
      registrationNo: record.registrationNo || "DOC-REG",
      diagnosis: record.diagnosis || "Medical Record",
      medicines: record.medicines || [],
      labResults: record.labResults || [],
      advice: record.advice || "Document stored in KidCare health vault.",
      fileType: record.fileType || "PRESCRIPTION",
      fileUrl: record.fileUrl || "/assets/pdf_logo_tp.png",
      downloadName: `${currentKid.name}_Report.pdf`
    };
    setPrescriptions(prev => [newRecord, ...prev]);
    showToast("Medical Record added to vault!");
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  };

  const openModal = (modalName, data = null) => {
    setModalData(data);
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        kids,
        currentKidId,
        currentKid,
        switchKid,
        addKid,
        updateKidProfile,
        parent,
        setParent,
        flips,
        addFlip,
        appointments,
        bookAppointment,
        cancelAppointment,
        vaccines,
        markVaccineGiven,
        growthLogs,
        addGrowthLog,
        prescriptions,
        addPrescriptionRecord,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        activeTab,
        setActiveTab,
        activeModal,
        openModal,
        closeModal,
        modalData,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isDeviceFrameEnabled,
        setIsDeviceFrameEnabled,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
