import { useState } from "react";

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────
const USERS = {
  admin: { email: "admin@college.edu", password: "admin123", name: "Dr. R. Sharma", role: "admin" },
  faculty: { email: "faculty@college.edu", password: "faculty123", name: "Prof. A. Mehta", role: "faculty", dept: "Computer Science", empId: "FAC2024" },
  student: { email: "student@college.edu", password: "student123", name: "Arjun Krishnan", role: "student", rollNo: "CS21B042", dept: "Computer Science", sem: "6th", attendance: 68, cgpa: 8.4, leavesLeft: 3 },
};

const STUDENTS = [
  { id: 1, name: "Arjun Krishnan", roll: "CS21B042", dept: "CS", sem: "6", attendance: 68, cgpa: 8.4 },
  { id: 2, name: "Priya Nair", roll: "CS21B043", dept: "CS", sem: "6", attendance: 82, cgpa: 9.1 },
  { id: 3, name: "Rahul Varma", roll: "CS21B044", dept: "CS", sem: "6", attendance: 75, cgpa: 7.8 },
  { id: 4, name: "Sneha Pillai", roll: "CS21B045", dept: "CS", sem: "6", attendance: 91, cgpa: 9.6 },
  { id: 5, name: "Karthik Bose", roll: "CS21B046", dept: "CS", sem: "6", attendance: 55, cgpa: 6.9 },
  { id: 6, name: "Meera Joshi", roll: "ME21B012", dept: "ME", sem: "4", attendance: 88, cgpa: 8.2 },
];

const FACULTY_LIST = [
  { id: 1, name: "Prof. A. Mehta", empId: "FAC2024", dept: "CS", subjects: "DBMS, OS", attendance: 96 },
  { id: 2, name: "Dr. S. Iyer", empId: "FAC2019", dept: "CS", subjects: "DS, Algorithms", attendance: 92 },
  { id: 3, name: "Prof. R. Kumar", empId: "FAC2021", dept: "ME", subjects: "Thermodynamics", attendance: 88 },
  { id: 4, name: "Dr. P. Singh", empId: "FAC2018", dept: "ECE", subjects: "Digital Electronics", attendance: 95 },
];

const TIMETABLE = [
  { day: "Monday", periods: ["DBMS (9-10)", "OS (10-11)", "Break", "Algorithms (11-12)", "Lab (2-4)"] },
  { day: "Tuesday", periods: ["Networks (9-10)", "DBMS (10-11)", "Break", "OS Lab (11-1)", "—"] },
  { day: "Wednesday", periods: ["Algorithms (9-10)", "Maths (10-11)", "Break", "DBMS (11-12)", "Library (2-3)"] },
  { day: "Thursday", periods: ["OS (9-10)", "Networks (10-11)", "Break", "Project (11-1)", "—"] },
  { day: "Friday", periods: ["Maths (9-10)", "Seminar (10-11)", "Break", "Algorithms (11-12)", "Sports (2-4)"] },
];

const INTERNAL_MARKS = [
  { subject: "DBMS", ia1: 22, ia2: 24, ia3: 21, max: 25 },
  { subject: "Operating Systems", ia1: 18, ia2: 20, ia3: 23, max: 25 },
  { subject: "Computer Networks", ia1: 21, ia2: 19, ia2b: 22, max: 25 },
  { subject: "Algorithms", ia1: 24, ia2: 23, ia3: 22, max: 25 },
  { subject: "Mathematics III", ia1: 20, ia2: 18, ia3: 21, max: 25 },
];

const SEM_MARKS = [
  { subject: "Data Structures", internal: 45, external: 68, total: 113, max: 150, grade: "A" },
  { subject: "Computer Architecture", internal: 42, external: 71, total: 113, max: 150, grade: "A" },
  { subject: "Discrete Mathematics", internal: 38, external: 62, total: 100, max: 150, grade: "B+" },
  { subject: "Digital Electronics", internal: 47, external: 74, total: 121, max: 150, grade: "A+" },
  { subject: "Python Programming", internal: 44, external: 69, total: 113, max: 150, grade: "A" },
];

const ATTENDANCE_DETAIL = [
  { subject: "DBMS", total: 45, present: 29, absent: 16, pct: 64 },
  { subject: "Operating Systems", total: 40, present: 32, absent: 8, pct: 80 },
  { subject: "Computer Networks", total: 38, present: 26, absent: 12, pct: 68 },
  { subject: "Algorithms", total: 42, present: 36, absent: 6, pct: 86 },
  { subject: "Mathematics III", total: 35, present: 24, absent: 11, pct: 69 },
];

const ACTIVITIES = [
  { id: 1, name: "Annual Tech Fest - TechSurge 2025", date: "2025-03-22", status: "Upcoming", type: "Technical" },
  { id: 2, name: "Sports Day - Inter-Department", date: "2025-03-15", status: "Upcoming", type: "Sports" },
  { id: 3, name: "Guest Lecture: AI & Future Careers", date: "2025-03-10", status: "Pending", type: "Academic" },
  { id: 4, name: "Alumni Interaction Meet", date: "2025-03-28", status: "Upcoming", type: "Cultural" },
  { id: 5, name: "Workshop: Cloud Computing", date: "2025-02-28", status: "Completed", type: "Technical" },
];

const LEAVES = [
  { id: 1, student: "Arjun Krishnan", roll: "CS21B042", from: "2025-03-05", to: "2025-03-06", reason: "Medical", status: "Approved" },
  { id: 2, student: "Priya Nair", roll: "CS21B043", from: "2025-03-10", to: "2025-03-10", reason: "OD - Hackathon", status: "Pending" },
  { id: 3, student: "Karthik Bose", roll: "CS21B046", from: "2025-03-12", to: "2025-03-14", reason: "Family Emergency", status: "Pending" },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0f1e3c;
    --navy-light: #1a2f5a;
    --navy-lighter: #243d6e;
    --amber: #f5a623;
    --amber-light: #fbbf47;
    --cream: #faf8f4;
    --slate: #64748b;
    --slate-light: #94a3b8;
    --white: #ffffff;
    --border: #e2e8f0;
    --red: #ef4444;
    --green: #10b981;
    --blue: #3b82f6;
    --purple: #8b5cf6;
    --shadow: 0 4px 24px rgba(15,30,60,0.10);
    --shadow-sm: 0 2px 8px rgba(15,30,60,0.07);
    --radius: 14px;
    --radius-sm: 8px;
    --sidebar-w: 260px;
    --sidebar-collapsed: 72px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: #1a2035; }

  /* LOGIN */
  .login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-lighter) 60%, #1a3a6e 100%);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    position: relative; overflow: hidden;
  }
  .login-page::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .login-hero { text-align: center; margin-bottom: 40px; }
  .login-hero .shield {
    width: 64px; height: 64px;
    background: var(--amber);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    font-size: 28px;
    box-shadow: 0 8px 24px rgba(245,166,35,0.4);
  }
  .login-hero h1 { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--white); letter-spacing: -0.5px; }
  .login-hero p { color: rgba(255,255,255,0.55); font-size: 0.9rem; margin-top: 6px; }

  .role-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 32px; }
  .role-card {
    padding: 20px 16px; border-radius: var(--radius); cursor: pointer;
    border: 2px solid transparent; background: rgba(255,255,255,0.06);
    transition: all 0.25s ease; text-align: center; color: var(--white);
  }
  .role-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
  .role-card.active { border-color: var(--amber); background: rgba(245,166,35,0.12); }
  .role-card .role-icon { font-size: 2rem; margin-bottom: 8px; }
  .role-card .role-name { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }

  .login-form-box {
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--radius);
    padding: 32px;
    width: 100%; max-width: 420px;
    margin: 0 auto;
  }
  .login-form-box h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--white); margin-bottom: 24px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; color: rgba(255,255,255,0.65); font-size: 0.8rem; font-weight: 500; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-group input {
    width: 100%; padding: 12px 14px; border-radius: var(--radius-sm);
    border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08);
    color: var(--white); font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    transition: border-color 0.2s;
  }
  .form-group input::placeholder { color: rgba(255,255,255,0.3); }
  .form-group input:focus { outline: none; border-color: var(--amber); }
  .login-btn {
    width: 100%; padding: 13px; border-radius: var(--radius-sm); border: none;
    background: var(--amber); color: var(--navy); font-weight: 700; font-size: 1rem;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; margin-top: 8px;
    box-shadow: 0 4px 16px rgba(245,166,35,0.35);
  }
  .login-btn:hover { background: var(--amber-light); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,166,35,0.45); }
  .login-error { color: #fca5a5; font-size: 0.85rem; margin-top: 10px; text-align: center; }
  .login-hint { color: rgba(255,255,255,0.35); font-size: 0.75rem; margin-top: 16px; text-align: center; line-height: 1.6; }

  .login-wrapper { width: 100%; max-width: 500px; position: relative; z-index: 1; }

  /* DASHBOARD LAYOUT */
  .dash-layout { display: flex; min-height: 100vh; }

  .sidebar {
    width: var(--sidebar-w); min-height: 100vh;
    background: var(--navy);
    display: flex; flex-direction: column;
    transition: width 0.3s ease;
    flex-shrink: 0; position: relative; z-index: 100;
  }
  .sidebar.collapsed { width: var(--sidebar-collapsed); }
  .sidebar-top {
    padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; gap: 12px;
  }
  .sidebar-logo {
    width: 38px; height: 38px; background: var(--amber); border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .sidebar-title { font-family: 'Playfair Display', serif; color: var(--white); font-size: 1.05rem; white-space: nowrap; overflow: hidden; }
  .sidebar-title span { display: block; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 400; text-transform: uppercase; letter-spacing: 1px; }

  .sidebar-user {
    padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; gap: 10px;
  }
  .user-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--amber), #e08020);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: var(--navy); font-size: 0.9rem; flex-shrink: 0;
  }
  .user-info { overflow: hidden; }
  .user-info .uname { color: var(--white); font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-info .urole { color: rgba(255,255,255,0.4); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; }

  .sidebar-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
  .nav-section-label { color: rgba(255,255,255,0.25); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 10px 6px; font-weight: 600; }
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: var(--radius-sm); cursor: pointer;
    color: rgba(255,255,255,0.6); font-size: 0.88rem; font-weight: 400;
    transition: all 0.2s; margin-bottom: 2px; white-space: nowrap; overflow: hidden;
  }
  .nav-item:hover { background: rgba(255,255,255,0.08); color: var(--white); }
  .nav-item.active { background: rgba(245,166,35,0.15); color: var(--amber); font-weight: 600; }
  .nav-item .nav-icon { font-size: 1.1rem; flex-shrink: 0; width: 22px; text-align: center; }
  .nav-item .nav-label { overflow: hidden; text-overflow: ellipsis; }

  .sidebar-bottom { padding: 12px 8px; border-top: 1px solid rgba(255,255,255,0.07); }
  .collapse-btn {
    width: 100%; display: flex; align-items: center; gap: 12px; padding: 10px 12px;
    border-radius: var(--radius-sm); border: none; background: transparent;
    color: rgba(255,255,255,0.4); cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem; transition: all 0.2s; white-space: nowrap; overflow: hidden;
  }
  .collapse-btn:hover { background: rgba(255,255,255,0.06); color: var(--white); }

  /* MAIN CONTENT */
  .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    height: 64px; background: var(--white); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 28px;
    justify-content: space-between; flex-shrink: 0;
    box-shadow: var(--shadow-sm);
  }
  .topbar-left h2 { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: var(--navy); }
  .topbar-left p { color: var(--slate); font-size: 0.8rem; margin-top: 1px; }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .topbar-badge {
    background: var(--navy); color: var(--white); border-radius: 8px;
    padding: 6px 14px; font-size: 0.8rem; font-weight: 600; cursor: pointer;
  }
  .logout-btn {
    padding: 8px 16px; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    background: transparent; color: var(--slate); cursor: pointer; font-size: 0.85rem;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s; font-weight: 500;
  }
  .logout-btn:hover { border-color: var(--red); color: var(--red); }

  .page-body { flex: 1; overflow-y: auto; padding: 28px; background: var(--cream); }

  /* CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 20px; margin-bottom: 28px; }
  .stat-card {
    background: var(--white); border-radius: var(--radius); padding: 22px;
    box-shadow: var(--shadow-sm); border: 1px solid var(--border);
    position: relative; overflow: hidden; transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }
  .stat-card .sc-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; margin-bottom: 14px;
  }
  .stat-card .sc-val { font-size: 1.9rem; font-weight: 700; color: var(--navy); font-family: 'Playfair Display', serif; }
  .stat-card .sc-label { color: var(--slate); font-size: 0.82rem; font-weight: 500; margin-top: 2px; }
  .stat-card .sc-sub { color: var(--slate-light); font-size: 0.75rem; margin-top: 6px; }
  .stat-card::after {
    content: ''; position: absolute; right: -20px; top: -20px;
    width: 80px; height: 80px; border-radius: 50%;
    opacity: 0.06;
  }

  /* SECTION */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--navy); }
  .section-sub { color: var(--slate); font-size: 0.8rem; margin-top: 2px; }

  /* TABLE */
  .table-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow-sm); overflow: hidden; }
  .table-card table { width: 100%; border-collapse: collapse; }
  .table-card th { background: #f8fafc; padding: 12px 16px; text-align: left; font-size: 0.75rem; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); }
  .table-card td { padding: 13px 16px; border-bottom: 1px solid var(--border); font-size: 0.87rem; color: #334155; }
  .table-card tr:last-child td { border-bottom: none; }
  .table-card tr:hover td { background: #f8fafc; }

  /* BADGES */
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 0.73rem; font-weight: 600; }
  .badge-green { background: #d1fae5; color: #065f46; }
  .badge-red { background: #fee2e2; color: #991b1b; }
  .badge-amber { background: #fef3c7; color: #92400e; }
  .badge-blue { background: #dbeafe; color: #1e40af; }
  .badge-purple { background: #ede9fe; color: #5b21b6; }
  .badge-slate { background: #f1f5f9; color: #475569; }

  /* ALERT */
  .alert { padding: 14px 18px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; align-items: flex-start; gap: 12px; font-size: 0.88rem; font-weight: 500; }
  .alert-warning { background: #fef3c7; border: 1px solid #fbbf24; color: #92400e; }
  .alert-danger { background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; }
  .alert-success { background: #d1fae5; border: 1px solid #6ee7b7; color: #065f46; }
  .alert-info { background: #dbeafe; border: 1px solid #93c5fd; color: #1e40af; }

  /* FORM */
  .form-card { background: var(--white); border-radius: var(--radius); padding: 28px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
  .form-card h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--navy); margin-bottom: 22px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  .form-row.single { grid-template-columns: 1fr; }
  .form-group2 { display: flex; flex-direction: column; gap: 6px; }
  .form-group2 label { font-size: 0.8rem; font-weight: 600; color: var(--slate); text-transform: uppercase; letter-spacing: 0.4px; }
  .form-group2 input, .form-group2 select, .form-group2 textarea {
    padding: 10px 13px; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: #334155;
    transition: border-color 0.2s; background: #fff;
  }
  .form-group2 input:focus, .form-group2 select:focus, .form-group2 textarea:focus { outline: none; border-color: var(--navy); }
  .form-group2 textarea { resize: vertical; min-height: 90px; }
  .btn-primary {
    padding: 11px 24px; border-radius: var(--radius-sm); border: none;
    background: var(--navy); color: var(--white); font-weight: 600; font-size: 0.9rem;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(15,30,60,0.2);
  }
  .btn-primary:hover { background: var(--navy-lighter); transform: translateY(-1px); }
  .btn-secondary {
    padding: 10px 22px; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    background: transparent; color: var(--slate); font-weight: 500; font-size: 0.9rem;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
    margin-left: 10px;
  }
  .btn-secondary:hover { border-color: var(--navy); color: var(--navy); }
  .btn-danger {
    padding: 7px 16px; border-radius: var(--radius-sm); border: 1.5px solid #fca5a5;
    background: transparent; color: var(--red); font-size: 0.82rem; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-danger:hover { background: #fee2e2; }
  .btn-sm {
    padding: 6px 14px; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    background: transparent; color: var(--slate); font-size: 0.8rem; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .btn-sm:hover { border-color: var(--navy); color: var(--navy); }

  /* ATTENDANCE BAR */
  .att-bar-wrap { background: #e2e8f0; border-radius: 4px; height: 8px; overflow: hidden; }
  .att-bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }

  /* UPLOAD ZONE */
  .upload-zone {
    border: 2px dashed var(--border); border-radius: var(--radius); padding: 40px;
    text-align: center; cursor: pointer; transition: all 0.2s;
  }
  .upload-zone:hover { border-color: var(--navy); background: #f8fafc; }
  .upload-zone .uz-icon { font-size: 2.5rem; margin-bottom: 12px; }
  .upload-zone p { color: var(--slate); font-size: 0.9rem; }
  .upload-zone span { color: var(--navy); font-weight: 600; }

  /* TIMETABLE */
  .tt-grid { display: grid; grid-template-columns: 110px repeat(5,1fr); border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); background: var(--white); box-shadow: var(--shadow-sm); }
  .tt-cell { padding: 12px 10px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); font-size: 0.8rem; }
  .tt-header { background: var(--navy); color: var(--white); font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .tt-day { background: #f8fafc; font-weight: 700; color: var(--navy); font-size: 0.82rem; }
  .tt-period { color: #334155; line-height: 1.3; }
  .tt-break { color: var(--slate-light); font-style: italic; text-align: center; background: #fafafa; }

  /* CGPA RING */
  .cgpa-ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .cgpa-ring-wrap .cgpa-val { font-size: 1.8rem; font-weight: 700; font-family: 'Playfair Display', serif; color: var(--navy); }
  .cgpa-ring-wrap .cgpa-label { font-size: 0.78rem; color: var(--slate); font-weight: 500; }

  /* WELCOME CARD */
  .welcome-card {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-lighter) 100%);
    border-radius: var(--radius); padding: 28px 32px; margin-bottom: 24px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 8px 32px rgba(15,30,60,0.2);
  }
  .welcome-card h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--white); }
  .welcome-card p { color: rgba(255,255,255,0.6); font-size: 0.88rem; margin-top: 6px; }
  .welcome-card .wc-right { text-align: right; }
  .welcome-card .wc-date { color: rgba(255,255,255,0.5); font-size: 0.8rem; }
  .welcome-card .wc-sem { color: var(--amber); font-weight: 700; font-size: 0.9rem; }

  /* GRID HELPERS */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .mt-20 { margin-top: 20px; }
  .mt-28 { margin-top: 28px; }
  .mb-16 { margin-bottom: 16px; }
  .gap-12 { gap: 12px; }
  .flex { display: flex; }
  .flex-center { display: flex; align-items: center; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }
  .tag { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; background: var(--cream); color: var(--slate); border: 1px solid var(--border); }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }
  .text-slate { color: var(--slate); font-size: 0.85rem; }
  .success-toast {
    position: fixed; bottom: 28px; right: 28px; background: var(--navy); color: var(--white);
    padding: 14px 22px; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500;
    box-shadow: var(--shadow); z-index: 9999; animation: slideUp 0.3s ease;
    display: flex; align-items: center; gap: 10px;
  }
  @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function initials(name) { return name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase(); }
function attColor(pct) { return pct >= 75 ? "var(--green)" : "var(--red)"; }
function attBadge(pct) { return pct >= 75 ? "badge-green" : "badge-red"; }

function Toast({ msg, onClose }) {
  useState(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); });
  return <div className="success-toast"><span>✅</span>{msg}</div>;
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const roles = [
    { id: "admin", label: "Admin", icon: "🛡️" },
    { id: "faculty", label: "Faculty", icon: "👨‍🏫" },
    { id: "student", label: "Student", icon: "🎓" },
  ];

  const hints = { admin: "admin@college.edu / admin123", faculty: "faculty@college.edu / faculty123", student: "student@college.edu / student123" };

  function handleLogin() {
    const u = USERS[role];
    if (email === u.email && pass === u.password) { setErr(""); onLogin(u); }
    else setErr("Invalid credentials. Please try again.");
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-hero">
          <div className="shield">🎓</div>
          <h1>EduPortal</h1>
          <p>Integrated Academic Management System</p>
        </div>
        <div className="role-cards">
          {roles.map(r => (
            <div key={r.id} className={`role-card${role === r.id ? " active" : ""}`} onClick={() => { setRole(r.id); setErr(""); setEmail(""); setPass(""); }}>
              <div className="role-icon">{r.icon}</div>
              <div className="role-name">{r.label}</div>
            </div>
          ))}
        </div>
        <div className="login-form-box">
          <h2>{roles.find(r => r.id === role).icon} {roles.find(r => r.id === role).label} Login</h2>
          <div className="form-group">
            <label>Email / Username</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          <button className="login-btn" onClick={handleLogin}>Sign In →</button>
          {err && <p className="login-error">⚠️ {err}</p>}
          <p className="login-hint">Demo credentials: {hints[role]}</p>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ user, navItems, active, onNav, collapsed, onToggle }) {
  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-logo">🎓</div>
        {!collapsed && <div className="sidebar-title">EduPortal <span>Academic System</span></div>}
      </div>
      <div className="sidebar-user">
        <div className="user-avatar">{initials(user.name)}</div>
        {!collapsed && <div className="user-info"><div className="uname">{user.name}</div><div className="urole">{user.role}</div></div>}
      </div>
      <nav className="sidebar-nav">
        {!collapsed && <div className="nav-section-label">Navigation</div>}
        {navItems.map(item => (
          <div key={item.id} className={`nav-item${active === item.id ? " active" : ""}`} onClick={() => onNav(item.id)} title={collapsed ? item.label : ""}>
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </div>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="collapse-btn" onClick={onToggle}>
          <span className="nav-icon">{collapsed ? "▶" : "◀"}</span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ title, sub, user, onLogout }) {
  const now = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="topbar">
      <div className="topbar-left"><h2>{title}</h2><p>{sub || now}</p></div>
      <div className="topbar-right">
        <span className="topbar-badge">{user.role.toUpperCase()}</span>
        <button className="logout-btn" onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, sub, color }) {
  return (
    <div className="stat-card">
      <div className="sc-icon" style={{ background: color + "18", color }}>{icon}</div>
      <div className="sc-val">{value}</div>
      <div className="sc-label">{label}</div>
      {sub && <div className="sc-sub">{sub}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ADMIN COMPONENTS
// ════════════════════════════════════════════════════════════════════════════════
function AdminHome() {
  return (
    <div>
      <div className="stats-grid">
        <StatCard icon="🎓" value="1,248" label="Total Students" sub="↑ 32 from last sem" color="var(--blue)" />
        <StatCard icon="👨‍🏫" value="86" label="Total Faculty" sub="12 departments" color="var(--purple)" />
        <StatCard icon="📅" value="5" label="Upcoming Activities" sub="Next: Tech Fest Mar 22" color="var(--amber)" />
        <StatCard icon="⏳" value="3" label="Pending Approvals" sub="Requires attention" color="var(--red)" />
      </div>
      <div className="grid-2">
        <div>
          <div className="section-header"><div><div className="section-title">Recent Students</div><div className="section-sub">Latest enrollments</div></div></div>
          <div className="table-card">
            <table>
              <thead><tr><th>Name</th><th>Roll No</th><th>Dept</th><th>Att%</th></tr></thead>
              <tbody>{STUDENTS.slice(0,4).map(s => (
                <tr key={s.id}><td>{s.name}</td><td><code style={{fontSize:'0.8rem'}}>{s.roll}</code></td><td>{s.dept}</td>
                  <td><span className={`badge ${attBadge(s.attendance)}`}>{s.attendance}%</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-header"><div><div className="section-title">Activities</div><div className="section-sub">All scheduled events</div></div></div>
          <div className="table-card">
            <table>
              <thead><tr><th>Event</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>{ACTIVITIES.slice(0,4).map(a => (
                <tr key={a.id}><td style={{maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.name}</td><td style={{whiteSpace:'nowrap'}}>{a.date}</td>
                  <td><span className={`badge ${a.status==='Upcoming'?'badge-blue':a.status==='Pending'?'badge-amber':'badge-green'}`}>{a.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddStudents({ onToast }) {
  const [form, setForm] = useState({ name:"", roll:"", dept:"", sem:"", email:"", phone:"", dob:"", gender:"", address:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  function submit() { onToast("Student added successfully!"); setForm({ name:"",roll:"",dept:"",sem:"",email:"",phone:"",dob:"",gender:"",address:"" }); }
  return (
    <div className="form-card">
      <h3>➕ Add New Student</h3>
      <div className="form-row"><div className="form-group2"><label>Full Name</label><input name="name" value={form.name} onChange={handle} placeholder="e.g. Arjun Krishnan"/></div><div className="form-group2"><label>Roll Number</label><input name="roll" value={form.roll} onChange={handle} placeholder="e.g. CS21B042"/></div></div>
      <div className="form-row"><div className="form-group2"><label>Department</label><select name="dept" value={form.dept} onChange={handle}><option value="">Select</option><option>CS</option><option>ME</option><option>ECE</option><option>Civil</option><option>EEE</option></select></div><div className="form-group2"><label>Semester</label><select name="sem" value={form.sem} onChange={handle}><option value="">Select</option>{[1,2,3,4,5,6,7,8].map(s=><option key={s}>{s}</option>)}</select></div></div>
      <div className="form-row"><div className="form-group2"><label>Email</label><input name="email" value={form.email} onChange={handle} placeholder="student@college.edu"/></div><div className="form-group2"><label>Phone</label><input name="phone" value={form.phone} onChange={handle} placeholder="9876543210"/></div></div>
      <div className="form-row"><div className="form-group2"><label>Date of Birth</label><input type="date" name="dob" value={form.dob} onChange={handle}/></div><div className="form-group2"><label>Gender</label><select name="gender" value={form.gender} onChange={handle}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div></div>
      <div className="form-row single"><div className="form-group2"><label>Address</label><textarea name="address" value={form.address} onChange={handle} placeholder="Full address..."/></div></div>
      <div style={{marginTop:8}}><button className="btn-primary" onClick={submit}>Add Student</button><button className="btn-secondary" onClick={()=>setForm({name:"",roll:"",dept:"",sem:"",email:"",phone:"",dob:"",gender:"",address:""})}>Reset</button></div>
    </div>
  );
}

function RemoveStudents({ onToast }) {
  const [list, setList] = useState(STUDENTS);
  const [search, setSearch] = useState("");
  function remove(id) { setList(l=>l.filter(s=>s.id!==id)); onToast("Student removed successfully!"); }
  const filtered = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="form-card" style={{marginBottom:20}}>
        <div className="flex-between">
          <h3 style={{marginBottom:0,paddingBottom:0,borderBottom:'none'}}>🗑️ Remove Students</h3>
          <input placeholder="Search by name or roll..." style={{padding:'8px 13px',borderRadius:'var(--radius-sm)',border:'1.5px solid var(--border)',fontFamily:'DM Sans,sans-serif',fontSize:'0.88rem',width:240}} value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>Name</th><th>Roll No</th><th>Dept</th><th>Semester</th><th>Attendance</th><th>Action</th></tr></thead>
          <tbody>{filtered.map(s=>(
            <tr key={s.id}><td>{s.name}</td><td><code style={{fontSize:'0.8rem'}}>{s.roll}</code></td><td>{s.dept}</td><td>Sem {s.sem}</td>
              <td><span className={`badge ${attBadge(s.attendance)}`}>{s.attendance}%</span></td>
              <td><button className="btn-danger" onClick={()=>remove(s.id)}>Remove</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AddFaculty({ onToast }) {
  const [form, setForm] = useState({ name:"", empId:"", dept:"", subjects:"", email:"", phone:"", qual:"", exp:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  function submit() { onToast("Faculty member added successfully!"); setForm({ name:"",empId:"",dept:"",subjects:"",email:"",phone:"",qual:"",exp:"" }); }
  return (
    <div className="form-card">
      <h3>➕ Add New Faculty</h3>
      <div className="form-row"><div className="form-group2"><label>Full Name</label><input name="name" value={form.name} onChange={handle} placeholder="e.g. Prof. A. Mehta"/></div><div className="form-group2"><label>Employee ID</label><input name="empId" value={form.empId} onChange={handle} placeholder="e.g. FAC2025"/></div></div>
      <div className="form-row"><div className="form-group2"><label>Department</label><select name="dept" value={form.dept} onChange={handle}><option value="">Select</option><option>CS</option><option>ME</option><option>ECE</option><option>Civil</option><option>EEE</option></select></div><div className="form-group2"><label>Subjects Handling</label><input name="subjects" value={form.subjects} onChange={handle} placeholder="e.g. DBMS, OS"/></div></div>
      <div className="form-row"><div className="form-group2"><label>Email</label><input name="email" value={form.email} onChange={handle} placeholder="faculty@college.edu"/></div><div className="form-group2"><label>Phone</label><input name="phone" value={form.phone} onChange={handle} placeholder="9876543210"/></div></div>
      <div className="form-row"><div className="form-group2"><label>Qualification</label><input name="qual" value={form.qual} onChange={handle} placeholder="e.g. Ph.D, M.Tech"/></div><div className="form-group2"><label>Experience (Years)</label><input name="exp" value={form.exp} onChange={handle} placeholder="e.g. 8"/></div></div>
      <div style={{marginTop:8}}><button className="btn-primary" onClick={submit}>Add Faculty</button><button className="btn-secondary" onClick={()=>setForm({name:"",empId:"",dept:"",subjects:"",email:"",phone:"",qual:"",exp:""})}>Reset</button></div>
    </div>
  );
}

function RemoveFaculty({ onToast }) {
  const [list, setList] = useState(FACULTY_LIST);
  function remove(id) { setList(l=>l.filter(f=>f.id!==id)); onToast("Faculty removed successfully!"); }
  return (
    <div className="table-card">
      <table>
        <thead><tr><th>Name</th><th>Emp ID</th><th>Dept</th><th>Subjects</th><th>Attendance</th><th>Action</th></tr></thead>
        <tbody>{list.map(f=>(
          <tr key={f.id}><td>{f.name}</td><td><code style={{fontSize:'0.8rem'}}>{f.empId}</code></td><td>{f.dept}</td><td style={{maxWidth:160}}>{f.subjects}</td>
            <td><span className={`badge ${f.attendance>=75?'badge-green':'badge-red'}`}>{f.attendance}%</span></td>
            <td><button className="btn-danger" onClick={()=>remove(f.id)}>Remove</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function ManageTimetable() {
  return (
    <div>
      <div className="section-header mb-16"><div><div className="section-title">📅 Manage Timetables</div><div className="section-sub">View and edit class schedules</div></div><button className="btn-primary" style={{fontSize:'0.82rem',padding:'9px 18px'}}>+ Add Period</button></div>
      <div className="tt-grid">
        <div className="tt-cell tt-header">Day / Period</div>
        {["Period 1","Period 2","Break","Period 3","Period 4"].map(p=><div key={p} className="tt-cell tt-header">{p}</div>)}
        {TIMETABLE.map(row=>[
          <div key={row.day} className="tt-cell tt-day">{row.day}</div>,
          ...row.periods.map((p,i)=><div key={i} className={`tt-cell ${p==="Break"?"tt-break":"tt-period"}`}>{p}</div>)
        ])}
      </div>
    </div>
  );
}

function StudentAttReport() {
  return (
    <div>
      <div className="section-header mb-16"><div><div className="section-title">📊 Student Attendance Reports</div><div className="section-sub">All students — current semester</div></div></div>
      <div className="table-card">
        <table>
          <thead><tr><th>Name</th><th>Roll No</th><th>Dept</th><th>Sem</th><th>Attendance %</th><th>Status</th></tr></thead>
          <tbody>{STUDENTS.map(s=>(
            <tr key={s.id}>
              <td>{s.name}</td><td><code style={{fontSize:'0.8rem'}}>{s.roll}</code></td><td>{s.dept}</td><td>Sem {s.sem}</td>
              <td style={{minWidth:160}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div className="att-bar-wrap" style={{flex:1}}><div className="att-bar-fill" style={{width:s.attendance+'%',background:attColor(s.attendance)}}/></div>
                  <span style={{minWidth:36,fontSize:'0.82rem',fontWeight:600,color:attColor(s.attendance)}}>{s.attendance}%</span>
                </div>
              </td>
              <td><span className={`badge ${attBadge(s.attendance)}`}>{s.attendance>=75?"Regular":"Detained Risk"}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function FacultyAttReport() {
  return (
    <div>
      <div className="section-header mb-16"><div><div className="section-title">📊 Faculty Attendance Reports</div><div className="section-sub">Current academic year</div></div></div>
      <div className="table-card">
        <table>
          <thead><tr><th>Name</th><th>Emp ID</th><th>Department</th><th>Subjects</th><th>Attendance %</th></tr></thead>
          <tbody>{FACULTY_LIST.map(f=>(
            <tr key={f.id}><td>{f.name}</td><td><code style={{fontSize:'0.8rem'}}>{f.empId}</code></td><td>{f.dept}</td><td>{f.subjects}</td>
              <td style={{minWidth:160}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div className="att-bar-wrap" style={{flex:1}}><div className="att-bar-fill" style={{width:f.attendance+'%',background:attColor(f.attendance)}}/></div>
                  <span style={{minWidth:36,fontSize:'0.82rem',fontWeight:600,color:attColor(f.attendance)}}>{f.attendance}%</span>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function ManageActivities({ onToast }) {
  const [form, setForm] = useState({ name:"", date:"", type:"", desc:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  function submit() { onToast("Activity/Event added!"); setForm({name:"",date:"",type:"",desc:""}); }
  return (
    <div>
      <div className="form-card" style={{marginBottom:24}}>
        <h3>🎉 Create Activity / Event</h3>
        <div className="form-row"><div className="form-group2"><label>Event Name</label><input name="name" value={form.name} onChange={handle} placeholder="e.g. Annual Tech Fest"/></div><div className="form-group2"><label>Date</label><input type="date" name="date" value={form.date} onChange={handle}/></div></div>
        <div className="form-row single"><div className="form-group2"><label>Type</label><select name="type" value={form.type} onChange={handle}><option value="">Select type</option><option>Technical</option><option>Cultural</option><option>Sports</option><option>Academic</option><option>Other</option></select></div></div>
        <div className="form-row single"><div className="form-group2"><label>Description</label><textarea name="desc" value={form.desc} onChange={handle} placeholder="Brief description..."/></div></div>
        <button className="btn-primary" onClick={submit}>Create Event</button>
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>Event</th><th>Date</th><th>Type</th><th>Status</th></tr></thead>
          <tbody>{ACTIVITIES.map(a=>(
            <tr key={a.id}><td>{a.name}</td><td>{a.date}</td><td><span className="tag">{a.type}</span></td>
              <td><span className={`badge ${a.status==='Upcoming'?'badge-blue':a.status==='Pending'?'badge-amber':'badge-green'}`}>{a.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function SendAnnouncements({ onToast }) {
  const [form, setForm] = useState({ title:"", target:"all", msg:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  function submit() { onToast("Announcement sent successfully!"); setForm({title:"",target:"all",msg:""}); }
  const past = [
    { title:"Semester End Exam Schedule Released", target:"All", date:"2025-03-01" },
    { title:"Holiday Announcement - Holi", target:"All", date:"2025-02-28" },
    { title:"Faculty Meeting - 10th March", target:"Faculty", date:"2025-02-25" },
  ];
  return (
    <div>
      <div className="form-card" style={{marginBottom:24}}>
        <h3>📢 Send Announcement</h3>
        <div className="form-row"><div className="form-group2"><label>Title</label><input name="title" value={form.title} onChange={handle} placeholder="Announcement title"/></div><div className="form-group2"><label>Target Audience</label><select name="target" value={form.target} onChange={handle}><option value="all">All</option><option value="students">Students Only</option><option value="faculty">Faculty Only</option></select></div></div>
        <div className="form-row single"><div className="form-group2"><label>Message</label><textarea name="msg" value={form.msg} onChange={handle} placeholder="Write your announcement here..." style={{minHeight:120}}/></div></div>
        <button className="btn-primary" onClick={submit}>📤 Send Announcement</button>
      </div>
      <div className="section-title mb-16" style={{marginBottom:12}}>Recent Announcements</div>
      <div className="table-card">
        <table>
          <thead><tr><th>Title</th><th>Target</th><th>Date</th></tr></thead>
          <tbody>{past.map((p,i)=><tr key={i}><td>{p.title}</td><td><span className="badge badge-blue">{p.target}</span></td><td>{p.date}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// FACULTY COMPONENTS
// ════════════════════════════════════════════════════════════════════════════════
function FacultyHome({ user }) {
  return (
    <div>
      <div className="welcome-card">
        <div><h2>Welcome, {user.name}!</h2><p>{user.dept} Department · Employee ID: {user.empId}</p></div>
        <div className="wc-right"><div className="wc-sem">AY 2024–25</div><div className="wc-date">Even Semester</div></div>
      </div>
      <div className="stats-grid">
        <StatCard icon="📚" value="4" label="Classes Handled" sub="DBMS, OS, Networks, Algorithms" color="var(--blue)" />
        <StatCard icon="✅" value="96%" label="My Attendance" sub="This semester" color="var(--green)" />
        <StatCard icon="📝" value="3" label="Pending Tasks" sub="Mark uploads, assignments" color="var(--amber)" />
        <StatCard icon="👥" value="180" label="Total Students" sub="Across all classes" color="var(--purple)" />
      </div>
      <div className="grid-2">
        <div>
          <div className="section-title mb-16" style={{marginBottom:12}}>Student Attendance Summary</div>
          <div className="table-card">
            <table>
              <thead><tr><th>Subject</th><th>Total</th><th>Present</th><th>Avg Att%</th></tr></thead>
              <tbody>
                {[{s:"DBMS",total:45,avg:74},{s:"OS",total:40,avg:82},{s:"Networks",total:38,avg:78},{s:"Algorithms",total:42,avg:88}].map((r,i)=>(
                  <tr key={i}><td>{r.s}</td><td>{r.total}</td><td>{Math.round(r.total*r.avg/100)}</td>
                    <td><span className={`badge ${attBadge(r.avg)}`}>{r.avg}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-title mb-16" style={{marginBottom:12}}>Pending Tasks</div>
          <div className="table-card">
            <table>
              <thead><tr><th>Task</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>
                {[{t:"Upload IA3 Marks - DBMS",d:"2025-03-12",s:"Overdue"},{t:"Create Assignment - OS",d:"2025-03-15",s:"Pending"},{t:"Upload Attendance - Networks",d:"2025-03-14",s:"Pending"}].map((r,i)=>(
                  <tr key={i}><td>{r.t}</td><td style={{whiteSpace:'nowrap'}}>{r.d}</td>
                    <td><span className={`badge ${r.s==='Overdue'?'badge-red':'badge-amber'}`}>{r.s}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadNotes({ onToast }) {
  const [form, setForm] = useState({ subject:"", unit:"", title:"", desc:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  function submit() { onToast("Notes uploaded successfully!"); }
  return (
    <div className="form-card">
      <h3>📁 Upload Notes</h3>
      <div className="form-row"><div className="form-group2"><label>Subject</label><select name="subject" value={form.subject} onChange={handle}><option value="">Select Subject</option><option>DBMS</option><option>Operating Systems</option><option>Computer Networks</option><option>Algorithms</option></select></div><div className="form-group2"><label>Unit</label><select name="unit" value={form.unit} onChange={handle}><option value="">Select Unit</option>{[1,2,3,4,5].map(u=><option key={u}>Unit {u}</option>)}</select></div></div>
      <div className="form-row single"><div className="form-group2"><label>Title</label><input name="title" value={form.title} onChange={handle} placeholder="e.g. ER Diagram and Normalization"/></div></div>
      <div className="form-row single"><div className="form-group2"><label>Description</label><textarea name="desc" value={form.desc} onChange={handle} placeholder="Brief description of the notes..."/></div></div>
      <div className="upload-zone" style={{marginBottom:20}}>
        <div className="uz-icon">📄</div>
        <p>Drag & drop your file here, or <span>browse files</span></p>
        <p style={{fontSize:'0.78rem',marginTop:6,color:'var(--slate-light)'}}>Supported: PDF, PPTX, DOCX (Max 50MB)</p>
      </div>
      <button className="btn-primary" onClick={submit}>Upload Notes</button>
    </div>
  );
}

function UploadAttendance({ onToast }) {
  const [subj, setSubj] = useState("DBMS");
  const [att, setAtt] = useState(STUDENTS.reduce((a,s)=>({...a,[s.id]:true}),{}));
  function submit() { onToast("Attendance uploaded successfully!"); }
  return (
    <div>
      <div className="form-card" style={{marginBottom:20}}>
        <h3 style={{marginBottom:16,paddingBottom:12,borderBottom:'1px solid var(--border)'}}>📋 Upload Student Attendance</h3>
        <div className="form-row"><div className="form-group2"><label>Subject</label><select value={subj} onChange={e=>setSubj(e.target.value)}><option>DBMS</option><option>Operating Systems</option><option>Computer Networks</option><option>Algorithms</option></select></div><div className="form-group2"><label>Date</label><input type="date" defaultValue="2025-03-09"/></div></div>
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>Roll No</th><th>Student Name</th><th>Present</th><th>Absent</th></tr></thead>
          <tbody>{STUDENTS.filter(s=>s.dept==='CS').map(s=>(
            <tr key={s.id}><td><code style={{fontSize:'0.8rem'}}>{s.roll}</code></td><td>{s.name}</td>
              <td><input type="radio" name={`att-${s.id}`} checked={att[s.id]} onChange={()=>setAtt({...att,[s.id]:true})}/></td>
              <td><input type="radio" name={`att-${s.id}`} checked={!att[s.id]} onChange={()=>setAtt({...att,[s.id]:false})}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div style={{marginTop:16}}><button className="btn-primary" onClick={submit}>Submit Attendance</button></div>
    </div>
  );
}

function UploadMarks({ onToast }) {
  const [form, setForm] = useState({ subject:"", exam:"" });
  function submit() { onToast("Marks uploaded successfully!"); }
  const marks = STUDENTS.filter(s=>s.dept==='CS').map(s=>({...s, m1:Math.floor(15+Math.random()*10)}));
  return (
    <div>
      <div className="form-card" style={{marginBottom:20}}>
        <h3 style={{marginBottom:16,paddingBottom:12,borderBottom:'1px solid var(--border)'}}>📝 Upload Test Marks</h3>
        <div className="form-row"><div className="form-group2"><label>Subject</label><select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}><option value="">Select</option><option>DBMS</option><option>OS</option><option>Networks</option><option>Algorithms</option></select></div><div className="form-group2"><label>Exam</label><select value={form.exam} onChange={e=>setForm({...form,exam:e.target.value})}><option value="">Select</option><option>IA1</option><option>IA2</option><option>IA3</option></select></div></div>
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>Roll No</th><th>Name</th><th>Marks (out of 25)</th></tr></thead>
          <tbody>{marks.map(s=>(
            <tr key={s.id}><td><code style={{fontSize:'0.8rem'}}>{s.roll}</code></td><td>{s.name}</td>
              <td><input type="number" min={0} max={25} defaultValue={s.m1} style={{width:70,padding:'6px 10px',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',fontFamily:'DM Sans,sans-serif'}}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div style={{marginTop:16}}><button className="btn-primary" onClick={submit}>Upload Marks</button></div>
    </div>
  );
}

function SendReminders({ onToast }) {
  const [form, setForm] = useState({ type:"", msg:"", to:"all" });
  function submit() { onToast("Reminder sent!"); setForm({type:"",msg:"",to:"all"}); }
  return (
    <div className="form-card">
      <h3>🔔 Send Reminders</h3>
      <div className="form-row"><div className="form-group2"><label>Reminder Type</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="">Select</option><option>Assignment Due</option><option>Exam Notice</option><option>Attendance Warning</option><option>General</option></select></div><div className="form-group2"><label>Send To</label><select value={form.to} onChange={e=>setForm({...form,to:e.target.value})}><option value="all">All Students</option><option value="low">Low Attendance Students</option></select></div></div>
      <div className="form-row single"><div className="form-group2"><label>Message</label><textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Write reminder message..." style={{minHeight:110}}/></div></div>
      <button className="btn-primary" onClick={submit}>📤 Send Reminder</button>
    </div>
  );
}

function CreateAssignments({ onToast }) {
  const [form, setForm] = useState({ subject:"", title:"", due:"", maxMarks:"", desc:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  const existing = [{title:"ER Diagram Design",sub:"DBMS",due:"2025-03-15",marks:10},{title:"Process Scheduling Simulation",sub:"OS",due:"2025-03-20",marks:15}];
  return (
    <div>
      <div className="form-card" style={{marginBottom:24}}>
        <h3>📌 Create Assignment</h3>
        <div className="form-row"><div className="form-group2"><label>Subject</label><select name="subject" value={form.subject} onChange={handle}><option value="">Select</option><option>DBMS</option><option>OS</option><option>Networks</option><option>Algorithms</option></select></div><div className="form-group2"><label>Max Marks</label><input name="maxMarks" value={form.maxMarks} onChange={handle} placeholder="e.g. 10"/></div></div>
        <div className="form-row single"><div className="form-group2"><label>Assignment Title</label><input name="title" value={form.title} onChange={handle} placeholder="e.g. ER Diagram and Normalization"/></div></div>
        <div className="form-row"><div className="form-group2"><label>Due Date</label><input type="date" name="due" value={form.due} onChange={handle}/></div><div style={{flex:1}}/></div>
        <div className="form-row single"><div className="form-group2"><label>Description</label><textarea name="desc" value={form.desc} onChange={handle} placeholder="Describe the assignment..."/></div></div>
        <button className="btn-primary" onClick={()=>onToast("Assignment created!")}>Create Assignment</button>
      </div>
      <div className="section-title" style={{marginBottom:12}}>Existing Assignments</div>
      <div className="table-card">
        <table><thead><tr><th>Title</th><th>Subject</th><th>Due Date</th><th>Max Marks</th></tr></thead>
          <tbody>{existing.map((a,i)=><tr key={i}><td>{a.title}</td><td>{a.sub}</td><td>{a.due}</td><td>{a.marks}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function CheckLeaveStatus() {
  return (
    <div>
      <div className="section-title" style={{marginBottom:16}}>🗒️ Student Leave / OD Requests</div>
      <div className="table-card">
        <table>
          <thead><tr><th>Student</th><th>Roll No</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{LEAVES.map(l=>(
            <tr key={l.id}><td>{l.student}</td><td><code style={{fontSize:'0.8rem'}}>{l.roll}</code></td><td>{l.from}</td><td>{l.to}</td><td>{l.reason}</td>
              <td><span className={`badge ${l.status==='Approved'?'badge-green':'badge-amber'}`}>{l.status}</span></td>
              <td style={{display:'flex',gap:6}}><button className="btn-sm" style={{background:'var(--green)',color:'#fff',border:'none',fontSize:'0.75rem'}}>Approve</button><button className="btn-sm" style={{background:'var(--red)',color:'#fff',border:'none',fontSize:'0.75rem'}}>Reject</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function ViewStudentList() {
  return (
    <div>
      <div className="section-title" style={{marginBottom:16}}>👥 Student List</div>
      <div className="table-card">
        <table>
          <thead><tr><th>Roll No</th><th>Name</th><th>Dept</th><th>Semester</th><th>Attendance</th><th>CGPA</th></tr></thead>
          <tbody>{STUDENTS.map(s=>(
            <tr key={s.id}><td><code style={{fontSize:'0.8rem'}}>{s.roll}</code></td><td>{s.name}</td><td>{s.dept}</td><td>Sem {s.sem}</td>
              <td><span className={`badge ${attBadge(s.attendance)}`}>{s.attendance}%</span></td><td><b>{s.cgpa}</b></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// STUDENT COMPONENTS
// ════════════════════════════════════════════════════════════════════════════════
function StudentHome({ user }) {
  const att = user.attendance;
  return (
    <div>
      <div className="welcome-card">
        <div><h2>Welcome back, {user.name.split(" ")[0]}! 👋</h2><p>{user.dept} · Roll No: {user.rollNo} · {user.sem} Semester</p></div>
        <div className="wc-right"><div className="wc-sem">AY 2024–25</div><div className="wc-date">Even Semester</div></div>
      </div>
      {att < 75 && <div className="alert alert-danger">⚠️ <b>Attendance Warning:</b> Your attendance is {att}%, which is below the required 75%. Please attend classes regularly to avoid detention.</div>}
      <div className="stats-grid">
        <StatCard icon="📊" value={att+"%"} label="Overall Attendance" sub={att>=75?"Above minimum":"Below required 75%"} color={att>=75?"var(--green)":"var(--red)"} />
        <StatCard icon="⭐" value={user.cgpa} label="CGPA" sub="Current semester" color="var(--amber)" />
        <StatCard icon="🏖️" value={user.leavesLeft} label="Leaves Remaining" sub="Out of 10 this semester" color="var(--blue)" />
        <StatCard icon="📅" value="5" label="Subjects" sub="Current semester" color="var(--purple)" />
      </div>
      <div className="grid-2">
        <div>
          <div className="section-title" style={{marginBottom:12}}>Subject-wise Attendance</div>
          <div className="table-card">
            <table><thead><tr><th>Subject</th><th>Present</th><th>Total</th><th>%</th></tr></thead>
              <tbody>{ATTENDANCE_DETAIL.map((a,i)=>(
                <tr key={i}><td>{a.subject}</td><td>{a.present}</td><td>{a.total}</td>
                  <td><span className={`badge ${attBadge(a.pct)}`}>{a.pct}%</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-title" style={{marginBottom:12}}>Internal Marks Summary</div>
          <div className="table-card">
            <table><thead><tr><th>Subject</th><th>IA1</th><th>IA2</th><th>IA3</th><th>Max</th></tr></thead>
              <tbody>{INTERNAL_MARKS.map((m,i)=>(
                <tr key={i}><td style={{maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.subject}</td><td>{m.ia1}</td><td>{m.ia2}</td><td>{m.ia3}</td><td><b>{m.max}</b></td></tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewTimetable() {
  return (
    <div>
      <div className="section-title" style={{marginBottom:16}}>🗓️ Weekly Timetable — Sem 6 CS</div>
      <div className="tt-grid">
        <div className="tt-cell tt-header">Day</div>
        {["9-10 AM","10-11 AM","Break","11-12 PM","2-4 PM"].map(p=><div key={p} className="tt-cell tt-header">{p}</div>)}
        {TIMETABLE.map(row=>[
          <div key={row.day} className="tt-cell tt-day">{row.day}</div>,
          ...row.periods.map((p,i)=><div key={i} className={`tt-cell ${p==="Break"?"tt-break":"tt-period"}`}>{p}</div>)
        ])}
      </div>
    </div>
  );
}

function ViewInternalMarks() {
  return (
    <div>
      <div className="section-title" style={{marginBottom:16}}>📝 Internal Assessment Marks</div>
      <div className="table-card">
        <table>
          <thead><tr><th>Subject</th><th>IA 1 (25)</th><th>IA 2 (25)</th><th>IA 3 (25)</th><th>Best 2 (50)</th><th>Status</th></tr></thead>
          <tbody>{INTERNAL_MARKS.map((m,i)=>{
            const best2 = [m.ia1,m.ia2,m.ia3].sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a+b,0);
            return (
              <tr key={i}><td>{m.subject}</td><td>{m.ia1}</td><td>{m.ia2}</td><td>{m.ia3}</td><td><b>{best2}/50</b></td>
                <td><span className={`badge ${best2>=25?'badge-green':'badge-red'}`}>{best2>=25?"Pass":"Fail"}</span></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

function ViewSemMarks() {
  const total = SEM_MARKS.reduce((a,s)=>a+s.total,0);
  const maxT = SEM_MARKS.reduce((a,s)=>a+s.max,0);
  return (
    <div>
      <div className="section-title" style={{marginBottom:16}}>🎓 Semester Marks — Semester 5</div>
      <div className="alert alert-success">📊 Total Score: <b>{total}/{maxT}</b> — Percentage: <b>{((total/maxT)*100).toFixed(1)}%</b> — SGPA: <b>8.4</b></div>
      <div className="table-card">
        <table>
          <thead><tr><th>Subject</th><th>Internal (50)</th><th>External (100)</th><th>Total (150)</th><th>Grade</th></tr></thead>
          <tbody>{SEM_MARKS.map((m,i)=>(
            <tr key={i}><td>{m.subject}</td><td>{m.internal}</td><td>{m.external}</td><td><b>{m.total}</b></td>
              <td><span className={`badge ${m.grade.includes('A')?'badge-green':'badge-blue'}`}>{m.grade}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function ApplyLeave({ onToast }) {
  const [form, setForm] = useState({ type:"Leave", from:"", to:"", reason:"", doc:"" });
  function handle(e) { setForm({...form,[e.target.name]:e.target.value}); }
  function submit() { onToast("Leave application submitted!"); setForm({type:"Leave",from:"",to:"",reason:"",doc:""}); }
  return (
    <div>
      <div className="stats-grid" style={{marginBottom:24}}>
        <StatCard icon="✅" value="7" label="Leaves Used" sub="Out of 10 total" color="var(--amber)" />
        <StatCard icon="🏖️" value="3" label="Leaves Remaining" sub="Current semester" color="var(--blue)" />
        <StatCard icon="🎗️" value="2" label="OD Availed" sub="This semester" color="var(--purple)" />
      </div>
      <div className="form-card" style={{marginBottom:24}}>
        <h3>📋 Apply for Leave / On Duty (OD)</h3>
        <div className="form-row"><div className="form-group2"><label>Type</label><select name="type" value={form.type} onChange={handle}><option>Leave</option><option>On Duty (OD)</option><option>Medical Leave</option></select></div><div style={{flex:1}}/></div>
        <div className="form-row"><div className="form-group2"><label>From Date</label><input type="date" name="from" value={form.from} onChange={handle}/></div><div className="form-group2"><label>To Date</label><input type="date" name="to" value={form.to} onChange={handle}/></div></div>
        <div className="form-row single"><div className="form-group2"><label>Reason</label><textarea name="reason" value={form.reason} onChange={handle} placeholder="Describe the reason for your leave/OD..." style={{minHeight:100}}/></div></div>
        <div className="form-row single"><div className="form-group2"><label>Supporting Document (if any)</label><div className="upload-zone" style={{padding:20}}><div className="uz-icon" style={{fontSize:'1.6rem',marginBottom:6}}>📎</div><p>Attach document <span>or browse</span></p></div></div></div>
        <button className="btn-primary" onClick={submit}>Submit Application</button>
      </div>
      <div className="section-title" style={{marginBottom:12}}>My Previous Applications</div>
      <div className="table-card">
        <table><thead><tr><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Leave</td><td>2025-03-05</td><td>2025-03-06</td><td>Medical</td><td><span className="badge badge-green">Approved</span></td></tr>
            <tr><td>OD</td><td>2025-02-15</td><td>2025-02-15</td><td>Hackathon</td><td><span className="badge badge-green">Approved</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailedAttendance() {
  return (
    <div>
      <div className="section-title" style={{marginBottom:16}}>📋 Detailed Attendance — Period-wise</div>
      {ATTENDANCE_DETAIL.map((sub,si)=>{
        const isLow = sub.pct < 75;
        return (
          <div key={si} style={{marginBottom:24}}>
            <div className="flex-between" style={{marginBottom:10}}>
              <div>
                <span style={{fontWeight:700,color:'var(--navy)',fontSize:'0.95rem'}}>{sub.subject}</span>
                <span style={{marginLeft:12,color:'var(--slate)',fontSize:'0.82rem'}}>Present: {sub.present}/{sub.total}</span>
              </div>
              <span className={`badge ${attBadge(sub.pct)}`}>{sub.pct}%</span>
            </div>
            {isLow && <div className="alert alert-warning" style={{marginBottom:10,padding:'10px 14px',fontSize:'0.82rem'}}>⚠️ Attendance below 75% — requires {Math.ceil(0.75*sub.total - sub.present)} more classes to meet minimum.</div>}
            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
              {Array.from({length:sub.total},(_,i)=>{
                const isPresent = i < sub.present;
                return <div key={i} style={{width:28,height:28,borderRadius:6,background:isPresent?'var(--green)':'var(--red)',opacity:0.8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.65rem',color:'#fff',fontWeight:700}} title={`Class ${i+1}: ${isPresent?'Present':'Absent'}`}>{i+1}</div>;
              })}
            </div>
            <div style={{display:'flex',gap:16,marginTop:8}}>
              <span style={{display:'flex',alignItems:'center',gap:5,fontSize:'0.75rem',color:'var(--slate)'}}><span style={{width:12,height:12,borderRadius:3,background:'var(--green)',display:'inline-block'}}/>Present</span>
              <span style={{display:'flex',alignItems:'center',gap:5,fontSize:'0.75rem',color:'var(--slate)'}}><span style={{width:12,height:12,borderRadius:3,background:'var(--red)',display:'inline-block'}}/>Absent</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// DASHBOARD SHELLS
// ════════════════════════════════════════════════════════════════════════════════
const ADMIN_NAV = [
  {id:"home",icon:"🏠",label:"Dashboard"},
  {id:"add-students",icon:"➕",label:"Add Students"},
  {id:"remove-students",icon:"🗑️",label:"Remove Students"},
  {id:"add-faculty",icon:"👨‍🏫",label:"Add Faculty"},
  {id:"remove-faculty",icon:"❌",label:"Remove Faculty"},
  {id:"timetable",icon:"📅",label:"Manage Timetables"},
  {id:"student-att",icon:"📊",label:"Student Attendance"},
  {id:"faculty-att",icon:"📈",label:"Faculty Attendance"},
  {id:"activities",icon:"🎉",label:"Activities / Events"},
  {id:"announcements",icon:"📢",label:"Announcements"},
];

const FACULTY_NAV = [
  {id:"home",icon:"🏠",label:"Dashboard"},
  {id:"upload-notes",icon:"📁",label:"Upload Notes"},
  {id:"upload-att",icon:"✅",label:"Upload Attendance"},
  {id:"upload-marks",icon:"📝",label:"Upload Test Marks"},
  {id:"reminders",icon:"🔔",label:"Send Reminders"},
  {id:"assignments",icon:"📌",label:"Create Assignments"},
  {id:"leave-status",icon:"🗒️",label:"Check Leave Status"},
  {id:"student-list",icon:"👥",label:"View Student List"},
];

const STUDENT_NAV = [
  {id:"home",icon:"🏠",label:"Dashboard"},
  {id:"timetable",icon:"🗓️",label:"View Timetable"},
  {id:"internal-marks",icon:"📝",label:"Internal Marks"},
  {id:"sem-marks",icon:"🎓",label:"Semester Marks"},
  {id:"apply-leave",icon:"📋",label:"Apply Leave / OD"},
  {id:"attendance",icon:"📊",label:"Detailed Attendance"},
];

function pageTitles(nav, active) {
  const item = nav.find(n => n.id === active);
  return item ? item.label : "Dashboard";
}

function AdminDashboard({ user, onLogout }) {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg) { setToast(msg); }
  function closeToast() { setToast(null); }

  function renderPage() {
    switch(active) {
      case "home": return <AdminHome/>;
      case "add-students": return <AddStudents onToast={showToast}/>;
      case "remove-students": return <RemoveStudents onToast={showToast}/>;
      case "add-faculty": return <AddFaculty onToast={showToast}/>;
      case "remove-faculty": return <RemoveFaculty onToast={showToast}/>;
      case "timetable": return <ManageTimetable/>;
      case "student-att": return <StudentAttReport/>;
      case "faculty-att": return <FacultyAttReport/>;
      case "activities": return <ManageActivities onToast={showToast}/>;
      case "announcements": return <SendAnnouncements onToast={showToast}/>;
      default: return <AdminHome/>;
    }
  }

  return (
    <div className="dash-layout">
      <Sidebar user={user} navItems={ADMIN_NAV} active={active} onNav={setActive} collapsed={collapsed} onToggle={()=>setCollapsed(c=>!c)}/>
      <div className="main-content">
        <Topbar title={pageTitles(ADMIN_NAV, active)} sub="Admin Panel — EduPortal" user={user} onLogout={onLogout}/>
        <div className="page-body">{renderPage()}</div>
      </div>
      {toast && <Toast msg={toast} onClose={closeToast}/>}
    </div>
  );
}

function FacultyDashboard({ user, onLogout }) {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState(null);

  function renderPage() {
    switch(active) {
      case "home": return <FacultyHome user={user}/>;
      case "upload-notes": return <UploadNotes onToast={setToast}/>;
      case "upload-att": return <UploadAttendance onToast={setToast}/>;
      case "upload-marks": return <UploadMarks onToast={setToast}/>;
      case "reminders": return <SendReminders onToast={setToast}/>;
      case "assignments": return <CreateAssignments onToast={setToast}/>;
      case "leave-status": return <CheckLeaveStatus/>;
      case "student-list": return <ViewStudentList/>;
      default: return <FacultyHome user={user}/>;
    }
  }

  return (
    <div className="dash-layout">
      <Sidebar user={user} navItems={FACULTY_NAV} active={active} onNav={setActive} collapsed={collapsed} onToggle={()=>setCollapsed(c=>!c)}/>
      <div className="main-content">
        <Topbar title={pageTitles(FACULTY_NAV, active)} sub="Faculty Portal — EduPortal" user={user} onLogout={onLogout}/>
        <div className="page-body">{renderPage()}</div>
      </div>
      {toast && <Toast msg={toast} onClose={()=>setToast(null)}/>}
    </div>
  );
}

function StudentDashboard({ user, onLogout }) {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState(null);

  function renderPage() {
    switch(active) {
      case "home": return <StudentHome user={user}/>;
      case "timetable": return <ViewTimetable/>;
      case "internal-marks": return <ViewInternalMarks/>;
      case "sem-marks": return <ViewSemMarks/>;
      case "apply-leave": return <ApplyLeave onToast={setToast}/>;
      case "attendance": return <DetailedAttendance/>;
      default: return <StudentHome user={user}/>;
    }
  }

  return (
    <div className="dash-layout">
      <Sidebar user={user} navItems={STUDENT_NAV} active={active} onNav={setActive} collapsed={collapsed} onToggle={()=>setCollapsed(c=>!c)}/>
      <div className="main-content">
        <Topbar title={pageTitles(STUDENT_NAV, active)} sub="Student Portal — EduPortal" user={user} onLogout={onLogout}/>
        <div className="page-body">{renderPage()}</div>
      </div>
      {toast && <Toast msg={toast} onClose={()=>setToast(null)}/>}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin(u) { setUser(u); }
  function handleLogout() { setUser(null); }

  return (
    <>
      <style>{css}</style>
      {!user && <LoginPage onLogin={handleLogin}/>}
      {user?.role === "admin" && <AdminDashboard user={user} onLogout={handleLogout}/>}
      {user?.role === "faculty" && <FacultyDashboard user={user} onLogout={handleLogout}/>}
      {user?.role === "student" && <StudentDashboard user={user} onLogout={handleLogout}/>}
    </>
  );
}
