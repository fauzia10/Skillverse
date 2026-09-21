import React from "react";

// Official LeetCode Icon (Distinctive Gold/Orange curve with crisp White/Light divider)
export function LeetCodeIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Bracket Curve */}
      <path
        d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101a5.084 5.084 0 0 0 0 7.191l4.373 4.374c.954.954 2.245 1.488 3.593 1.488s2.64-.534 3.594-1.488l2.608-2.637c.515-.514.497-1.365-.038-1.901-.535-.535-1.387-.552-1.902-.038z"
        fill="#FFA116"
      />
      {/* Middle White/Light Bar */}
      <path
        d="M20.811 12.01H10.666c-.736 0-1.332.597-1.332 1.333s.596 1.333 1.332 1.333h10.145c.736 0 1.332-.597 1.332-1.333s-.596-1.333-1.332-1.333z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// Official Codeforces Tri-Color Bar Chart (Yellow, Blue, Red)
export function CodeforcesIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="1.5" y="9" width="4.5" height="12" rx="1.5" fill="#FFC107" />
      <rect x="9.75" y="3" width="4.5" height="18" rx="1.5" fill="#2196F3" />
      <rect x="18" y="7" width="4.5" height="14" rx="1.5" fill="#F44336" />
    </svg>
  );
}

// Official GitHub Octocat Icon
export function GithubIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#F1F5F9"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// Official HackerRank Green Polygon 'H' Icon
export function HackerRankIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="5" fill="#00EA64" />
      <path
        d="M15.5 17.5H13.2V13.5H10.8V17.5H8.5V6.5H10.8V10.5H13.2V6.5H15.5V17.5Z"
        fill="#0A0D14"
      />
    </svg>
  );
}

// Official GeeksforGeeks (GFG) Green Icon
export function GfgIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#2F8D46" />
      <path
        d="M16 8.5H10.8C9 8.5 7.5 10 7.5 11.8C7.5 13.6 9 15.1 10.8 15.1H16V13.1H10.8C10.1 13.1 9.5 12.5 9.5 11.8C9.5 11.1 10.1 10.5 10.8 10.5H16V8.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M13.8 11.5H16V15.5H13.8V11.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// Official CodeChef Chef Hat Icon
export function CodeChefIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#5B4638" />
      <path
        d="M12 5C9.8 5 8 6.5 7.5 8.5H16.5C16 6.5 14.2 5 12 5ZM7 10.5C7 13 8.8 15.1 11.2 15.4V17.5H12.8V15.4C15.2 15.1 17 13 17 10.5H7Z"
        fill="#FFFFFF"
      />
      <circle cx="10" cy="12" r="1" fill="#5B4638" />
      <circle cx="14" cy="12" r="1" fill="#5B4638" />
    </svg>
  );
}

// Official Google Multi-Color Icon
export function GoogleIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Official LinkedIn Brand Icon
export function LinkedinIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#0A66C2"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.88c-.9 0-1.62.72-1.62 1.62a1.62 1.62 0 1 0 3.24 0c0-.9-.72-1.62-1.62-1.62z" />
    </svg>
  );
}
