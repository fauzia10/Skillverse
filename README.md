# SkillVerse

A modern Campus Digital Identity and Career Readiness platform for college students — featuring a live dashboard, profile manager, skills & badges showcase, assessments, career goal benchmarks, skill-gap analysis, interactive projects showcase with tech stack visualizations, certificates tracking, and progress metrics.


---

## 🌐 Live Demo

🔗 **Live Website:** [https://fauzia10.github.io/Skillverse/](https://fauzia10.github.io/Skillverse/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-SkillVerse-BA203B?style=for-the-badge&logo=githubpages&logoColor=white)](https://vercel.com/fauzia-s-projects/skillverse)
[![GitHub Repo](https://img.shields.io/badge/GitHub-fauzia10%2FSkillverse-101218?style=for-the-badge&logo=github&logoColor=white)](https://github.com/fauzia10/Skillverse)

---

## 🚀 Quick Start

Run the project directly in this directory:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit the local URL shown in your terminal (usually `http://localhost:5173`).

---

## 📁 Project Structure

```
skillverse-package/
├── package.json               # Dependencies & build scripts
├── vite.config.js             # Vite React configuration
├── tailwind.config.js         # Tailwind CSS theme & content paths
├── postcss.config.js          # PostCSS configuration
├── index.html                 # App entry HTML & Google Fonts
├── SkillVerse.jsx             # Original standalone single-file version (kept for reference)
└── src/
    ├── main.jsx               # React DOM root entry
    ├── App.jsx                # Core App layout & page routing
    ├── index.css              # Tailwind base, keyframes & animations
    ├── constants/
    │   ├── colors.js          # Palette tokens & chart colors
    │   └── navigation.js      # Navigation menu items & page titles
    ├── data/
    │   └── mockData.js        # Initial skills, projects, certificates & profile
    ├── components/
    │   ├── common/
    │   │   ├── Badges.jsx          # LevelBadge & PriorityBadge
    │   │   ├── Progress.jsx        # ProgressBar & CircularProgress
    │   │   ├── Card.jsx            # Bordered card container
    │   │   ├── SectionHeading.jsx  # Section titles with action slot
    │   │   ├── Toast.jsx           # Animated notification toast
    │   │   ├── Modal.jsx           # Accessible dialog modal
    │   │   ├── FormControls.jsx    # Inputs (Text, Area, Select, Buttons)
    │   │   └── Visuals.jsx         # Custom SVG graphics & project visuals
    │   ├── layout/
    │   │   ├── Sidebar.jsx         # Desktop hover-expand & mobile menu
    │   │   └── Header.jsx          # Top search and user profile bar
    │   ├── modals/
    │   │   ├── AddSkillModal.jsx   # Modal for creating skills
    │   │   └── AddProjectModal.jsx # Modal for adding portfolio projects
    │   └── projects/
    │       └── ProjectsShowcase.jsx# Interactive project tiles with hover tabs
    └── pages/
        ├── DashboardPage.jsx       # Main student dashboard
        ├── ProfilePage.jsx         # Profile editing & photo upload
        ├── SkillsPage.jsx          # Verified & unverified skills list
        ├── AssessmentsPage.jsx     # Skill tests & assessments
        ├── CareerGoalPage.jsx      # Target career selection
        ├── GapAnalysisPage.jsx     # Rule-based skill gap readiness table
        ├── ProjectsPage.jsx        # Complete projects list & modal
        ├── CertificatesPage.jsx    # Verified achievements & certificates
        ├── ProgressPage.jsx        # Growth tracking charts
        └── SettingsPage.jsx        # Settings placeholder
```

---

## 🛠️ Tech Stack

* **React 18** (Hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`)
* **Vite** (Next-generation frontend tooling)
* **Tailwind CSS** (Utility-first styling with custom palette)
* **Lucide React** (Modern, lightweight icons)
* **Recharts** (Composable charting library for growth metrics and tech-stack breakdowns)
