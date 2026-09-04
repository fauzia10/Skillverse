import {
  Code2,
  FileText,
  BarChart3,
  TrendingUp,
  Sparkles,
  Cpu,
  Globe,
  Smartphone,
  Award,
  Terminal,
} from "lucide-react";

export function getSkillIcon(name = "") {
  const n = name.toLowerCase();
  if (n.includes("python") || n.includes("code") || n.includes("javascript") || n.includes("react") || n.includes("node") || n.includes("c++")) return Code2;
  if (n.includes("sql") || n.includes("dbms") || n.includes("database")) return FileText;
  if (n.includes("excel") || n.includes("tableau") || n.includes("power bi") || n.includes("chart")) return BarChart3;
  if (n.includes("stat") || n.includes("trend") || n.includes("data analysis") || n.includes("analytics")) return TrendingUp;
  if (n.includes("comm") || n.includes("speak") || n.includes("presentation") || n.includes("lead")) return Sparkles;
  if (n.includes("problem") || n.includes("logic") || n.includes("ai") || n.includes("ml") || n.includes("cpu") || n.includes("algorithm")) return Cpu;
  if (n.includes("web") || n.includes("html") || n.includes("css") || n.includes("network")) return Globe;
  if (n.includes("mobile") || n.includes("app") || n.includes("android") || n.includes("ios") || n.includes("iot")) return Smartphone;
  return Award;
}

export function getSkillProof(skillName = "", projects = [], certificates = []) {
  const norm = skillName.toLowerCase().trim();
  const matchedProjects = projects.filter((p) =>
    (p.skills || []).some(
      (s) => s.toLowerCase().trim() === norm || norm.includes(s.toLowerCase().trim()) || s.toLowerCase().includes(norm)
    )
  );

  const matchedCertificates = certificates.filter((c) =>
    (c.skills || []).some(
      (s) => s.toLowerCase().trim() === norm || norm.includes(s.toLowerCase().trim()) || s.toLowerCase().includes(norm)
    ) || (c.title && c.title.toLowerCase().includes(norm))
  );

  return {
    projects: matchedProjects,
    certificates: matchedCertificates,
    hasProof: matchedProjects.length > 0 || matchedCertificates.length > 0,
    primarySource: matchedProjects.length > 0
      ? { type: "project", title: matchedProjects[0].title }
      : matchedCertificates.length > 0
      ? { type: "certificate", title: matchedCertificates[0].title }
      : null,
  };
}

export const INITIAL_SKILLS = [
  { id: 1, name: "Python", level: "Intermediate", verified: true, proofType: "project", proofTitle: "Customer Churn Analysis" },
  { id: 2, name: "SQL", level: "Beginner", verified: true, proofType: "project", proofTitle: "Customer Churn Analysis" },
  { id: 3, name: "Excel", level: "Advanced", verified: true, proofType: "certificate", proofTitle: "Google Data Analytics Certificate" },
  { id: 4, name: "Data Analysis", level: "Intermediate", verified: true, proofType: "certificate", proofTitle: "Google Data Analytics Certificate" },
  { id: 5, name: "Communication", level: "Advanced", verified: false },
  { id: 6, name: "Problem Solving", level: "Intermediate", verified: false },
  { id: 7, name: "JavaScript", level: "Beginner", verified: true, proofType: "project", proofTitle: "Expense Tracker" },
];

export const GAP_DATA = [
  { skill: "SQL", current: "Beginner", required: "Intermediate", curVal: 1, reqVal: 2 },
  { skill: "Data Visualization", current: "Beginner", required: "Intermediate", curVal: 1, reqVal: 2 },
  { skill: "Statistics", current: "Beginner", required: "Intermediate", curVal: 1, reqVal: 2 },
  { skill: "Python", current: "Intermediate", required: "Intermediate", curVal: 2, reqVal: 2 },
  { skill: "Communication", current: "Advanced", required: "Intermediate", curVal: 3, reqVal: 2 },
];

export function gapPriority(cur, req) {
  const diff = req - cur;
  if (diff >= 2) return "High";
  if (diff === 1) return "Medium";
  return "Ready";
}

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Customer Churn Analysis",
    category: "Other",
    skills: ["Python", "Pandas", "SQL", "Power BI"],
    description:
      "Analyzed customer behavior data to identify churn patterns and generate actionable business insights.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "churn",
    usage: [
      { name: "Python", value: 42 },
      { name: "SQL", value: 28 },
      { name: "Pandas", value: 18 },
      { name: "Power BI", value: 12 },
    ],
  },
  {
    id: 2,
    title: "Expense Tracker",
    category: "App",
    skills: ["React", "JavaScript", "Firebase"],
    description:
      "A personal finance application for recording expenses, tracking budgets, and visualizing monthly spending.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "expense",
    usage: [
      { name: "React", value: 48 },
      { name: "JavaScript", value: 32 },
      { name: "Firebase", value: 20 },
    ],
  },
  {
    id: 3,
    title: "Campus Connect",
    category: "Website",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
    description:
      "A student community platform for discovering events, announcements, clubs, and campus opportunities.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "campus",
    usage: [
      { name: "JavaScript", value: 34 },
      { name: "Node.js", value: 26 },
      { name: "HTML", value: 22 },
      { name: "CSS", value: 18 },
    ],
  },
  {
    id: 4,
    title: "Smart Irrigation System",
    category: "Hardware",
    skills: ["Arduino", "IoT", "Soil Moisture Sensors", "C++"],
    description:
      "An IoT-based system that monitors soil conditions and automatically controls water delivery.",
    github: "https://github.com/",
    demo: "https://example.com/",
    visual: "irrigation",
    usage: [
      { name: "C++", value: 38 },
      { name: "Arduino", value: 30 },
      { name: "IoT", value: 20 },
      { name: "Soil Sensors", value: 12 },
    ],
  },
];

export const INITIAL_CERTIFICATES = [
  {
    id: 1,
    title: "Google Data Analytics Professional Certificate",
    org: "Coursera · Google",
    date: "Jan 2026",
    verified: true,
    credentialId: "GDA-89241-SV",
    skills: ["Data Cleaning", "R Programming", "SQL", "Tableau", "Spreadsheets"],
    description: "Demonstrated hands-on proficiency in data cleaning, exploratory analysis, visualization, and actionable business storytelling.",
    verificationUrl: "https://coursera.org/verify/GDA-89241-SV",
  },
  {
    id: 2,
    title: "Joy of Computing using Python",
    org: "NPTEL · IIT Madras",
    date: "Nov 2025",
    verified: true,
    credentialId: "NPTEL-CS-58219",
    skills: ["Python", "Algorithms", "Data Processing", "Object Oriented Programming"],
    description: "Completed comprehensive computer science foundations covering logic, algorithms, and computational problem solving in Python.",
    verificationUrl: "https://nptel.ac.in/verify/NPTEL-CS-58219",
  },
  {
    id: 3,
    title: "Applied Machine Learning & Deep Learning Workshop",
    org: "ABC University",
    date: "Aug 2025",
    verified: false,
    credentialId: "ABC-ML-2025-084",
    skills: ["Supervised Learning", "Scikit-Learn", "Neural Networks"],
    description: "3-day intensive hands-on lab covering regression, decision trees, cross-validation, and introductory neural networks.",
    verificationUrl: "https://abc.edu/credentials/ABC-ML-2025-084",
  },
];

export const PROGRESS_DATA = [
  { month: "September", score: 61 },
  { month: "October", score: 65 },
  { month: "November", score: 68 },
  { month: "December", score: 72 },
  { month: "January", score: 76 },
  { month: "February", score: 78 },
  { month: "March", score: 82 },
];

export const BADGE_PROGRESSION = [
  { skill: "SQL", from: "Beginner", to: "Intermediate" },
  { skill: "Python", from: "Beginner", to: "Intermediate" },
  { skill: "Excel", from: "Intermediate", to: "Advanced" },
  { skill: "Data Analysis", from: "Beginner", to: "Intermediate" },
];

export const CAREER_OPTIONS = [
  "Data Analyst",
  "Software Developer",
  "AI/ML Engineer",
  "Web Developer",
  "Business Analyst",
  "UI/UX Designer",
  "Cloud Solutions Architect",
];

export const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Management Systems (DBMS)",
  "Applied Statistics & Probability",
  "Machine Learning Foundations",
  "Object Oriented Programming",
  "Full Stack Web Development",
];

export const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
    <rect width='96' height='96' rx='48' fill='#E7EEEE'/>
    <circle cx='48' cy='38' r='17' fill='#315C61'/>
    <path d='M14 90c4-22 22-32 34-32s30 10 34 32' fill='#315C61'/>
  </svg>`);

export const INITIAL_PROFILE = {
  name: "Rahul Sharma",
  college: "ABC University",
  degree: "B.Tech",
  department: "Computer Science",
  year: "3rd Year · Semester 5",
  location: "Bengaluru, India",
  email: "rahul.sharma@example.edu",
  studentId: "CS2023-8942",
  bio: "Aspiring software developer & data analyst passionate about building resilient systems and turning raw data into actionable insight.",
  cgpa: "8.2",
  achievements: "Dean's List — Semester 4; Runner-up, Inter-college Data Hackathon 2025; Lead Organizer of TechFest Data Track.",
  careerGoal: "Data Analyst",
  github: "https://github.com/rahul-sharma",
  githubUsername: "rahul-sharma",
  githubRepos: 18,
  githubContributions: 342,
  leetcode: "https://leetcode.com/u/rahul_codes",
  leetcodeUsername: "rahul_codes",
  leetcodeSolved: 428,
  leetcodeRating: 1845,
  leetcodeEasy: 160,
  leetcodeMedium: 215,
  leetcodeHard: 53,
  codeforces: "https://codeforces.com/profile/rahul_sharma",
  codeforcesHandle: "rahul_sharma",
  codeforcesRating: 1492,
  codeforcesRank: "Specialist",
  linkedin: "https://linkedin.com/in/rahul-sharma-dev",
};

export const DEFAULT_SETTINGS = {
  notifications: {
    emailDigests: true,
    assessmentReminders: true,
    projectMilestones: true,
    readinessAlerts: false,
  },
  privacy: {
    publicPortfolio: true,
    recruiterSearch: true,
    showReadinessScores: true,
    shareProjectsPublicly: true,
  },
  appearance: {
    theme: "light",
    compactCards: false,
    enableAnimations: true,
  },
};

/* ============================================================
   SKILL ASSESSMENT QUESTIONS BANK
   ============================================================ */
export const ASSESSMENT_QUESTIONS = {
  Python: [
    {
      id: 1,
      question: "Which of the following is the correct syntax for a list comprehension that squares all even numbers from a list `nums`?",
      options: [
        "[x**2 for x in nums if x % 2 == 0]",
        "[x**2 if x % 2 == 0 for x in nums]",
        "nums.map(lambda x: x**2 if x % 2 == 0)",
        "[for x in nums if x % 2 == 0: x**2]",
      ],
      correct: 0,
      explanation: "In Python list comprehensions, condition filters come after the `for` iteration loop: `[expr for item in iterable if condition]`.",
    },
    {
      id: 2,
      question: "What is the time complexity of looking up a key in a standard Python dictionary (average case)?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correct: 2,
      explanation: "Python dictionaries are implemented as hash tables, providing O(1) average time complexity for key lookups.",
    },
    {
      id: 3,
      question: "Which pandas method is used to remove duplicate rows from a DataFrame?",
      options: ["df.remove_duplicates()", "df.drop_duplicates()", "df.distinct()", "df.unique()"],
      correct: 1,
      explanation: "`df.drop_duplicates()` returns a DataFrame with duplicate rows removed.",
    },
    {
      id: 4,
      question: "What does the `*args` syntax in a Python function definition allow?",
      options: [
        "Passing a variable number of keyword arguments",
        "Passing a variable number of non-keyword positional arguments",
        "Enforcing type annotations on parameters",
        "Exporting all local variables to global scope",
      ],
      correct: 1,
      explanation: "`*args` collects arbitrary positional arguments into a tuple, while `**kwargs` collects keyword arguments into a dictionary.",
    },
  ],
  SQL: [
    {
      id: 1,
      question: "Which SQL clause is used to filter aggregated group results produced by GROUP BY?",
      options: ["WHERE", "HAVING", "ORDER BY", "QUALIFY"],
      correct: 1,
      explanation: "`HAVING` filters results after aggregation (`GROUP BY`), whereas `WHERE` filters rows before grouping.",
    },
    {
      id: 2,
      question: "What is the difference between `UNION` and `UNION ALL`?",
      options: [
        "`UNION` combines columns; `UNION ALL` combines rows",
        "`UNION` removes duplicate rows; `UNION ALL` includes all duplicates",
        "`UNION ALL` removes duplicates; `UNION` preserves them",
        "There is no functional difference in modern SQL databases",
      ],
      correct: 1,
      explanation: "`UNION` runs a deduplication step to return distinct rows, while `UNION ALL` directly concatenates rows, making it faster.",
    },
    {
      id: 3,
      question: "Which JOIN type returns all records from the left table and matching records from the right table?",
      options: ["INNER JOIN", "RIGHT JOIN", "LEFT OUTER JOIN", "CROSS JOIN"],
      correct: 2,
      explanation: "A `LEFT OUTER JOIN` (or `LEFT JOIN`) includes all rows from the left table, with NULLs for unmatched rows from the right table.",
    },
    {
      id: 4,
      question: "Which window function assigns a unique sequential integer to each row within a partition, without ties?",
      options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "NTILE()"],
      correct: 2,
      explanation: "`ROW_NUMBER()` always assigns consecutive unique integers regardless of duplicate ordering values.",
    },
  ],
  Excel: [
    {
      id: 1,
      question: "What is the primary advantage of `XLOOKUP` over traditional `VLOOKUP`?",
      options: [
        "It can search to the left of the lookup column and defaults to exact match",
        "It only works with sorted data",
        "It requires less memory by avoiding matrix formulas",
        "It can only be used on numerical values",
      ],
      correct: 0,
      explanation: "`XLOOKUP` looks up in any direction (left or right), does not require column index numbers, and defaults to exact match.",
    },
    {
      id: 2,
      question: "Which formula calculates the sum of cells in range `D2:D100` only where `A2:A100` equals 'Electronics' and `B2:B100` is greater than 50?",
      options: [
        "=SUMIF(D2:D100, A2:A100, 'Electronics')",
        "=SUMIFS(D2:D100, A2:A100, 'Electronics', B2:B100, '>50')",
        "=COUNTIFS(D2:D100, 'Electronics', B2:B100, '>50')",
        "=SUM(FILTER(D2:D100, A2:A100 == 'Electronics' AND B2:B100 > 50))",
      ],
      correct: 1,
      explanation: "The syntax for `SUMIFS` is `=SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2], ...)`.",
    },
    {
      id: 3,
      question: "What feature allows you to summarize and analyze large datasets interactively by dragging fields into Rows, Columns, and Values?",
      options: ["Power Query", "Pivot Tables", "Goal Seek", "Conditional Formatting"],
      correct: 1,
      explanation: "Pivot Tables are Excel's core interactive summarization tool for aggregating and cross-tabulating large volumes of data.",
    },
    {
      id: 4,
      question: "Which keyboard shortcut locks cell references as absolute (adds `$` signs) in Excel formulas?",
      options: ["F2", "F4", "Ctrl + Shift + L", "Alt + Enter"],
      correct: 1,
      explanation: "Pressing `F4` cycles through absolute and relative cell referencing (e.g. `A1`, `$A$1`, `A$1`, `$A1`).",
    },
  ],
  "Data Analysis": [
    {
      id: 1,
      question: "What is the key difference between Correlation and Causation in exploratory data analysis?",
      options: [
        "Correlation implies that one variable directly drives changes in the other",
        "Correlation indicates a statistical relationship, but does not prove one variable causes the other",
        "Causation is always measured on a scale between -1.0 and +1.0",
        "Correlation only applies to qualitative nominal variables",
      ],
      correct: 1,
      explanation: "A high correlation shows two variables move together, but confounders or reverse causality may exist without true causation.",
    },
    {
      id: 2,
      question: "Which chart is most effective for visualizing the distribution, spread, and outliers of a continuous numerical variable?",
      options: ["Pie Chart", "Box Plot (Box & Whisker)", "Stacked Bar Chart", "Donut Chart"],
      correct: 1,
      explanation: "Box plots display the median, quartiles (IQR), and explicitly plot outliers beyond the whiskers.",
    },
    {
      id: 3,
      question: "When dealing with skewed data with extreme outliers, which measure of central tendency is most robust?",
      options: ["Arithmetic Mean", "Median", "Standard Deviation", "Variance"],
      correct: 1,
      explanation: "The median represents the 50th percentile and is not pulled by extreme high or low outlier values.",
    },
    {
      id: 4,
      question: "What step should usually be performed before applying machine learning algorithms to raw tabular data?",
      options: [
        "Exploratory Data Analysis (EDA) & Data Cleaning",
        "Immediate hyperparameter fine-tuning",
        "Deleting all numeric columns",
        "Disabling validation splits",
      ],
      correct: 0,
      explanation: "EDA and data cleaning (handling nulls, encoding, scaling) are essential prerequisites for reliable models.",
    },
  ],
  Communication: [
    {
      id: 1,
      question: "When presenting technical data findings to non-technical executive stakeholders, what is the best practice?",
      options: [
        "Present raw SQL queries and 50-row unformatted tables",
        "Focus on business impact, high-level actionable insights, and clear visual summaries",
        "Use heavy algorithmic jargon to demonstrate deep technical mastery",
        "Avoid providing any context or recommendations",
      ],
      correct: 1,
      explanation: "Executives need to know the 'so what'—how the insights impact key performance indicators, revenue, cost, or operational decisions.",
    },
    {
      id: 2,
      question: "What constitutes 'Active Listening' in collaborative team discussions?",
      options: [
        "Waiting for your turn to speak while preparing your rebuttal",
        "Fully concentrating, asking clarifying questions, paraphrasing, and withholding premature judgment",
        "Multitasking on code reviews during the meeting",
        "Nodding without understanding the context",
      ],
      correct: 1,
      explanation: "Active listening involves active comprehension, reflecting understanding back to the speaker, and seeking clarity.",
    },
    {
      id: 3,
      question: "What is the 'STAR' method commonly used for in behavioral communications and interviews?",
      options: [
        "Situation, Task, Action, Result",
        "System, Technology, Architecture, Roadmap",
        "Scope, Timeline, Allocation, Resource",
        "Strategy, Tactics, Analytics, Reporting",
      ],
      correct: 0,
      explanation: "The STAR method structures responses around Situation, Task, Action, and Result for clear narrative impact.",
    },
    {
      id: 4,
      question: "Which of the following describes effective constructive feedback?",
      options: [
        "General criticism given publicly months after the incident",
        "Specific, timely, actionable, and focused on behavior/work rather than personality",
        "Purely positive praise that hides all technical flaws",
        "Anonymous notes left on repository PRs with no actionable guidance",
      ],
      correct: 1,
      explanation: "Effective feedback is specific, timely, actionable, and objective.",
    },
  ],
  "Problem Solving": [
    {
      id: 1,
      question: "What is the '5 Whys' technique used for in root-cause analysis?",
      options: [
        "Assigning blame to team members",
        "Iteratively asking 'Why?' five times to drill down to the fundamental root cause of an issue",
        "Listing 5 separate alternative software frameworks",
        "Estimating sprint story points",
      ],
      correct: 1,
      explanation: "The 5 Whys method systematically peels back layers of symptoms to expose root problems in processes or systems.",
    },
    {
      id: 2,
      question: "Which algorithmic strategy breaks a complex problem into smaller independent subproblems, solves them, and combines their results?",
      options: ["Brute Force", "Divide and Conquer", "Greedy Algorithm", "Random Sampling"],
      correct: 1,
      explanation: "Divide and Conquer breaks down a problem into subproblems (e.g. Merge Sort, Binary Search).",
    },
    {
      id: 3,
      question: "When troubleshooting an intermittent production bug, what should be your first step?",
      options: [
        "Rewrite the entire application architecture from scratch",
        "Examine logs, reproduce the issue systematically in a controlled environment, and isolate variables",
        "Push an untested hotfix directly to production",
        "Ignore the issue until more users complain",
      ],
      correct: 1,
      explanation: "Systematic investigation, log inspection, and reproducible isolation prevent guesswork and unintended side effects.",
    },
    {
      id: 4,
      question: "What is the Pareto Principle (80/20 Rule) in problem prioritization?",
      options: [
        "80% of problems are caused by 20% of root causes",
        "80% of code takes 80% of memory",
        "Every problem requires exactly 20 iterations to solve",
        "80% of team members should solve 20% of bugs",
      ],
      correct: 0,
      explanation: "The Pareto principle states that roughly 80% of consequences come from 20% of causes.",
    },
  ],
  JavaScript: [
    {
      id: 1,
      question: "What is a Closure in JavaScript?",
      options: [
        "A function bundled with references to its surrounding lexical environment",
        "A method to terminate an infinite while loop",
        "A private class keyword introduced in ES6",
        "A tool to minify production code bundles",
      ],
      correct: 0,
      explanation: "A closure gives a function access to its outer function's scope even after the outer function has returned.",
    },
    {
      id: 2,
      question: "What is the difference between `==` and `===` in JavaScript?",
      options: [
        "`==` compares value with type coercion; `===` performs strict comparison without type coercion",
        "`===` checks only variable names; `==` checks values",
        "`==` is used for numbers; `===` is used for strings",
        "There is no difference in modern V8 engines",
      ],
      correct: 0,
      explanation: "`===` checks both value and type without converting types, whereas `==` coerces types before comparing.",
    },
    {
      id: 3,
      question: "Which array method returns a new array with all elements that pass the test implemented by the provided function?",
      options: ["array.map()", "array.filter()", "array.reduce()", "array.forEach()"],
      correct: 1,
      explanation: "`array.filter()` returns a new array containing only elements where the callback returns `true`.",
    },
    {
      id: 4,
      question: "What does `Promise.all([p1, p2, p3])` do if one of the promises rejects?",
      options: [
        "It waits for all others and resolves with the successful ones",
        "It immediately rejects with the reason of the first rejected promise",
        "It automatically retries the rejected promise three times",
        "It converts the error to undefined and resolves",
      ],
      correct: 1,
      explanation: "`Promise.all` employs fail-fast behavior: if any promise rejects, the entire `Promise.all` rejects immediately.",
    },
  ],
};

export function getQuestionsForSkill(skillName = "") {
  if (ASSESSMENT_QUESTIONS[skillName]) {
    return ASSESSMENT_QUESTIONS[skillName];
  }

  // Generic adaptive questions for newly created custom skills
  return [
    {
      id: 101,
      question: `Which fundamental principle is essential when building solutions with ${skillName}?`,
      options: [
        "Applying established design patterns, modular architecture, and structured validation",
        "Skipping testing and going straight to production",
        "Hardcoding all credentials and configuration variables directly",
        "Avoiding documentation and version control",
      ],
      correct: 0,
      explanation: `Following clean architecture and standard principles ensures scalable, robust implementations in ${skillName}.`,
    },
    {
      id: 102,
      question: `What is the most effective way to debug and optimize performance in ${skillName}?`,
      options: [
        "Profiling bottlenecks with telemetry, inspecting logs, and isolating resource-heavy operations",
        "Restarting the computer repeatedly",
        "Removing error handlers to speed up execution",
        "Increasing file sizes arbitrarily",
      ],
      correct: 0,
      explanation: "Profiling and telemetry pinpoint exact performance hotspots.",
    },
    {
      id: 103,
      question: `How do you ensure reliability and reproducibility when collaborating on ${skillName} projects?`,
      options: [
        "Using version control (Git), automated CI/CD checks, and thorough unit/integration tests",
        "Sharing code snippets through unversioned text files",
        "Never committing code changes to a shared repository",
        "Disabling all linting and type checking tools",
      ],
      correct: 0,
      explanation: "CI/CD, automated tests, and Git repositories ensure reliable collaboration across teams.",
    },
    {
      id: 104,
      question: `When deploying or delivering a project built with ${skillName}, what is a critical best practice?`,
      options: [
        "Conducting end-to-end verification, security audits, and documenting maintenance guidelines",
        "Leaving debug flags enabled in production",
        "Ignoring user feedback and edge cases",
        "Deploying without backup or rollback mechanisms",
      ],
      correct: 0,
      explanation: "Security audits, rollback strategies, and end-to-end verification protect production deployments.",
    },
  ];
}
