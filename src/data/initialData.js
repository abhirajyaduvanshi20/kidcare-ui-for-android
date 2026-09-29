export const INITIAL_KIDS = [
  {
    id: "kid-101",
    name: "Reyansh Sharma",
    gender: "Male",
    dob: "2023-04-14",
    age: "1 yr 5 mos",
    bloodGroup: "B+",
    weight: 11.2,
    height: 82.5,
    headCircumference: 46.8,
    avatar: "/assets/sample_kid_svg.xml",
    photo: "/assets/kid1_1.png",
    allergies: ["Peanuts", "Dust"],
    illnesses: ["Mild Eczema"],
    doctor: "Dr. Ila B",
    hospital: "KidCare Pediatrics & Child Wellness",
    themeColor: "from-blue-600 to-indigo-800",
    gradient: "linear-gradient(135deg, #056DB4 0%, #012741 100%)",
    activeVaccinesCount: "9/14 Given"
  },
  {
    id: "kid-102",
    name: "Ananya Sharma",
    gender: "Female",
    dob: "2021-08-20",
    age: "3 yrs 1 mo",
    bloodGroup: "O+",
    weight: 14.8,
    height: 96.0,
    headCircumference: 49.2,
    avatar: "/assets/user_child_placeholder_green.xml",
    photo: "/assets/ss.png",
    allergies: ["Lactose sensitive"],
    illnesses: ["None"],
    doctor: "Dr. Ila B",
    hospital: "KidCare Pediatrics & Child Wellness",
    themeColor: "from-emerald-500 to-teal-800",
    gradient: "linear-gradient(135deg, #53BF9D 0%, #115e59 100%)",
    activeVaccinesCount: "12/15 Given"
  }
];

export const INITIAL_PARENT = {
  id: "parent-01",
  name: "Priya Sharma",
  relation: "Mother",
  phone: "+91 98765 43210",
  email: "priya.sharma@example.com",
  city: "Bengaluru, India",
  emergencyContact: "+91 98765 00000",
  avatar: "/assets/profile_pic_image.xml"
};

export const INITIAL_FLIPS = [
  {
    id: "flip-001",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    type: "ASK_QUESTION",
    title: "Mild fever after 14-month MMR booster shot",
    description: "Reyansh received his booster dose yesterday morning and developed a low-grade temperature (99.8 F) today with mild fussiness. Should we give paracetamol drops?",
    createdDate: "2026-09-25T14:30:00Z",
    status: "Answered",
    statusColor: "#53BF9D",
    attachments: [
      { type: "image", name: "thermometer_reading.jpg", url: "/assets/ss.png" }
    ],
    doctorReply: {
      doctorName: "Dr. Ila B",
      doctorRole: "Senior Pediatrician",
      replyDate: "2026-09-25T16:15:00Z",
      text: "Low-grade fever is a normal immune reaction within 48h of the booster. You may give Calpol (Paracetamol) drops 1.2 ml if temperature exceeds 100 F or if he is irritable. Keep him well hydrated and sponge with lukewarm water.",
      doctorAvatar: "/assets/dr_ila_b.png"
    }
  },
  {
    id: "flip-002",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    type: "EMERGENCY",
    title: "Dry cough and wheezing during night sleep",
    description: "Coughing bouts triggered after weather change, especially when lying down. Breathing is slightly rapid.",
    createdDate: "2026-09-26T21:00:00Z",
    status: "Under Review",
    statusColor: "#F7931E",
    attachments: [],
    doctorReply: null
  },
  {
    id: "flip-003",
    kidId: "kid-102",
    kidName: "Ananya Sharma",
    type: "FEEDBACK",
    title: "Response to new digestion probiotic powder",
    description: "Her bowel movements have normalized and stomach cramps subsided after 4 days on the prescribed probiotic. Sharing follow-up feedback.",
    createdDate: "2026-09-22T10:00:00Z",
    status: "Acknowledged",
    statusColor: "#B24592",
    attachments: [],
    doctorReply: {
      doctorName: "Dr. Ila B",
      doctorRole: "Senior Pediatrician",
      replyDate: "2026-09-22T12:45:00Z",
      text: "Excellent news! Continue the probiotic for another 3 days to establish gut flora, then return to normal yogurt intake.",
      doctorAvatar: "/assets/dr_ila_b.png"
    }
  },
  {
    id: "flip-004",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    type: "ROUTINE_CHECK",
    title: "18-Month Developmental Milestones check",
    description: "Walking steadily, climbing steps with support, saying 10+ words clearly, stacking 4 blocks.",
    createdDate: "2026-09-20T09:15:00Z",
    status: "Approved",
    statusColor: "#5BBF9B",
    attachments: [],
    doctorReply: {
      doctorName: "Dr. Ila B",
      doctorRole: "Senior Pediatrician",
      replyDate: "2026-09-20T11:00:00Z",
      text: "Growth and motor/speech milestones are tracking wonderfully at the 75th percentile!",
      doctorAvatar: "/assets/dr_ila_b.png"
    }
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt-101",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician & Child Specialist",
    hospital: "KidCare Wellness Center",
    date: "2026-09-28",
    time: "03:00 PM",
    timestamp: "Tomorrow at 3:00 PM",
    mode: "Online Video Consultation",
    type: "UPCOMING",
    status: "Confirmed",
    bookingCode: "KC-89412",
    symptoms: ["Seasonal Cold", "Post-Vaccination Review", "Diet Advice"],
    notes: "Please have the temperature log and vaccination card ready.",
    doctorAvatar: "/assets/dr_ila_b.png",
    guidelines: [
      "Keep child in a well-lit room for visual assessment",
      "Have previous prescription and thermometer handy",
      "Test camera and microphone 5 minutes prior to appointment"
    ]
  },
  {
    id: "apt-105",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician & Child Specialist",
    hospital: "KidCare Wellness Center",
    date: "2026-10-02",
    time: "04:30 PM",
    timestamp: "02 Oct 2026, 04:30 PM",
    mode: "Online Video Consultation",
    type: "FOLLOW_UP",
    status: "Scheduled Follow-up",
    bookingCode: "KC-91024",
    symptoms: ["Post-Viral Fever Recovery", "Cough Review", "Weight Re-check"],
    notes: "Follow-up consultation after 7-day antibiotic/syrup course. Dr. Ila B requested breathing sound check and appetite update.",
    doctorAvatar: "/assets/dr_ila_b.png",
    followUpReason: "Post-Infection Clinical Review & Recovery Clearance",
    previousAppointmentRef: "apt-101",
    guidelines: [
      "Keep child relaxed and ready 5 mins before video call",
      "Have medication bottles used over the week ready",
      "Record morning temperature and note coughing frequency"
    ]
  },
  {
    id: "apt-106",
    kidId: "kid-102",
    kidName: "Ananya Sharma",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician & Child Specialist",
    hospital: "KidCare Pediatrics Clinic",
    date: "2026-10-05",
    time: "10:30 AM",
    timestamp: "05 Oct 2026, 10:30 AM",
    mode: "In-Clinic Visit",
    type: "FOLLOW_UP",
    status: "Recommended Follow-up",
    bookingCode: "KC-83719",
    symptoms: ["Skin Eczema Re-evaluation", "Lactose Sensitivity Review"],
    notes: "Scheduled 3-week follow-up to inspect skin barrier response after prescribed moisturizer and probiotic regimen.",
    doctorAvatar: "/assets/dr_ila_b.png",
    followUpReason: "Dermatological & Allergy Follow-up",
    previousAppointmentRef: "apt-102",
    guidelines: [
      "Bring the probiotic logbook",
      "Do not apply oily ointment 2 hours prior to physical skin exam"
    ]
  },
  {
    id: "apt-102",
    kidId: "kid-102",
    kidName: "Ananya Sharma",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician & Child Specialist",
    hospital: "KidCare Pediatrics Clinic",
    date: "2026-09-14",
    time: "11:30 AM",
    timestamp: "14 Sep 2026, 11:30 AM",
    mode: "In-Clinic Visit",
    type: "COMPLETED",
    status: "Completed",
    bookingCode: "KC-77219",
    symptoms: ["Allergy & Rash", "Routine Growth"],
    notes: "Prescribed antihistamine syrup and skin moisturizer. Advised hydration.",
    doctorAvatar: "/assets/dr_ila_b.png",
    prescriptionId: "rx-301"
  },
  {
    id: "apt-103",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician & Child Specialist",
    hospital: "KidCare Wellness Center",
    date: "2026-08-10",
    time: "05:00 PM",
    timestamp: "10 Aug 2026, 5:00 PM",
    mode: "Online Video Consultation",
    type: "COMPLETED",
    status: "Completed",
    bookingCode: "KC-61044",
    symptoms: ["Teething Discomfort", "Fever"],
    notes: "Teething gel and paracetamol SOS advised.",
    doctorAvatar: "/assets/dr_ila_b.png",
    prescriptionId: "rx-298"
  },
  {
    id: "apt-104",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician",
    hospital: "KidCare Wellness Center",
    date: "2026-07-02",
    time: "04:15 PM",
    timestamp: "02 Jul 2026, 4:15 PM",
    mode: "In-Clinic Visit",
    type: "CANCELLED",
    status: "Cancelled",
    bookingCode: "KC-55109",
    symptoms: ["Travel Checkup"],
    notes: "Cancelled by parent due to rescheduled flight.",
    doctorAvatar: "/assets/dr_ila_b.png"
  }
];

export const INITIAL_VACCINES = [
  {
    id: "vac-01",
    kidId: "kid-101",
    name: "BCG",
    disease: "Tuberculosis",
    ageDue: "At Birth",
    status: "GIVEN",
    dueDate: "2023-04-14",
    givenDate: "2023-04-15",
    doctor: "Dr. Ila B",
    brand: "Serum Institute BCG",
    batchNo: "BCG-9981A",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Normal left arm induration observed."
  },
  {
    id: "vac-02",
    kidId: "kid-101",
    name: "Hepatitis B - Dose 1",
    disease: "Hepatitis B Virus",
    ageDue: "At Birth",
    status: "GIVEN",
    dueDate: "2023-04-14",
    givenDate: "2023-04-15",
    doctor: "Dr. Ila B",
    brand: "GeneVac-B",
    batchNo: "HEP-4022",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Administered in right anterolateral thigh."
  },
  {
    id: "vac-03",
    kidId: "kid-101",
    name: "OPV - Zero Dose",
    disease: "Poliomyelitis",
    ageDue: "At Birth",
    status: "GIVEN",
    dueDate: "2023-04-14",
    givenDate: "2023-04-15",
    doctor: "Dr. Ila B",
    brand: "Biopolio Oral",
    batchNo: "OPV-110",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "2 oral drops administered."
  },
  {
    id: "vac-04",
    kidId: "kid-101",
    name: "DTwP / DTaP - Dose 1",
    disease: "Diphtheria, Tetanus, Pertussis",
    ageDue: "6 Weeks",
    status: "GIVEN",
    dueDate: "2023-05-26",
    givenDate: "2023-05-28",
    doctor: "Dr. Ila B",
    brand: "Infanrix Hexa",
    batchNo: "INF-7721",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Mild fever recorded, resolved in 24 hrs."
  },
  {
    id: "vac-05",
    kidId: "kid-101",
    name: "IPV - Dose 1 + Hib - 1",
    disease: "Polio & Haemophilus Influenzae B",
    ageDue: "6 Weeks",
    status: "GIVEN",
    dueDate: "2023-05-26",
    givenDate: "2023-05-28",
    doctor: "Dr. Ila B",
    brand: "Hexaxim",
    batchNo: "HEX-9011",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Given as combined hexavalent shot."
  },
  {
    id: "vac-06",
    kidId: "kid-101",
    name: "Rotavirus - Dose 1",
    disease: "Rotaviral Gastroenteritis / Diarrhea",
    ageDue: "6 Weeks",
    status: "GIVEN",
    dueDate: "2023-05-26",
    givenDate: "2023-05-28",
    doctor: "Dr. Ila B",
    brand: "Rotarix Oral",
    batchNo: "ROTA-334",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Tolerated well without spit up."
  },
  {
    id: "vac-07",
    kidId: "kid-101",
    name: "PCV (Pneumococcal) - Dose 1",
    disease: "Pneumonia, Meningitis, Ear infections",
    ageDue: "6 Weeks",
    status: "GIVEN",
    dueDate: "2023-05-26",
    givenDate: "2023-05-28",
    doctor: "Dr. Ila B",
    brand: "Prevenar 13",
    batchNo: "PCV-1309",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Right thigh injection."
  },
  {
    id: "vac-08",
    kidId: "kid-101",
    name: "Hexavalent 2 (DTP + IPV + Hib + HepB)",
    disease: "6-in-1 Essential Booster",
    ageDue: "10 Weeks",
    status: "GIVEN",
    dueDate: "2023-07-07",
    givenDate: "2023-07-09",
    doctor: "Dr. Ila B",
    brand: "Hexaxim 2",
    batchNo: "HEX-9244",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "No adverse events."
  },
  {
    id: "vac-09",
    kidId: "kid-101",
    name: "MMR (Measles, Mumps, Rubella) - Dose 1",
    disease: "Measles, Mumps & Rubella",
    ageDue: "9 Months",
    status: "GIVEN",
    dueDate: "2024-01-14",
    givenDate: "2024-01-16",
    doctor: "Dr. Ila B",
    brand: "Tresivac",
    batchNo: "TRE-4451",
    certificateImage: "/assets/pdf_logo_tp.png",
    notes: "Given sub-cutaneously."
  },
  {
    id: "vac-10",
    kidId: "kid-101",
    name: "Varicella (Chickenpox) - Dose 1",
    disease: "Chickenpox virus",
    ageDue: "15 Months",
    status: "DUE",
    dueDate: "2024-07-14",
    givenDate: null,
    doctor: "Dr. Ila B",
    brand: "Varilrix / Variped",
    batchNo: "",
    certificateImage: null,
    notes: "Recommended to schedule this week."
  },
  {
    id: "vac-11",
    kidId: "kid-101",
    name: "Hepatitis A - Dose 1 (Live / Inactivated)",
    disease: "Hepatitis A Viral Jaundice",
    ageDue: "18 Months",
    status: "UPCOMING",
    dueDate: "2024-10-14",
    givenDate: null,
    doctor: "Dr. Ila B",
    brand: "Havrix / Avaxim",
    batchNo: "",
    certificateImage: null,
    notes: "Due in 3 weeks."
  },
  {
    id: "vac-12",
    kidId: "kid-101",
    name: "Annual Influenza (Flu) Booster",
    disease: "Seasonal Influenza H1N1/H3N2",
    ageDue: "Annual",
    status: "UPCOMING",
    dueDate: "2024-11-01",
    givenDate: null,
    doctor: "Dr. Ila B",
    brand: "Fluarix Tetra",
    batchNo: "",
    certificateImage: null,
    notes: "Recommended before winter season."
  }
];

export const INITIAL_GROWTH_LOGS = [
  { date: "2023-04-14", ageMonth: 0, weight: 3.3, height: 50.0, headCircumference: 35.0, note: "Birth metrics" },
  { date: "2023-05-28", ageMonth: 1.5, weight: 4.6, height: 56.2, headCircumference: 37.8, note: "6 weeks checkup" },
  { date: "2023-07-09", ageMonth: 3, weight: 6.1, height: 61.5, headCircumference: 40.2, note: "10 weeks checkup" },
  { date: "2023-10-14", ageMonth: 6, weight: 7.8, height: 67.5, headCircumference: 43.1, note: "6 months milestone" },
  { date: "2024-01-16", ageMonth: 9, weight: 9.1, height: 72.8, headCircumference: 45.0, note: "9 months checkup" },
  { date: "2024-04-14", ageMonth: 12, weight: 10.2, height: 77.0, headCircumference: 46.2, note: "1 year birthday" },
  { date: "2024-09-20", ageMonth: 17, weight: 11.2, height: 82.5, headCircumference: 46.8, note: "Latest consultation" }
];

export const WHO_GROWTH_PERCENTILES = {
  // Age in months: [3rd percentile, 50th percentile (median), 97th percentile]
  weightBoys: [
    { month: 0, p3: 2.5, p50: 3.3, p97: 4.4 },
    { month: 2, p3: 4.3, p50: 5.6, p97: 7.1 },
    { month: 4, p3: 5.6, p50: 7.0, p97: 8.7 },
    { month: 6, p3: 6.4, p50: 7.9, p97: 9.8 },
    { month: 9, p3: 7.1, p50: 8.9, p97: 11.0 },
    { month: 12, p3: 7.7, p50: 9.6, p97: 12.0 },
    { month: 15, p3: 8.3, p50: 10.3, p97: 12.8 },
    { month: 18, p3: 8.8, p50: 10.9, p97: 13.7 },
    { month: 24, p3: 9.7, p50: 12.2, p97: 15.3 }
  ],
  heightBoys: [
    { month: 0, p3: 46.3, p50: 49.9, p97: 53.4 },
    { month: 2, p3: 54.4, p50: 58.4, p97: 62.4 },
    { month: 4, p3: 60.0, p50: 63.9, p97: 67.8 },
    { month: 6, p3: 63.6, p50: 67.6, p97: 71.6 },
    { month: 9, p3: 67.5, p50: 72.0, p97: 76.5 },
    { month: 12, p3: 71.0, p50: 75.7, p97: 80.5 },
    { month: 15, p3: 74.1, p50: 79.1, p97: 84.1 },
    { month: 18, p3: 76.9, p50: 82.3, p97: 87.7 },
    { month: 24, p3: 82.1, p50: 87.8, p97: 93.5 }
  ]
};

export const INITIAL_PRESCRIPTIONS = [
  {
    id: "rx-301",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    title: "Prescription - Upper Respiratory Infection & Low Fever",
    date: "2026-09-14",
    doctor: "Dr. Ila B",
    specialty: "Senior Pediatrician",
    registrationNo: "KMC-45910",
    diagnosis: "Acute viral rhinopharyngitis with low grade temperature",
    medicines: [
      {
        name: "Calpol Paediatric Drops (Paracetamol 100mg/ml)",
        dosage: "1.2 ml SOS (Max 4 times in 24 hrs)",
        duration: "3 days",
        instructions: "Give only if temperature is above 99.5°F or child is irritable."
      },
      {
        name: "Nasoclear Saline Nasal Drops",
        dosage: "2 drops in each nostril before feeds",
        duration: "5 days",
        instructions: "Helps clear nasal congestion before sleep and feeding."
      },
      {
        name: "Zinc & Vitamin D3 Oral Solution (Pedichamp)",
        dosage: "2.5 ml once daily after breakfast",
        duration: "14 days",
        instructions: "Immunity support & mucosal healing."
      }
    ],
    advice: "Continue breast/formula feeding, maintain lukewarm steam inhalation for 3 mins, avoid cold direct AC breeze.",
    fileType: "PRESCRIPTION",
    fileUrl: "/assets/pdf_logo_tp.png",
    downloadName: "Reyansh_Prescription_14Sep2026.pdf"
  },
  {
    id: "rx-298",
    kidId: "kid-101",
    kidName: "Reyansh Sharma",
    title: "Pathology - Complete Blood Count (CBC) & CRP",
    date: "2026-08-10",
    doctor: "Dr. Ila B / Metropolis Diagnostics",
    specialty: "Clinical Pathology",
    registrationNo: "NABL-7809",
    diagnosis: "Routine viral panel screening",
    medicines: [],
    labResults: [
      { test: "Hemoglobin (Hb)", value: "11.8 g/dL", range: "11.0 - 14.0", status: "Normal" },
      { test: "Total Leukocyte Count (WBC)", value: "7,400 /mcL", range: "6,000 - 12,000", status: "Normal" },
      { test: "Platelet Count", value: "285,000 /mcL", range: "150,000 - 450,000", status: "Normal" },
      { test: "C-Reactive Protein (CRP)", value: "2.1 mg/L", range: "< 5.0", status: "Normal" }
    ],
    advice: "CBC parameters within healthy pediatric reference limits.",
    fileType: "PATHOLOGY",
    fileUrl: "/assets/ss.png",
    downloadName: "CBC_Report_Reyansh_Aug2026.pdf"
  },
  {
    id: "rx-295",
    kidId: "kid-102",
    kidName: "Ananya Sharma",
    title: "Radiology - Chest X-Ray (PA View)",
    date: "2026-06-18",
    doctor: "Dr. Ila B / Apex Radiology Center",
    specialty: "Pediatric Radiology",
    registrationNo: "RAD-3310",
    diagnosis: "Pre-school seasonal wheeze evaluation",
    medicines: [],
    labResults: [
      { test: "Lung Fields", value: "Clear bilateral lung zones", range: "-", status: "Normal" },
      { test: "Cardiothoracic Ratio", value: "< 50%", range: "< 50%", status: "Normal" },
      { test: "Costophrenic Angles", value: "Sharp and clear", range: "-", status: "Normal" }
    ],
    advice: "No focal consolidation, pneumothorax or pleural effusion seen.",
    fileType: "RADIOLOGY",
    fileUrl: "/assets/pdf_logo.jpg",
    downloadName: "Chest_XRay_Ananya.pdf"
  }
];

export const WEEKLY_NUTRITION_PLAN = {
  monday: {
    dayName: "Monday",
    shortDay: "Mon",
    dayTheme: "Immunity & Energy Kickstart",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,030 kcal",
    proteinTotal: "38g",
    waterTarget: "5-6 Glasses (1.2 L)",
    dailyTip: "Turmeric and cow milk provide natural anti-inflammatory curcumin to boost toddler immunity.",
    meals: [
      {
        id: "mon-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Warm Saffron Almond Milk & Soaked Raisins",
        subtitle: "Gentle morning stomach awakening & natural bowel motility",
        calories: "120 kcal",
        protein: "4g",
        carbs: "16g",
        fats: "5g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["100ml warm cow milk (or formula)", "2 strands Kashmiri saffron", "4 soaked & peeled almonds", "4 soaked black raisins"],
        tips: "Soaked black raisins provide natural iron and soften stools naturally."
      },
      {
        id: "mon-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Soft Scrambled Eggs & Whole Wheat Toast",
        subtitle: "High protein & choline powerhouse for morning brain development",
        calories: "280 kcal",
        protein: "11g",
        carbs: "22g",
        fats: "12g",
        image: "/assets/fried_eggs.png",
        ingredients: ["1 organic farm egg", "1 slice whole-wheat brown bread", "1/2 tsp cow ghee", "Pinch of ground cumin & mild pepper"],
        tips: "Choline from egg yolks is essential for neural and cognitive development in early years."
      },
      {
        id: "mon-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Soft Steamed Rice with Yellow Moong Dal & Spinach Mash",
        subtitle: "Comforting, fiber-rich, and easily digestible iron-packed staple meal",
        calories: "340 kcal",
        protein: "14g",
        carbs: "52g",
        fats: "8g",
        image: "/assets/rice_bowl_1.png",
        ingredients: ["1/2 cup soft cooked sona masoori rice", "1/2 cup yellow moong dal with hing & cumin", "Steamed baby spinach puree", "1 tsp A2 cow ghee"],
        tips: "Combining rice and moong dal provides a complete amino acid profile for tissue building."
      },
      {
        id: "mon-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Mild Vegetable Moong Khichdi with Steamed Broccoli Florets",
        subtitle: "Light, soothing dinner promoting uninterrupted deep sleep and gut healing",
        calories: "290 kcal",
        protein: "9g",
        carbs: "44g",
        fats: "7g",
        image: "/assets/lunch.png",
        ingredients: ["1/2 cup rice-lentil porridge", "Steamed tender broccoli & yellow pumpkin", "Pinch of roasted cumin & hing"],
        tips: "Feed dinner at least 1.5 hours prior to bedtime to prevent reflux and promote sound sleep."
      }
    ]
  },
  tuesday: {
    dayName: "Tuesday",
    shortDay: "Tue",
    dayTheme: "Brain Power & Healthy Bones",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,045 kcal",
    proteinTotal: "39g",
    waterTarget: "5-6 Glasses (1.2 L)",
    dailyTip: "Ragi (Finger Millet) is 3x richer in calcium than milk, supporting rapid skeletal growth.",
    meals: [
      {
        id: "tue-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Warm Cinnamon Milk & Soaked Walnut Paste",
        subtitle: "Omega-3 DHA fats for morning mental alertness",
        calories: "125 kcal",
        protein: "4.5g",
        carbs: "14g",
        fats: "6g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["100ml warm milk", "Pinch of Ceylon cinnamon", "2 soaked walnut halves (finely crushed)"],
        tips: "Walnuts are shaped like brains and are the #1 nut for pediatric brain neuroplasticity."
      },
      {
        id: "tue-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Steamed Ragi & Banana Mini Idlis with Fresh Coconut Chutney",
        subtitle: "Supercharged calcium & potassium duo with prebiotic coconut fat",
        calories: "270 kcal",
        protein: "8g",
        carbs: "42g",
        fats: "6g",
        image: "/assets/bowl.png",
        ingredients: ["2 small sprouted ragi-rice idlis", "1/2 ripe mashed elaichi banana", "Mild coconut-coriander dip"],
        tips: "Sprouted ragi releases bio-available iron and calcium without phytate blockage."
      },
      {
        id: "tue-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Soft Butter Phulka with Paneer Bhurji & Carrot Mash",
        subtitle: "Fresh cottage cheese protein with beta-carotene for sharp vision",
        calories: "360 kcal",
        protein: "16g",
        carbs: "46g",
        fats: "11g",
        image: "/assets/lentil_salad.png",
        ingredients: ["1 soft whole wheat phulka torn into bites", "40g fresh soft homemade paneer crumble", "Steamed sweet carrot & pea mash"],
        tips: "Homemade fresh paneer provides soft casein protein that doesn't cause colic."
      },
      {
        id: "tue-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Sweet Potato & Masoor Lentil Pureed Porridge",
        subtitle: "Complex carbohydrates that steady blood glucose all night long",
        calories: "290 kcal",
        protein: "10.5g",
        carbs: "48g",
        fats: "6g",
        image: "/assets/lunch.png",
        ingredients: ["1/2 cup cooked red masoor dal", "Steamed orange sweet potato cube mash", "1/2 tsp cow ghee", "Pinch of rock salt"],
        tips: "Sweet potato provides slowly releasing carbs preventing mid-night hunger wakeups."
      }
    ]
  },
  wednesday: {
    dayName: "Wednesday",
    shortDay: "Wed",
    dayTheme: "Gut Microbiome & Digestion",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,010 kcal",
    proteinTotal: "36g",
    waterTarget: "6 Glasses (1.3 L)",
    dailyTip: "Natural probiotics from fresh curd reseed beneficial lactobacillus bacteria in infant intestines.",
    meals: [
      {
        id: "wed-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Lukewarm Fennel Seed Water & Prune Mash",
        subtitle: "Gentle natural digestive carminative to relieve toddler gas & bloating",
        calories: "90 kcal",
        protein: "2g",
        carbs: "18g",
        fats: "1g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["80ml strained lukewarm saunf (fennel) water", "1 pureed organic California prune"],
        tips: "Fennel relaxes the gastrointestinal smooth muscles and prevents morning colic."
      },
      {
        id: "wed-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Apple-Cinnamon Rolled Oats Porridge with Chia Gel",
        subtitle: "Soluble beta-glucan fiber bowl for continuous morning energy",
        calories: "280 kcal",
        protein: "9g",
        carbs: "44g",
        fats: "7g",
        image: "/assets/bowl.png",
        ingredients: ["1/3 cup whole rolled oats cooked in milk", "1/2 grated sweet red apple", "1/2 tsp soaked chia seeds", "Pinch of cinnamon"],
        tips: "Beta-glucan fibers coat the stomach lining and foster healthy gut flora."
      },
      {
        id: "wed-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Soft Curd Rice with Mild Cumin Tempering & Boiled Beetroot",
        subtitle: "Live probiotic culture bowl with nitric oxide boosting beets",
        calories: "350 kcal",
        protein: "13g",
        carbs: "54g",
        fats: "8.5g",
        image: "/assets/rice_bowl_1.png",
        ingredients: ["1/2 cup soft overcooked rice", "1/3 cup fresh sweet homemade curd", "Pinch of cumin & curry leaf oil", "Steamed ruby beetroot mash"],
        tips: "Fresh, non-sour curd gives millions of live cultures that prevent diarrhea and antibiotic gut shock."
      },
      {
        id: "wed-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Zucchini & Yellow Pumpkin Soup with Soft Rice Pearls",
        subtitle: "Ultra-light, anti-acidic evening nourishment",
        calories: "290 kcal",
        protein: "12g",
        carbs: "46g",
        fats: "5.5g",
        image: "/assets/lunch.png",
        ingredients: ["1/2 cup tender green zucchini & pumpkin soup", "2 tbsp soft rice pearls", "1 tsp olive oil or melted butter"],
        tips: "Zucchini has 95% water content and high electrolytes for evening hydration."
      }
    ]
  },
  thursday: {
    dayName: "Thursday",
    shortDay: "Thu",
    dayTheme: "Iron & Hemoglobin Booster",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,060 kcal",
    proteinTotal: "41g",
    waterTarget: "5-6 Glasses (1.2 L)",
    dailyTip: "Pairing plant iron with lemon juice (Vitamin C) triples cellular iron absorption.",
    meals: [
      {
        id: "thu-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Warm Spiced Turmeric Milk & Fig Puree",
        subtitle: "Immunity elixir with bioactive iron from dried figs",
        calories: "120 kcal",
        protein: "4g",
        carbs: "19g",
        fats: "4g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["100ml warm milk", "1/4 tsp organic turmeric", "1 soaked Turkish anjeer (fig) paste"],
        tips: "Figs are packed with copper and iron to stimulate healthy RBC synthesis."
      },
      {
        id: "thu-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Fluffy Vegetable Poha with Sweet Green Peas & Lemon Drops",
        subtitle: "Flattened rice enriched with iron and easy digestible starch",
        calories: "260 kcal",
        protein: "7.5g",
        carbs: "46g",
        fats: "5g",
        image: "/assets/bowl.png",
        ingredients: ["1/2 cup soft red-rice poha", "Steamed sweet green peas & finely minced carrots", "3 drops fresh lemon juice", "1/2 tsp ghee"],
        tips: "Poha retains iron from the traditional pounding rollers and is very gentle on toddler stomachs."
      },
      {
        id: "thu-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Steamed Rice with Toor Dal, Drumstick Pulp & Ghee",
        subtitle: "South Indian traditional power dal with high bio-available zinc",
        calories: "370 kcal",
        protein: "16.5g",
        carbs: "56g",
        fats: "9g",
        image: "/assets/rice_bowl_1.png",
        ingredients: ["1/2 cup steamed sona masoori rice", "1/2 cup thick toor dal with tomato and moringa pulp", "1 tsp cow ghee"],
        tips: "Drumstick (Moringa) pulp contains 7x more Vitamin C than oranges."
      },
      {
        id: "thu-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Lentil & Spinach Soft Dalia (Broken Wheat Porridge)",
        subtitle: "Fiber-rich whole grain dinner preventing constipation",
        calories: "310 kcal",
        protein: "13g",
        carbs: "48g",
        fats: "6.5g",
        image: "/assets/lunch.png",
        ingredients: ["1/2 cup broken wheat daliya cooked with yellow moong dal", "Finely pureed palak (spinach)", "Pinch of roasted cumin"],
        tips: "Broken wheat provides slow-burning complex fiber that keeps insulin steady."
      }
    ]
  },
  friday: {
    dayName: "Friday",
    shortDay: "Fri",
    dayTheme: "Active Growth & Muscle Building",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,075 kcal",
    proteinTotal: "43g",
    waterTarget: "6 Glasses (1.3 L)",
    dailyTip: "Plant proteins from moong and besan give leucine amino acids needed for muscle repair.",
    meals: [
      {
        id: "fri-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Warm Almond Milk with Cardamom & Soaked Cashew Paste",
        subtitle: "Wholesome natural lipids for active muscle building",
        calories: "130 kcal",
        protein: "4.8g",
        carbs: "15g",
        fats: "6.5g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["100ml warm whole milk", "Crushed green cardamom pod", "2 soaked raw cashews (paste)"],
        tips: "Cashews provide zinc and magnesium which support active muscle coordination."
      },
      {
        id: "fri-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Golden Moong Dal Cheela with Mint Yogurt Dip",
        subtitle: "Savory sprouted lentil crepes rich in plant protein and folic acid",
        calories: "290 kcal",
        protein: "13g",
        carbs: "38g",
        fats: "8.5g",
        image: "/assets/fried_eggs.png",
        ingredients: ["2 small yellow moong dal crepes", "Grated zucchini & paneer stuffing", "2 tbsp mild mint yogurt dip"],
        tips: "Moong cheela is gluten-free and easy to chew for toddlers with early molars."
      },
      {
        id: "fri-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Steamed Rice with Mixed Veg Sambar & Bottle Gourd Puree",
        subtitle: "Traditional South-Indian protein-fiber stew with cooling lauki",
        calories: "360 kcal",
        protein: "14.5g",
        carbs: "54g",
        fats: "8g",
        image: "/assets/rice_bowl_1.png",
        ingredients: ["1/2 cup soft boiled rice", "1/2 cup mild tamarind-free vegetable sambar", "Steamed bottle gourd (lauki) puree", "1 tsp ghee"],
        tips: "Bottle gourd is 96% water and helps prevent toddler urinary tract irritation."
      },
      {
        id: "fri-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Mild Mixed Vegetable Khichdi with Soft Boiled Egg/Tofu",
        subtitle: "Complete amino acid dinner for end-of-week recovery",
        calories: "295 kcal",
        protein: "11g",
        carbs: "42g",
        fats: "7.5g",
        image: "/assets/lunch.png",
        ingredients: ["1/2 cup organic rice-dal khichdi", "1/2 soft boiled egg yolk or tofu crumble", "Pure cow ghee"],
        tips: "Protein intake at night assists the nocturnal surge of human growth hormone (HGH)."
      }
    ]
  },
  saturday: {
    dayName: "Saturday",
    shortDay: "Sat",
    dayTheme: "Weekend Family Superfood Day",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,050 kcal",
    proteinTotal: "39g",
    waterTarget: "6 Glasses (1.3 L)",
    dailyTip: "Weekend variety meals expand toddler palate and prevent selective picky eating.",
    meals: [
      {
        id: "sat-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Warm Honey-Lemon (Mild) Water with Soaked Almonds",
        subtitle: "Gentle detox and Vitamin C for weekend morning vitality",
        calories: "105 kcal",
        protein: "3.5g",
        carbs: "17g",
        fats: "3.5g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["80ml lukewarm water", "1/2 tsp organic raw honey (for 1+ yr olds)", "3 drops fresh lemon", "3 peeled soaked almonds"],
        tips: "Honey is strictly for toddlers above 12 months and provides natural antibacterial properties."
      },
      {
        id: "sat-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Soft Roasted Semolina (Suji) Upma with Grated Carrots",
        subtitle: "Warm, fluffy breakfast seasoned with curry leaves and mustard seeds",
        calories: "275 kcal",
        protein: "8g",
        carbs: "46g",
        fats: "7g",
        image: "/assets/bowl.png",
        ingredients: ["1/2 cup soft roasted wheat semolina upma", "Finely grated sweet carrots & green peas", "1/2 tsp cow ghee", "Mild cumin aroma"],
        tips: "Suji is easy on the gastrointestinal tract and rapidly replenishes morning glycogen stores."
      },
      {
        id: "sat-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Mild Paneer & Pea Pulao with Cucumber Mint Raita",
        subtitle: "Fragrant rice dish with calcium-rich paneer and cooling mint curd",
        calories: "380 kcal",
        protein: "16g",
        carbs: "53g",
        fats: "11g",
        image: "/assets/rice_bowl_1.png",
        ingredients: ["1/2 cup mild cumin-clove fragrant rice", "40g paneer cubes", "Sweet green peas", "1/3 cup fresh cucumber raita"],
        tips: "Cucumber raita lowers body heat on sunny weekend afternoons."
      },
      {
        id: "sat-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Pumpkin & Red Lentil Soup with Soft Whole-Wheat Toast Bites",
        subtitle: "Creamy, naturally sweet soup providing bedtime tryptophan",
        calories: "290 kcal",
        protein: "11.5g",
        carbs: "43g",
        fats: "6.5g",
        image: "/assets/lunch.png",
        ingredients: ["1/2 cup sweet red pumpkin and masoor soup", "4 soft bite-sized whole wheat croutons", "1 tsp cow ghee"],
        tips: "Pumpkin contains natural L-tryptophan which synthesizes melatonin for deep REM sleep."
      }
    ]
  },
  sunday: {
    dayName: "Sunday",
    shortDay: "Sun",
    dayTheme: "Recovery & Calm Bedtime Reset",
    publishedDate: "25 Sep 2026",
    verifiedDoctor: "Dr. Ila B (Senior Pediatrician)",
    status: "Published & Active",
    totalCalories: "1,035 kcal",
    proteinTotal: "37g",
    waterTarget: "5-6 Glasses (1.2 L)",
    dailyTip: "Whole wheat and bananas release serotonin, ensuring a restful reset for the school week.",
    meals: [
      {
        id: "sun-m1",
        slotKey: "early_morning",
        timeSlot: "Early Morning (06:30 AM)",
        title: "Warm Fresh Milk with Crushed Pistachio & Saffron",
        subtitle: "Antioxidant-dense Sunday morning royal treat",
        calories: "125 kcal",
        protein: "4.5g",
        carbs: "15g",
        fats: "5.5g",
        image: "/assets/glass_full_fresh_milk_1.png",
        ingredients: ["100ml warm milk", "2 crushed unsalted Iranian pistachios", "1 strand saffron"],
        tips: "Pistachios supply Vitamin B6, essential for myelin nerve sheath synthesis."
      },
      {
        id: "sun-m2",
        slotKey: "breakfast",
        timeSlot: "Breakfast (08:30 AM)",
        title: "Whole Wheat Banana Pancakes with Pure Fruit Puree",
        subtitle: "Fluffy toddler-friendly pancakes with zero refined sugar",
        calories: "290 kcal",
        protein: "8.5g",
        carbs: "48g",
        fats: "7.5g",
        image: "/assets/fried_eggs.png",
        ingredients: ["2 small whole wheat banana pancakes", "1 tbsp pureed ripe strawberries / apple sauce", "Drizzle of pure honey"],
        tips: "Bananas sweeten pancakes naturally without raising insulin spikes."
      },
      {
        id: "sun-m3",
        slotKey: "lunch",
        timeSlot: "Lunch (12:45 PM)",
        title: "Sunday Family Veggie Pilaf with Dal Tadka & Salad Puree",
        subtitle: "Celebratory balanced meal packed with 6 wholesome vegetables",
        calories: "365 kcal",
        protein: "14g",
        carbs: "54g",
        fats: "9g",
        image: "/assets/rice_bowl_1.png",
        ingredients: ["1/2 cup vegetable basmati pilaf", "1/2 cup yellow dal with cumin & ghee", "Mashed steamed carrot & cucumber cubes"],
        tips: "Eating colorful rainbow vegetables gives diverse polyphenols to toddler immune cells."
      },
      {
        id: "sun-m4",
        slotKey: "dinner",
        timeSlot: "Dinner (07:30 PM)",
        title: "Warm Oats-Date Porridge with Pinch of Nutmeg",
        subtitle: "Calming Sunday dinner to ensure deep uninterrupted sleep",
        calories: "255 kcal",
        protein: "9.5g",
        carbs: "41g",
        fats: "5.5g",
        image: "/assets/lunch.png",
        ingredients: ["1/3 cup oats cooked in milk", "1 soft Medjool date pureed into porridge", "Pinch of ground nutmeg"],
        tips: "A microscopic pinch of nutmeg has ancient pediatric calming benefits before sleep."
      }
    ]
  }
};

export const NUTRITION_MEALS = WEEKLY_NUTRITION_PLAN.monday.meals;

export const HEALTH_FEEDS = [
  {
    id: "feed-101",
    tag: "Nutrition & Brain",
    title: "Omega-3 & DHA: The Building Blocks of Toddler Cognitive Skills",
    readTime: "3 min read",
    author: "Dr. Ila B",
    likes: 142,
    image: "/assets/kid_meditating_mat_2.png",
    excerpt: "Why 80% of brain architecture is formed by age 3 and how healthy fats from eggs, walnuts, and breast milk support synapses."
  },
  {
    id: "feed-102",
    tag: "Vaccines & Immunity",
    title: "Demystifying Post-Vaccination Fever & Care Protocol",
    readTime: "4 min read",
    author: "Dr. Ila B",
    likes: 218,
    image: "/assets/nurse.png",
    excerpt: "Understanding why a slight temperature proves the vaccine is working, when to give fever medication, and red-flag symptoms."
  },
  {
    id: "feed-103",
    tag: "Sleep & Growth",
    title: "How Deep REM Sleep Triggers Growth Hormone Release in Babies",
    readTime: "2 min read",
    author: "Pediatric Sleep Team",
    likes: 95,
    image: "/assets/sleeping_baby.png",
    excerpt: "Children secrete over 70% of human growth hormone (HGH) during slow-wave non-REM stages. Tips for calm night routines."
  }
];

export const SYMPTOMS_LIST = [
  { id: "sym-1", name: "Fever / High Temperature", icon: "🌡️", category: "Common" },
  { id: "sym-2", name: "Dry Cough / Congestion", icon: "🗣️", category: "Respiratory" },
  { id: "sym-3", name: "Runny / Blocked Nose", icon: "🤧", category: "Respiratory" },
  { id: "sym-4", name: "Vomiting / Nausea", icon: "🤢", category: "Stomach" },
  { id: "sym-5", name: "Loose Motions / Diarrhea", icon: "💧", category: "Stomach" },
  { id: "sym-6", name: "Skin Rash / Eczema / Hives", icon: "🔴", category: "Skin" },
  { id: "sym-7", name: "Loss of Appetite / Feeding Refusal", icon: "🥣", category: "General" },
  { id: "sym-8", name: "Ear Pain / Ear Pulling", icon: "👂", category: "ENT" },
  { id: "sym-9", name: "Teething Fussiness & Drooling", icon: "🦷", category: "Infant" },
  { id: "sym-10", name: "Vaccination Reaction Check", icon: "💉", category: "Preventative" },
  { id: "sym-11", name: "Growth & Weight Plateau", icon: "⚖️", category: "Development" },
  { id: "sym-12", name: "Sleep Disturbances / Night Waking", icon: "🌙", category: "Behavioral" }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-01",
    title: "Consultation Reminder",
    body: "Upcoming video consultation with Dr. Ila B tomorrow at 3:00 PM for Reyansh Sharma.",
    timestamp: "10 mins ago",
    read: false,
    type: "appointment",
    actionRoute: "appointments"
  },
  {
    id: "notif-02",
    title: "Doctor Replied to your Flip",
    body: "Dr. Ila B provided medical advice for 'Mild fever after 14-month booster shot'.",
    timestamp: "2 hours ago",
    read: false,
    type: "flip",
    actionRoute: "flips"
  },
  {
    id: "notif-03",
    title: "Vaccination Due Alert",
    body: "Varicella (Chickenpox) Dose 1 is due for Reyansh Sharma. Please book a slot.",
    timestamp: "1 day ago",
    read: true,
    type: "vaccine",
    actionRoute: "vaccines"
  },
  {
    id: "notif-04",
    title: "Growth Milestone Logged",
    body: "Reyansh is tracking healthy in the 65th percentile for weight and height.",
    timestamp: "3 days ago",
    read: true,
    type: "growth",
    actionRoute: "growth"
  }
];

export const FAQS = [
  {
    question: "What is a 'Flip' in KidCare?",
    answer: "A Flip is a rapid, asynchronous digital communication card between you and Dr. Ila B. You can send an 'Ask a Question' card, an 'Emergency Query', 'Feedback Flip', or 'Routine Milestone Check'. The pediatric team reviews your query and attachments to provide verified medical advice without requiring a full clinic visit."
  },
  {
    question: "How do I join the live video consultation?",
    answer: "Go to the Appointments tab and tap 'Join Live Video Consultation' on your upcoming appointment card when within 15 minutes of the scheduled time. Ensure your camera and microphone permissions are enabled."
  },
  {
    question: "Are WHO percentile growth charts accurate for Indian children?",
    answer: "Yes, KidCare utilizes the World Health Organization (WHO) Child Growth Standards 2006/2024 calibrated alongside Indian Academy of Pediatrics (IAP) percentiles to accurately track height, weight, and head circumference."
  },
  {
    question: "Can I download and share my child's medical prescriptions & records?",
    answer: "Yes, all prescriptions, lab test reports, and vaccination certificates are digitally signed and available in the Prescriptions tab. You can download PDF copies or share them directly with other healthcare providers."
  },
  {
    question: "How do I add a second child to the app?",
    answer: "You can tap on your child's profile card at the top and select '+ Add Child Profile' or go to Profile Settings > Add Kid Profile to manage multiple children in one parent account seamlessly."
  }
];


