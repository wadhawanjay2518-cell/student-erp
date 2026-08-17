/* ==========================================================================
   EDUFLOW REALISTIC DATA REPOSITORY
   Autonomous ERP & Early Risk Intervention System Dataset
   ========================================================================== */

export const DEPARTMENTS = [
  { id: 'CSE', name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. Rajeshwari Swaminathan', studentsCount: 420, avgAttendance: 81.4, atRiskCount: 14 },
  { id: 'AI_DS', name: 'Artificial Intelligence & Data Science', code: 'AI&DS', head: 'Dr. Michael Chen', studentsCount: 280, avgAttendance: 84.2, atRiskCount: 8 },
  { id: 'ECE', name: 'Electronics & Communication', code: 'ECE', head: 'Prof. S. K. Venkatesh', studentsCount: 360, avgAttendance: 77.9, atRiskCount: 19 },
  { id: 'MECH', name: 'Mechanical & Automation', code: 'MECH', head: 'Dr. Vikram Malhotra', studentsCount: 310, avgAttendance: 79.5, atRiskCount: 12 },
];

export const MENTORS = [
  { id: 'FAC-001', name: 'Dr. Sarah Chen', title: 'Associate Professor & Senior Faculty Mentor', dept: 'CSE', email: 's.chen@eduflow.edu', cabin: 'Tech Block 3, Room 304', menteesCount: 32, resolvedThisMonth: 18, avgResponseTime: '3.2 hrs', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
  { id: 'FAC-002', name: 'Prof. David Reynolds', title: 'Assistant Professor', dept: 'ECE', email: 'd.reynolds@eduflow.edu', cabin: 'ECE Block 2, Room 108', menteesCount: 28, resolvedThisMonth: 12, avgResponseTime: '5.1 hrs', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' },
  { id: 'FAC-003', name: 'Dr. Kavita Narayanan', title: 'Professor & Lab In-Charge', dept: 'AI&DS', email: 'k.narayanan@eduflow.edu', cabin: 'Turing Hall, Room 412', menteesCount: 30, resolvedThisMonth: 15, avgResponseTime: '2.8 hrs', avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80' },
];

export const STUDENTS = [
  {
    id: 'STU-101',
    name: 'Rahul Sharma',
    rollNo: 'CS2023-042',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    department: 'CSE',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'rahul.sharma23@eduflow.edu',
    phone: '+91 98451 22910',
    parentName: 'Sanjay Sharma',
    parentPhone: '+91 98450 11094',
    mentorId: 'FAC-001',
    mentorName: 'Dr. Sarah Chen',
    
    // Core Risk Status
    riskTier: 'CRITICAL', // CRITICAL | MODERATE | WATCHLIST | ON_TRACK
    overallRiskScore: 84, // 0 - 100 (Higher = more critical)
    healthGrowthScore: 62, // Student Facing Vitality Score
    flagReason: 'Debarment Threat: Attendance dropped to 63% with 3 consecutive Monday Lab absences + Midterm Dip',
    
    // Key Metrics
    attendance: {
      current: 63.2,
      required: 75.0,
      trend: 'down',
      missedConsecutiveDays: 4,
      totalClassesHeld: 144,
      classesAttended: 91,
      classesNeededFor75: 7, // 7 consecutive attendances to recover to 75%
      historical: [
        { week: 'Wk 1', rate: 92 },
        { week: 'Wk 2', rate: 89 },
        { week: 'Wk 3', rate: 86 },
        { week: 'Wk 4', rate: 81 },
        { week: 'Wk 5', rate: 74 },
        { week: 'Wk 6', rate: 68 },
        { week: 'Wk 7', rate: 63.2 },
      ],
      anomalies: [
        { date: '2026-08-10', day: 'Monday', reason: 'Missed Advanced DBMS Lab & Operating Systems Lecture', biometric: 'Hostel Out-Gate at 08:15 AM' },
        { date: '2026-08-03', day: 'Monday', reason: 'Missed Advanced DBMS Lab', biometric: 'No turnstile tap recorded' },
        { date: '2026-07-27', day: 'Monday', reason: 'Missed Advanced DBMS Lab', biometric: 'Late check-in at 11:40 AM' },
      ]
    },
    
    academic: {
      cgpa: 6.78,
      lastSemGPA: 6.40,
      cohortAvgCGPA: 7.82,
      backlogs: 1,
      scholarship: 'None',
      scholarshipAtRisk: false,
      courses: [
        { code: 'CS501', name: 'Design & Analysis of Algorithms', attendance: 68, internalMark: 28, maxInternal: 50, status: 'warning' },
        { code: 'CS502', name: 'Database Management Systems', attendance: 58, internalMark: 22, maxInternal: 50, status: 'critical' },
        { code: 'CS503', name: 'Operating Systems', attendance: 62, internalMark: 31, maxInternal: 50, status: 'warning' },
        { code: 'CS504', name: 'Computer Networks', attendance: 76, internalMark: 38, maxInternal: 50, status: 'good' },
        { code: 'CS505', name: 'Cloud Computing & Microservices', attendance: 64, internalMark: 30, maxInternal: 50, status: 'warning' },
      ],
      gpaHistory: [
        { sem: 'Sem 1', gpa: 7.6, cohort: 7.4 },
        { sem: 'Sem 2', gpa: 7.4, cohort: 7.5 },
        { sem: 'Sem 3', gpa: 7.1, cohort: 7.7 },
        { sem: 'Sem 4', gpa: 6.4, cohort: 7.8 },
        { sem: 'Sem 5 (Proj)', gpa: 5.9, cohort: 7.9 },
      ]
    },
    
    // AI Explainability & Diagnosis
    aiDiagnosis: {
      primaryFactor: 'Attendance cascade in Laboratory sessions and early morning lectures',
      confidence: 94.2,
      riskCascadePrediction: 'High probability (88%) of being debarred from CS502 DBMS Practicals. Projected CGPA drop to 6.20 if internal assessment 2 is missed.',
      featureWeights: [
        { factor: 'Lab Absences (Monday Mornings)', weight: 45 },
        { factor: 'Midterm 1 Score Dip (DBMS)', weight: 28 },
        { factor: 'Assignment Submission Delay', weight: 17 },
        { factor: 'Library / LMS Inactivity', weight: 10 },
      ],
      recommendedPlan: [
        'Immediate 1-on-1 counseling to diagnose Monday transport / health blocker',
        'Attend next 7 continuous lectures to restore threshold above 75%',
        'Submit make-up practical journal for DBMS Lab by Friday',
      ]
    },

    // Autonomous Intervention Log History
    interventionHistory: [
      { id: 'INT-901', timestamp: '2026-08-11 09:30 AM', type: 'AUTONOMOUS_TRIGGER', title: 'Rule ATT_CRIT_01 Triggered', description: 'Attendance fell below 65%. Automated WhatsApp alert dispatched to student & parent.', status: 'COMPLETED' },
      { id: 'INT-902', timestamp: '2026-08-11 09:31 AM', type: 'MENTOR_TASK', title: 'Auto-Scheduled 1-on-1 Mentoring Session', description: 'Meeting slot reserved with Dr. Sarah Chen for Aug 12, 03:00 PM.', status: 'PENDING_FACULTY_LOG' },
      { id: 'INT-903', timestamp: '2026-08-11 09:31 AM', type: 'ESCALATION_TIMER', title: '72-Hour Escalation Watchdog Active', description: 'Timer started. If mentor check-in is not logged within 72h, automated escalation will notify Dept HOD.', status: 'ACTIVE_TIMER', deadline: '2026-08-14 09:31 AM' },
    ],

    hallTicketStatus: 'CONDITIONAL', // ELIGIBLE | CONDITIONAL | BLOCKED
    feeStatus: 'PAID',
  },

  {
    id: 'STU-102',
    name: 'Ananya Patel',
    rollNo: 'CS2023-018',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'CSE',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'ananya.p23@eduflow.edu',
    phone: '+91 97312 88410',
    parentName: 'Ramesh Patel',
    parentPhone: '+91 97310 99231',
    mentorId: 'FAC-001',
    mentorName: 'Dr. Sarah Chen',
    
    riskTier: 'CRITICAL',
    overallRiskScore: 78,
    healthGrowthScore: 68,
    flagReason: 'Sudden Midterm Mark Crash (32% in CS501) + 2 Assignment Defaults',
    
    attendance: {
      current: 78.4,
      required: 75.0,
      trend: 'stable',
      missedConsecutiveDays: 0,
      totalClassesHeld: 144,
      classesAttended: 113,
      classesNeededFor75: 0,
      historical: [
        { week: 'Wk 1', rate: 88 },
        { week: 'Wk 2', rate: 85 },
        { week: 'Wk 3', rate: 82 },
        { week: 'Wk 4', rate: 80 },
        { week: 'Wk 5', rate: 79 },
        { week: 'Wk 6', rate: 78.5 },
        { week: 'Wk 7', rate: 78.4 },
      ],
      anomalies: []
    },
    
    academic: {
      cgpa: 8.12,
      lastSemGPA: 8.45,
      cohortAvgCGPA: 7.82,
      backlogs: 0,
      scholarship: 'Merit Tier B',
      scholarshipAtRisk: true,
      courses: [
        { code: 'CS501', name: 'Design & Analysis of Algorithms', attendance: 76, internalMark: 16, maxInternal: 50, status: 'critical' },
        { code: 'CS502', name: 'Database Management Systems', attendance: 80, internalMark: 36, maxInternal: 50, status: 'good' },
        { code: 'CS503', name: 'Operating Systems', attendance: 78, internalMark: 34, maxInternal: 50, status: 'good' },
        { code: 'CS504', name: 'Computer Networks', attendance: 82, internalMark: 40, maxInternal: 50, status: 'good' },
        { code: 'CS505', name: 'Cloud Computing & Microservices', attendance: 76, internalMark: 37, maxInternal: 50, status: 'good' },
      ],
      gpaHistory: [
        { sem: 'Sem 1', gpa: 8.6, cohort: 7.4 },
        { sem: 'Sem 2', gpa: 8.5, cohort: 7.5 },
        { sem: 'Sem 3', gpa: 8.3, cohort: 7.7 },
        { sem: 'Sem 4', gpa: 8.45, cohort: 7.8 },
        { sem: 'Sem 5 (Proj)', gpa: 6.9, cohort: 7.9 },
      ]
    },
    
    aiDiagnosis: {
      primaryFactor: 'Concept mastery deficit in Dynamic Programming & Graph Theory (CS501)',
      confidence: 91.5,
      riskCascadePrediction: 'High likelihood of academic probation in CS501 and potential loss of Merit Tier B scholarship ($1,200/yr benefit).',
      featureWeights: [
        { factor: 'Algorithm Midterm Failure', weight: 55 },
        { factor: 'Late Assignment Velocity', weight: 25 },
        { factor: 'LMS Coding Sandbox Inactivity', weight: 20 },
      ],
      recommendedPlan: [
        'Enroll in Peer-Assisted Study Session (PASS) for Algorithms',
        'Schedule problem-solving clinic with TA by Wednesday',
        'Submit assignment 2 draft for preliminary review',
      ]
    },

    interventionHistory: [
      { id: 'INT-880', timestamp: '2026-08-09 11:15 AM', type: 'AUTONOMOUS_TRIGGER', title: 'Rule ACAD_DIP_02 Triggered', description: 'Internal mark < 35% detected in Core Course CS501.', status: 'COMPLETED' },
      { id: 'INT-881', timestamp: '2026-08-09 11:16 AM', type: 'PEER_TUTOR', title: 'Auto-Matched with Peer Tutor', description: 'Assigned to Karthik Iyer (Rank #2 in CS501) for 3 weekend sessions.', status: 'IN_PROGRESS' },
    ],

    hallTicketStatus: 'ELIGIBLE',
    feeStatus: 'PAID',
  },

  {
    id: 'STU-103',
    name: 'Vikram Reddy',
    rollNo: 'AI2023-089',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'AI_DS',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'vikram.r@eduflow.edu',
    phone: '+91 98840 55123',
    parentName: 'K. V. Reddy',
    parentPhone: '+91 98840 66789',
    mentorId: 'FAC-003',
    mentorName: 'Dr. Kavita Narayanan',
    
    riskTier: 'CRITICAL',
    overallRiskScore: 76,
    healthGrowthScore: 70,
    flagReason: 'Scholarship Vulnerability: CGPA 6.94 vs 7.50 Cutoff + Unresolved Fee Installment',
    
    attendance: {
      current: 76.2,
      required: 75.0,
      trend: 'down',
      missedConsecutiveDays: 1,
      totalClassesHeld: 140,
      classesAttended: 107,
      classesNeededFor75: 0,
      historical: [
        { week: 'Wk 1', rate: 85 },
        { week: 'Wk 2', rate: 82 },
        { week: 'Wk 3', rate: 79 },
        { week: 'Wk 4', rate: 77 },
        { week: 'Wk 5', rate: 76.5 },
        { week: 'Wk 6', rate: 76.2 },
      ],
      anomalies: []
    },
    
    academic: {
      cgpa: 6.94,
      lastSemGPA: 6.80,
      cohortAvgCGPA: 8.05,
      backlogs: 0,
      scholarship: 'State Merit Scholarship (Tier-A)',
      scholarshipAtRisk: true,
      courses: [
        { code: 'AI501', name: 'Deep Learning & Neural Networks', attendance: 75, internalMark: 29, maxInternal: 50, status: 'warning' },
        { code: 'AI502', name: 'Reinforcement Learning', attendance: 74, internalMark: 24, maxInternal: 50, status: 'critical' },
        { code: 'AI503', name: 'Big Data Analytics', attendance: 80, internalMark: 35, maxInternal: 50, status: 'good' },
        { code: 'AI504', name: 'Natural Language Processing', attendance: 76, internalMark: 31, maxInternal: 50, status: 'warning' },
      ],
      gpaHistory: [
        { sem: 'Sem 1', gpa: 7.8, cohort: 7.6 },
        { sem: 'Sem 2', gpa: 7.5, cohort: 7.7 },
        { sem: 'Sem 3', gpa: 7.2, cohort: 7.9 },
        { sem: 'Sem 4', gpa: 6.8, cohort: 8.0 },
        { sem: 'Sem 5 (Proj)', gpa: 6.4, cohort: 8.1 },
      ]
    },
    
    aiDiagnosis: {
      primaryFactor: 'Mathematical foundations gap in Reinforcement Learning + Financial anxiety stress',
      confidence: 89.0,
      riskCascadePrediction: 'Impending forfeiture of State Merit Scholarship if End-Sem SGPA does not exceed 7.85.',
      featureWeights: [
        { factor: 'CGPA Below Threshold', weight: 50 },
        { factor: 'Course AI502 Mark Deficit', weight: 30 },
        { factor: 'Fee Default Notice', weight: 20 },
      ],
      recommendedPlan: [
        'Counselor referral for financial aid emergency grant application',
        'Academic advisor session on credit recovery strategy',
      ]
    },

    interventionHistory: [
      { id: 'INT-760', timestamp: '2026-08-08 02:00 PM', type: 'AUTONOMOUS_TRIGGER', title: 'Scholarship Breach Alert', description: 'Automated notice sent to Financial Aid Officer & Student.', status: 'COMPLETED' }
    ],

    hallTicketStatus: 'CONDITIONAL',
    feeStatus: 'OVERDUE_INSTALLMENT',
  },

  {
    id: 'STU-104',
    name: 'Priya Nair',
    rollNo: 'EC2023-031',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'ECE',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'priya.nair@eduflow.edu',
    phone: '+91 94471 00214',
    parentName: 'Gopinath Nair',
    parentPhone: '+91 94470 33451',
    mentorId: 'FAC-002',
    mentorName: 'Prof. David Reynolds',
    
    riskTier: 'MODERATE',
    overallRiskScore: 61,
    healthGrowthScore: 74,
    flagReason: 'Consecutive Lab Session Absences (Digital Signal Processing Lab)',
    
    attendance: {
      current: 72.5,
      required: 75.0,
      trend: 'down',
      missedConsecutiveDays: 2,
      totalClassesHeld: 138,
      classesAttended: 100,
      classesNeededFor75: 4,
      historical: [
        { week: 'Wk 1', rate: 84 },
        { week: 'Wk 2', rate: 81 },
        { week: 'Wk 3', rate: 77 },
        { week: 'Wk 4', rate: 74 },
        { week: 'Wk 5', rate: 72.5 },
      ],
      anomalies: [
        { date: '2026-08-07', day: 'Friday', reason: 'Missed DSP Lab Session 5', biometric: 'Hostel out-gate approved for sports tournament' }
      ]
    },
    
    academic: {
      cgpa: 7.42,
      lastSemGPA: 7.60,
      cohortAvgCGPA: 7.55,
      backlogs: 0,
      scholarship: 'Sports Quota Aid',
      scholarshipAtRisk: false,
      courses: [
        { code: 'EC501', name: 'Digital Signal Processing', attendance: 70, internalMark: 32, maxInternal: 50, status: 'warning' },
        { code: 'EC502', name: 'Microprocessors & Microcontrollers', attendance: 74, internalMark: 34, maxInternal: 50, status: 'warning' },
        { code: 'EC503', name: 'Electromagnetic Fields', attendance: 75, internalMark: 36, maxInternal: 50, status: 'good' },
      ],
      gpaHistory: [
        { sem: 'Sem 1', gpa: 7.2, cohort: 7.1 },
        { sem: 'Sem 2', gpa: 7.5, cohort: 7.3 },
        { sem: 'Sem 3', gpa: 7.6, cohort: 7.5 },
        { sem: 'Sem 4', gpa: 7.6, cohort: 7.6 },
      ]
    },
    
    aiDiagnosis: {
      primaryFactor: 'Varsity Badminton schedule collision with Friday afternoon laboratory hours',
      confidence: 96.0,
      riskCascadePrediction: 'Easily recoverable with authorized sports duty leave endorsement and make-up lab slot.',
      featureWeights: [
        { factor: 'Sports Travel Schedule', weight: 65 },
        { factor: 'Lab Practicals Missed', weight: 35 },
      ],
      recommendedPlan: [
        'Upload Sports Board Authorization Letter to Student Locker',
        'Lab Coordinator auto-allocation for Batch B Tuesday make-up practical',
      ]
    },

    interventionHistory: [
      { id: 'INT-650', timestamp: '2026-08-08 10:00 AM', type: 'NUDGE_SENT', title: 'Sports Duty Form Request', description: 'Nudge sent via WhatsApp to upload official sports board match permit.', status: 'RESOLVED' }
    ],

    hallTicketStatus: 'CONDITIONAL',
    feeStatus: 'PAID',
  },

  {
    id: 'STU-105',
    name: 'Rohan Verma',
    rollNo: 'ME2023-014',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'MECH',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'rohan.v@eduflow.edu',
    phone: '+91 98112 33490',
    parentName: 'Sunil Verma',
    parentPhone: '+91 98112 00192',
    mentorId: 'FAC-001',
    mentorName: 'Dr. Sarah Chen',
    
    riskTier: 'MODERATE',
    overallRiskScore: 58,
    healthGrowthScore: 76,
    flagReason: 'Continuous Internal Assessment (CIA) Backlog Risk in Thermodynamics',
    
    attendance: {
      current: 74.0,
      required: 75.0,
      trend: 'stable',
      missedConsecutiveDays: 0,
      totalClassesHeld: 140,
      classesAttended: 104,
      classesNeededFor75: 2,
      historical: [
        { week: 'Wk 1', rate: 78 },
        { week: 'Wk 2', rate: 76 },
        { week: 'Wk 3', rate: 75 },
        { week: 'Wk 4', rate: 74 },
      ],
      anomalies: []
    },
    
    academic: {
      cgpa: 6.85,
      lastSemGPA: 6.90,
      cohortAvgCGPA: 7.20,
      backlogs: 1,
      scholarship: 'None',
      scholarshipAtRisk: false,
      courses: [
        { code: 'ME501', name: 'Applied Thermodynamics', attendance: 71, internalMark: 21, maxInternal: 50, status: 'critical' },
        { code: 'ME502', name: 'Fluid Mechanics & Turbomachinery', attendance: 75, internalMark: 30, maxInternal: 50, status: 'warning' },
      ],
      gpaHistory: []
    },
    
    aiDiagnosis: {
      primaryFactor: 'Low problem-solving speed in numerical calculation modules',
      confidence: 84.0,
      riskCascadePrediction: 'Needs 8 additional internal marks to secure safe exam threshold.',
      featureWeights: [
        { factor: 'Thermodynamics Quiz Failure', weight: 60 },
        { factor: 'Attendance Borderline', weight: 40 },
      ],
      recommendedPlan: [
        'Enroll in 3-day remedial problem workshop with Prof. Sharma',
      ]
    },

    interventionHistory: [],
    hallTicketStatus: 'CONDITIONAL',
    feeStatus: 'PAID',
  },

  {
    id: 'STU-106',
    name: 'Sneha Roy',
    rollNo: 'CS2023-002',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'CSE',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'sneha.roy@eduflow.edu',
    phone: '+91 98200 44102',
    parentName: 'Alok Roy',
    parentPhone: '+91 98200 55102',
    mentorId: 'FAC-001',
    mentorName: 'Dr. Sarah Chen',
    
    riskTier: 'ON_TRACK',
    overallRiskScore: 12,
    healthGrowthScore: 96,
    flagReason: 'Exemplary Academic Trajectory & 94% Attendance',
    
    attendance: {
      current: 94.5,
      required: 75.0,
      trend: 'up',
      missedConsecutiveDays: 0,
      totalClassesHeld: 144,
      classesAttended: 136,
      classesNeededFor75: 0,
      historical: [
        { week: 'Wk 1', rate: 96 },
        { week: 'Wk 2', rate: 95 },
        { week: 'Wk 3', rate: 94 },
        { week: 'Wk 4', rate: 95 },
        { week: 'Wk 5', rate: 94.5 },
      ],
      anomalies: []
    },
    
    academic: {
      cgpa: 9.42,
      lastSemGPA: 9.60,
      cohortAvgCGPA: 7.82,
      backlogs: 0,
      scholarship: 'Chancellor Gold Merit Scholar',
      scholarshipAtRisk: false,
      courses: [
        { code: 'CS501', name: 'Design & Analysis of Algorithms', attendance: 96, internalMark: 48, maxInternal: 50, status: 'good' },
        { code: 'CS502', name: 'Database Management Systems', attendance: 94, internalMark: 47, maxInternal: 50, status: 'good' },
        { code: 'CS503', name: 'Operating Systems', attendance: 95, internalMark: 49, maxInternal: 50, status: 'good' },
      ],
      gpaHistory: [
        { sem: 'Sem 1', gpa: 9.2, cohort: 7.4 },
        { sem: 'Sem 2', gpa: 9.4, cohort: 7.5 },
        { sem: 'Sem 3', gpa: 9.5, cohort: 7.7 },
        { sem: 'Sem 4', gpa: 9.6, cohort: 7.8 },
      ]
    },
    
    aiDiagnosis: {
      primaryFactor: 'High achievement velocity; nominated for Peer Tutoring Lead role',
      confidence: 99.0,
      riskCascadePrediction: 'Zero risk detected. On track for Dean Honor List.',
      featureWeights: [],
      recommendedPlan: [
        'Recommend for undergraduate research grant / IEEE conference track',
      ]
    },

    interventionHistory: [],
    hallTicketStatus: 'ELIGIBLE',
    feeStatus: 'PAID',
  },

  {
    id: 'STU-107',
    name: 'Karthik Iyer',
    rollNo: 'CS2023-009',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    department: 'CSE',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'karthik.i@eduflow.edu',
    phone: '+91 97110 33412',
    parentName: 'N. Iyer',
    parentPhone: '+91 97110 44512',
    mentorId: 'FAC-001',
    mentorName: 'Dr. Sarah Chen',
    
    riskTier: 'ON_TRACK',
    overallRiskScore: 18,
    healthGrowthScore: 92,
    flagReason: 'Strong Performance • Active Peer Mentor in Algorithms',
    
    attendance: {
      current: 91.2,
      required: 75.0,
      trend: 'stable',
      missedConsecutiveDays: 0,
      totalClassesHeld: 144,
      classesAttended: 131,
      classesNeededFor75: 0,
      historical: [{ week: 'Wk 1', rate: 92 }, { week: 'Wk 2', rate: 91.2 }],
      anomalies: []
    },
    
    academic: {
      cgpa: 8.95,
      lastSemGPA: 9.10,
      cohortAvgCGPA: 7.82,
      backlogs: 0,
      scholarship: 'Merit Tier A',
      scholarshipAtRisk: false,
      courses: [
        { code: 'CS501', name: 'Design & Analysis of Algorithms', attendance: 92, internalMark: 46, maxInternal: 50, status: 'good' },
      ],
      gpaHistory: []
    },
    
    aiDiagnosis: {
      primaryFactor: 'Robust consistency across coursework and lab milestones',
      confidence: 97.0,
      riskCascadePrediction: 'Optimal standing.',
      featureWeights: [],
      recommendedPlan: []
    },

    interventionHistory: [],
    hallTicketStatus: 'ELIGIBLE',
    feeStatus: 'PAID',
  },

  {
    id: 'STU-108',
    name: 'Tanvi Gupta',
    rollNo: 'AI2023-045',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    department: 'AI_DS',
    semester: '5th Semester',
    batch: '2022 - 2026',
    email: 'tanvi.g@eduflow.edu',
    phone: '+91 98765 43210',
    parentName: 'Vikas Gupta',
    parentPhone: '+91 98765 11111',
    mentorId: 'FAC-003',
    mentorName: 'Dr. Kavita Narayanan',
    
    riskTier: 'WATCHLIST',
    overallRiskScore: 48,
    healthGrowthScore: 80,
    flagReason: 'Attendance hovered at 74.8% (0.2% below safety margin)',
    
    attendance: {
      current: 74.8,
      required: 75.0,
      trend: 'up',
      missedConsecutiveDays: 0,
      totalClassesHeld: 140,
      classesAttended: 105,
      classesNeededFor75: 1,
      historical: [{ week: 'Wk 1', rate: 72 }, { week: 'Wk 2', rate: 74.8 }],
      anomalies: []
    },
    
    academic: {
      cgpa: 7.85,
      lastSemGPA: 7.90,
      cohortAvgCGPA: 8.05,
      backlogs: 0,
      scholarship: 'None',
      scholarshipAtRisk: false,
      courses: [
        { code: 'AI501', name: 'Deep Learning', attendance: 75, internalMark: 38, maxInternal: 50, status: 'good' },
      ],
      gpaHistory: []
    },
    
    aiDiagnosis: {
      primaryFactor: 'Mild dip due to single sick day; recovering rapidly',
      confidence: 90.0,
      riskCascadePrediction: 'High recovery probability. Will cross 76% with next 2 attended sessions.',
      featureWeights: [],
      recommendedPlan: ['Automated gentle nudge sent']
    },

    interventionHistory: [],
    hallTicketStatus: 'ELIGIBLE',
    feeStatus: 'PAID',
  }
];

export const AUTOMATION_RULES = [
  {
    id: 'RULE-01',
    code: 'ATT_CRIT_01',
    name: 'Critical Attendance Drop (<65%) Intervention Flow',
    description: 'When student aggregate or subject attendance falls below 65%, immediately execute multi-channel alerts and schedule mentor intervention.',
    category: 'Attendance & Compliance',
    status: 'ACTIVE',
    triggerCount: 42,
    successRate: 94.2,
    conditions: [
      { field: 'Attendance Rate', operator: '<', value: '65.0%' },
      { field: 'Consecutive Absence', operator: '>=', value: '3 Classes' }
    ],
    actionChain: [
      { step: 1, action: 'Ingest Real-Time Biometric / LMS Sync', delay: 'Instant' },
      { step: 2, action: 'Execute AI Root-Cause Diagnostic & Risk Cascade Analysis', delay: '+100ms' },
      { step: 3, action: 'Dispatch Empathetic WhatsApp & Email Notice with Recovery Simulator link', delay: '+300ms' },
      { step: 4, action: 'Auto-Schedule 1-on-1 Mentoring Meeting & Reserve Faculty Calendar', delay: '+600ms' },
      { step: 5, action: 'Start 72-Hour Escalation Watchdog Timer for HOD Escalation', delay: '+900ms' }
    ]
  },
  {
    id: 'RULE-02',
    code: 'ACAD_DIP_02',
    name: 'Midterm Mark Crash & Assignment Default Protocol',
    description: 'Identifies sudden >25% score drops in core STEM courses and pairs student with high-performing Peer Tutors before backlog risk cascades.',
    category: 'Academic Performance',
    status: 'ACTIVE',
    triggerCount: 29,
    successRate: 88.5,
    conditions: [
      { field: 'Internal Assessment Mark', operator: '<', value: '40%' },
      { field: 'Assignment Overdue', operator: '>=', value: '2 Submissions' }
    ],
    actionChain: [
      { step: 1, action: 'Grade Gateway Anomaly Detection', delay: 'Instant' },
      { step: 2, action: 'Calculate Concept Deficit & Topic Breakdown', delay: '+150ms' },
      { step: 3, action: 'Auto-Match with Peer Tutor Leader', delay: '+400ms' },
      { step: 4, action: 'Send Academic Advisor Summary Packet', delay: '+700ms' }
    ]
  },
  {
    id: 'RULE-03',
    code: 'SCHOLAR_RISK_03',
    name: 'Merit Scholarship Safeguard & Aid Review',
    description: 'Triggers proactive financial and academic safety net when scholarship recipient approaches within 0.3 GPA of disqualification threshold.',
    category: 'Financial & Equity',
    status: 'ACTIVE',
    triggerCount: 16,
    successRate: 96.0,
    conditions: [
      { field: 'CGPA Margin to Cutoff', operator: '<', value: '0.30 GPA' },
      { field: 'Has Active Scholarship', operator: '==', value: 'TRUE' }
    ],
    actionChain: [
      { step: 1, action: 'Identify At-Risk Scholarship Cohort', delay: 'Instant' },
      { step: 2, action: 'Notify Financial Aid Counselor for Emergency Buffer', delay: '+200ms' },
      { step: 3, action: 'Generate Custom Course Weight Re-balancing Plan', delay: '+500ms' }
    ]
  },
  {
    id: 'RULE-04',
    code: 'LAB_DEBAR_04',
    name: 'Laboratory Practicals Debarment Warning',
    description: 'Flags consecutive laboratory session absences that threaten mandatory statutory university lab completion rules.',
    category: 'Lab & Practicals',
    status: 'ACTIVE',
    triggerCount: 35,
    successRate: 91.0,
    conditions: [
      { field: 'Lab Attendance', operator: '<', value: '70%' },
      { field: 'Consecutive Lab Misses', operator: '>=', value: '2 Sessions' }
    ],
    actionChain: [
      { step: 1, action: 'Trigger Lab In-Charge Alert', delay: 'Instant' },
      { step: 2, action: 'Auto-Allocate Make-Up Practicals Slot', delay: '+300ms' }
    ]
  }
];

export const SIMULATION_SCENARIOS = [
  {
    id: 'SCEN_01',
    title: 'Scenario A: Rahul\'s Sudden Attendance Dip to 63%',
    subtitle: 'Monday Morning Lab Misses + Debarment Risk',
    studentId: 'STU-101',
    studentName: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    description: 'Simulates biometric turnstile record where Rahul misses 3rd consecutive DBMS Lab, triggering threshold breach from 68% down to 63.2%.',
    triggerPayload: {
      event: 'BIOMETRIC_ANOMALY_RECORDED',
      attendanceDelta: '-5.2%',
      newAttendance: '63.2%',
      consecutiveMisses: 3,
      course: 'CS502 - Database Management Systems Lab'
    },
    aiDiagnosisSummary: 'High risk of practical exam debarment. Identified hostel out-gate anomaly on Mondays. Risk cascade velocity: +32% failure likelihood.',
    whatsappMessagePreview: '👋 Hi Rahul, EduFlow noticed you missed DBMS Lab this morning (Overall: 63.2%). University rules require 75% for hall ticket clearance. Dr. Sarah Chen has scheduled a brief friendly check-in for tomorrow at 3:00 PM to help you recover your attendance with 7 make-up sessions. View your custom recovery plan: https://eduflow.edu/r/cs2023-042',
    mentorTask: 'Conduct 1-on-1 diagnostic with Rahul Sharma regarding Monday transport/hostel blockers and assign make-up lab journals.',
    escalationDeadlineHours: 72
  },

  {
    id: 'SCEN_02',
    title: 'Scenario B: Ananya\'s Midterm Mark Crash & Assignment Default',
    subtitle: 'Algorithms Dip to 32% + Scholarship Threat',
    studentId: 'STU-102',
    studentName: 'Ananya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    description: 'Simulates LMS grade push where Ananya scores 16/50 (32%) in Design & Analysis of Algorithms midterm with 2 overdue programming sprints.',
    triggerPayload: {
      event: 'GRADE_GATEWAY_SUBMISSION_LOW',
      course: 'CS501 - Design & Analysis of Algorithms',
      score: '16 / 50 (32%)',
      overdueCount: 2,
      previousAvg: '84.5%'
    },
    aiDiagnosisSummary: 'Sudden concept blockage in Dynamic Programming. Risk of losing Tier-B Merit Scholarship.',
    whatsappMessagePreview: '👋 Hi Ananya, EduFlow detected an unexpected drop in your CS501 Midterm. Don\'t worry — we\'ve paired you with Peer Tutor Karthik Iyer for a quick weekend concept booster session to safeguard your Merit Scholarship standing.',
    mentorTask: 'Review CS501 concept mastery breakdown and coordinate with Peer Tutor Lead.',
    escalationDeadlineHours: 48
  },

  {
    id: 'SCEN_03',
    title: 'Scenario C: Vikram\'s Merit Scholarship Threshold Breach',
    subtitle: 'CGPA 6.94 vs 7.50 Cutoff + Overdue Dues',
    studentId: 'STU-103',
    studentName: 'Vikram Reddy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Simulates institutional grade audit where Vikram\'s cumulative GPA dips to 6.94, breaching the 7.50 cutoff for State Merit Aid.',
    triggerPayload: {
      event: 'SCHOLARSHIP_MARGIN_BREACH',
      currentCGPA: '6.94',
      requiredCutoff: '7.50',
      scholarship: 'State Merit Tier A ($2,400/yr)',
      financialAidReviewNeeded: true
    },
    aiDiagnosisSummary: 'Multivariate risk: Core course difficulty in Reinforcement Learning compounded by fee installment stress.',
    whatsappMessagePreview: '⚠️ Important Notice: Vikram, your current CGPA of 6.94 is near the State Merit renewal threshold (7.50). An emergency academic support counselor is ready to assist you in formulating a credit booster strategy.',
    mentorTask: 'Urgent meeting with Financial Aid officer & Academic advisor to initiate emergency grade recovery pathway.',
    escalationDeadlineHours: 96
  }
];

export const DEAN_METRICS = {
  overallRetentionRate: 96.8,
  retentionChangeYoY: '+2.4%',
  avgInterventionResolutionDays: 4.8,
  totalInterventionsThisSemester: 148,
  resolvedCount: 125,
  escalatedToDean: 6,
  inProgress: 17,
  debarmentReductionRate: '-34%',
  
  departmentRiskBreakdown: [
    { department: 'CSE', highRisk: 14, moderateRisk: 28, onTrack: 378, total: 420 },
    { department: 'AI&DS', highRisk: 8, moderateRisk: 18, onTrack: 254, total: 280 },
    { department: 'ECE', highRisk: 19, moderateRisk: 34, onTrack: 307, total: 360 },
    { department: 'MECH', highRisk: 12, moderateRisk: 24, onTrack: 274, total: 310 },
  ],

  resolutionVelocityTrends: [
    { week: 'Wk 1', autoTriggered: 18, mentorResolved: 16, avgDays: 3.2 },
    { week: 'Wk 2', autoTriggered: 24, mentorResolved: 21, avgDays: 4.1 },
    { week: 'Wk 3', autoTriggered: 32, mentorResolved: 28, avgDays: 4.5 },
    { week: 'Wk 4', autoTriggered: 29, mentorResolved: 26, avgDays: 4.8 },
    { week: 'Wk 5', autoTriggered: 35, mentorResolved: 30, avgDays: 5.2 },
    { week: 'Wk 6', autoTriggered: 22, mentorResolved: 19, avgDays: 4.6 },
  ],

  mentorLeaderboard: [
    { name: 'Dr. Sarah Chen', dept: 'CSE', mentees: 32, resolved: 18, responseRate: '98%', avgTime: '3.2 hrs', status: 'Exemplary' },
    { name: 'Dr. Kavita Narayanan', dept: 'AI&DS', mentees: 30, resolved: 15, responseRate: '96%', avgTime: '2.8 hrs', status: 'Exemplary' },
    { name: 'Prof. David Reynolds', dept: 'ECE', mentees: 28, resolved: 12, responseRate: '89%', avgTime: '5.1 hrs', status: 'Good' },
    { name: 'Dr. Vikram Malhotra', dept: 'MECH', mentees: 26, resolved: 10, responseRate: '84%', avgTime: '6.4 hrs', status: 'Attention Needed' },
  ]
};
