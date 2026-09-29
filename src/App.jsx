import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { HeaderTopBar } from './components/common/HeaderTopBar';
import { BottomNavBar } from './components/common/BottomNavBar';
import { Toast } from './components/common/Toast';

// Home Tab Components
import { KidCarousel } from './components/home/KidCarousel';
import { FlipCardSection } from './components/home/FlipCardSection';
import { UpcomingAppointmentBanner } from './components/home/UpcomingAppointmentBanner';
import { HealthFeeds } from './components/home/HealthFeeds';

// Tab Screens
import { AppointmentsScreen } from './components/appointments/AppointmentsScreen';
import { NutritionScreen } from './components/nutrition/NutritionScreen';
import { PrescriptionsScreen } from './components/prescriptions/PrescriptionsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';

// Modals & Fullscreen Screens
import { KidSelectorModal } from './components/common/KidSelectorModal';
import { CreateFlipModal } from './components/home/CreateFlipModal';
import { FlipDetailModal } from './components/home/FlipDetailModal';
import { GrowthChartScreen } from './components/growth/GrowthChartScreen';
import { UpdateGrowthModal } from './components/growth/UpdateGrowthModal';
import { VaccinationScreen } from './components/vaccination/VaccinationScreen';
import { UpdateVaccineModal } from './components/vaccination/UpdateVaccineModal';
import { NewAppointmentModal } from './components/appointments/NewAppointmentModal';
import { AppointmentDetailModal } from './components/appointments/AppointmentDetailModal';
import { LiveConsultationModal } from './components/appointments/LiveConsultationModal';
import { PrescriptionViewerModal } from './components/prescriptions/PrescriptionViewerModal';
import { UploadRecordModal } from './components/prescriptions/UploadRecordModal';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { AddKidModal } from './components/profile/AddKidModal';
import { PrivacySettingsModal } from './components/profile/PrivacySettingsModal';
import { FaqModal } from './components/profile/FaqModal';
import { HelpSupportModal } from './components/profile/HelpSupportModal';
import { PrivacyPolicyModal } from './components/profile/PrivacyPolicyModal';
import { NotificationCenterModal } from './components/notifications/NotificationCenterModal';
import { LoginScreen } from './components/auth/LoginScreen';

const MainAppContent = () => {
  const { activeTab, activeModal, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen />
        <Toast />
      </>
    );
  }

  return (
    <>
      <HeaderTopBar />

      {/* Main Tab Switcher */}
      {activeTab === 'home' && (
        <div className="screen-scroll-container">
          <KidCarousel />
          <UpcomingAppointmentBanner />
          <FlipCardSection />
          <HealthFeeds />
        </div>
      )}

      {activeTab === 'appointments' && <AppointmentsScreen />}
      {activeTab === 'nutrition' && <NutritionScreen />}
      {activeTab === 'prescriptions' && <PrescriptionsScreen />}
      {activeTab === 'profile' && <ProfileScreen />}

      <BottomNavBar />

      {/* Global Modals & Subscreens */}
      {activeModal === 'kid-selector' && <KidSelectorModal />}
      {activeModal === 'create-flip' && <CreateFlipModal />}
      {activeModal === 'flip-detail' && <FlipDetailModal />}
      {activeModal === 'growth-chart' && <GrowthChartScreen />}
      {activeModal === 'update-growth' && <UpdateGrowthModal />}
      {activeModal === 'vaccines' && <VaccinationScreen />}
      {activeModal === 'update-vaccine' && <UpdateVaccineModal />}
      {activeModal === 'new-appointment' && <NewAppointmentModal />}
      {activeModal === 'appointment-detail' && <AppointmentDetailModal />}
      {activeModal === 'live-consultation' && <LiveConsultationModal />}
      {activeModal === 'prescription-viewer' && <PrescriptionViewerModal />}
      {activeModal === 'upload-record' && <UploadRecordModal />}
      {activeModal === 'edit-profile' && <EditProfileModal />}
      {activeModal === 'add-kid' && <AddKidModal />}
      {activeModal === 'privacy-settings' && <PrivacySettingsModal />}
      {activeModal === 'faq' && <FaqModal />}
      {activeModal === 'help-support' && <HelpSupportModal />}
      {activeModal === 'privacy-policy' && <PrivacyPolicyModal />}
      {activeModal === 'notifications' && <NotificationCenterModal />}
      {activeModal === 'login' && <LoginScreen />}

      <Toast />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DeviceFrame>
        <MainAppContent />
      </DeviceFrame>
    </AppProvider>
  );
}
