import {
  LayoutDashboard,
  User,
  Award,
  ClipboardCheck,
  Target,
  TrendingUp,
  FolderKanban,
  FileBadge,
  LineChart as LineChartIcon,
  Settings,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: User },
  { id: "skills", label: "Skills & Proof", icon: Award },
  { id: "assessments", label: "Proof Ledger", icon: ClipboardCheck },
  { id: "goal", label: "Career Goal", icon: Target },
  { id: "gap", label: "Skill Gap Analysis", icon: TrendingUp },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "certificates", label: "Certificates", icon: FileBadge },
  { id: "progress", label: "Progress", icon: LineChartIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

export const PAGE_TITLES = {
  dashboard: null,
  profile: "My Profile",
  skills: "Skills & Proof of Work",
  assessments: "Proof of Work & Practice Ledger",
  goal: "Career Goal",
  gap: "Skill Gap Analysis",
  projects: "Projects",
  certificates: "Certificates",
  progress: "Progress",
  settings: "Settings",
};
