import React from "react";
import { ExternalLink, Zap } from "lucide-react";
import {
  LeetCodeIcon,
  CodeforcesIcon,
  GithubIcon,
  HackerRankIcon,
  GfgIcon,
  CodeChefIcon,
} from "../common/PlatformIcons";

export function CodingProfilesWidget({ profile = {} }) {
  const leetcodeUrl = profile.leetcode || (profile.leetcodeUsername ? `https://leetcode.com/u/${profile.leetcodeUsername}` : "https://leetcode.com/");
  const githubUrl = profile.github || (profile.githubUsername ? `https://github.com/${profile.githubUsername}` : "https://github.com/");
  const codeforcesUrl = profile.codeforces || (profile.codeforcesHandle ? `https://codeforces.com/profile/${profile.codeforcesHandle}` : "https://codeforces.com/");
  const hackerrankUrl = profile.hackerrank || (profile.hackerrankUsername ? `https://hackerrank.com/profile/${profile.hackerrankUsername}` : "https://hackerrank.com/");
  const gfgUrl = profile.gfg || (profile.gfgUsername ? `https://auth.geeksforgeeks.org/user/${profile.gfgUsername}` : "https://geeksforgeeks.org/");
  const codechefUrl = profile.codechef || (profile.codechefHandle ? `https://codechef.com/users/${profile.codechefHandle}` : "https://codechef.com/");

  const allCards = [
    {
      id: "leetcode",
      title: "LeetCode",
      handle: profile.leetcodeUsername ? `@${profile.leetcodeUsername}` : "Not linked",
      url: leetcodeUrl,
      icon: LeetCodeIcon,
      accentColor: "#FFA116",
      bgGradient: "from-[#131824] via-[#181510] to-[#131824]",
      hoverBorder: "hover:border-[#FFA116]",
      hoverShadow: "hover:shadow-[0_12px_24px_-6px_rgba(255,161,22,0.25)]",
      iconBg: "bg-[#2D2010] border-[#523A16] text-[#FFA116]",
      mainStat: `${profile.leetcodeSolved || 0} Solved`,
      badge: profile.leetcodeRating ? `Rating ${profile.leetcodeRating}` : "Unrated",
      badgeColor: "text-[#FFA116] bg-[#2D2010] border-[#523A16]",
      tag: "DSA & Algorithmic",
      linkText: profile.leetcodeUsername ? "View LeetCode" : "Link Profile",
    },
    {
      id: "github",
      title: "GitHub",
      handle: profile.githubUsername ? `@${profile.githubUsername}` : "Not linked",
      url: githubUrl,
      icon: GithubIcon,
      accentColor: "#00C0F3",
      bgGradient: "from-[#131824] via-[#101824] to-[#131824]",
      hoverBorder: "hover:border-[#00C0F3]",
      hoverShadow: "hover:shadow-[0_12px_24px_-6px_rgba(0,192,243,0.25)]",
      iconBg: "bg-[#182030] border-[#232F47] text-[#F1F5F9]",
      mainStat: `${profile.githubRepos || 0} Repos`,
      badge: `${profile.githubContributions || 0} Commits/yr`,
      badgeColor: "text-[#00C0F3] bg-[#0D2D3E] border-[#164863]",
      tag: "Open Source Code",
      linkText: profile.githubUsername ? "View GitHub" : "Link Profile",
    },
    {
      id: "codeforces",
      title: "Codeforces",
      handle: profile.codeforcesHandle ? `@${profile.codeforcesHandle}` : "Not linked",
      url: codeforcesUrl,
      icon: CodeforcesIcon,
      accentColor: "#1F8ACB",
      bgGradient: "from-[#131824] via-[#101924] to-[#131824]",
      hoverBorder: "hover:border-[#1F8ACB]",
      hoverShadow: "hover:shadow-[0_12px_24px_-6px_rgba(31,138,203,0.25)]",
      iconBg: "bg-[#0D2434] border-[#16425F] text-[#1F8ACB]",
      mainStat: profile.codeforcesRating ? `${profile.codeforcesRating} Rating` : "Unrated",
      badge: profile.codeforcesRank || "Unranked",
      badgeColor: "text-[#1F8ACB] bg-[#0D2434] border-[#16425F]",
      tag: "Competitive Contest",
      linkText: profile.codeforcesHandle ? "View Contests" : "Link Profile",
    },
    {
      id: "hackerrank",
      title: "HackerRank",
      handle: profile.hackerrankUsername ? `@${profile.hackerrankUsername}` : "Not linked",
      url: hackerrankUrl,
      icon: HackerRankIcon,
      accentColor: "#10B981",
      bgGradient: "from-[#131824] via-[#102018] to-[#131824]",
      hoverBorder: "hover:border-[#10B981]",
      hoverShadow: "hover:shadow-[0_12px_24px_-6px_rgba(16,185,129,0.25)]",
      iconBg: "bg-[#0A261D] border-[#134E3C] text-[#10B981]",
      mainStat: `${profile.hackerrankStars || "0★"} Stars`,
      badge: `${profile.hackerrankBadges || 0} Badges`,
      badgeColor: "text-[#10B981] bg-[#0A261D] border-[#134E3C]",
      tag: "Verified Badges",
      linkText: profile.hackerrankUsername ? "View Badges" : "Link Profile",
    },
    {
      id: "gfg",
      title: "GeeksforGeeks",
      handle: profile.gfgUsername ? `@${profile.gfgUsername}` : "Not linked",
      url: gfgUrl,
      icon: GfgIcon,
      accentColor: "#34D399",
      bgGradient: "from-[#131824] via-[#102018] to-[#131824]",
      hoverBorder: "hover:border-[#34D399]",
      hoverShadow: "hover:shadow-[0_12px_24px_-6px_rgba(52,211,153,0.25)]",
      iconBg: "bg-[#0B2E20] border-[#155E3F] text-[#34D399]",
      mainStat: `${profile.gfgSolved || 0} Solved`,
      badge: profile.gfgRank ? `Rank #${profile.gfgRank}` : "Score 0",
      badgeColor: "text-[#34D399] bg-[#0B2E20] border-[#155E3F]",
      tag: "Practice & POTD",
      linkText: profile.gfgUsername ? "View GFG" : "Link Profile",
    },
    {
      id: "codechef",
      title: "CodeChef",
      handle: profile.codechefHandle ? `@${profile.codechefHandle}` : "Not linked",
      url: codechefUrl,
      icon: CodeChefIcon,
      accentColor: "#F59E0B",
      bgGradient: "from-[#131824] via-[#1F1810] to-[#131824]",
      hoverBorder: "hover:border-[#F59E0B]",
      hoverShadow: "hover:shadow-[0_12px_24px_-6px_rgba(245,158,11,0.25)]",
      iconBg: "bg-[#332210] border-[#5C3E18] text-[#F59E0B]",
      mainStat: `${profile.codechefStars || "0★"} Stars`,
      badge: profile.codechefRating ? `Rating ${profile.codechefRating}` : "Unrated",
      badgeColor: "text-[#F59E0B] bg-[#332210] border-[#5C3E18]",
      tag: profile.codechefDiv || "Rated Contests",
      linkText: profile.codechefHandle ? "View Ratings" : "Link Profile",
    },
  ];

  return (
    <div className="w-full">
      {/* Responsive One-Row Horizontal Strip (Scrollable on small screens, 6-col on large) */}
      <div className="flex xl:grid xl:grid-cols-6 gap-3.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#1F293D] scrollbar-track-transparent">
        {allCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`group relative p-4 rounded-2xl border border-[#232F47] bg-gradient-to-br ${card.bgGradient} ${card.hoverBorder} ${card.hoverShadow} hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden shrink-0 min-w-[200px] xl:min-w-0 xl:w-auto`}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: card.accentColor }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${card.iconBg}`}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="text-xs font-bold text-[#F1F5F9] group-hover:text-white transition-colors truncate">
                        {card.title}
                      </p>
                      <p className="text-[10px] text-[#94A3B8] truncate">{card.handle}</p>
                    </div>
                  </div>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-[#94A3B8] hover:text-[#00C0F3] hover:bg-[#182030] transition-all shrink-0"
                    title={`Open ${card.title}`}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div className="mb-2">
                  <span className="text-base font-extrabold text-[#F1F5F9] font-display block truncate">
                    {card.mainStat}
                  </span>
                  <span className={`inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${card.badgeColor} truncate max-w-full`}>
                    {card.badge}
                  </span>
                </div>

                <p className="text-[10px] text-[#94A3B8] truncate mb-1">
                  {card.tag}
                </p>
              </div>

              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 pt-2 border-t border-[#1F293D] text-[11px] font-semibold flex items-center justify-between group/link"
                style={{ color: card.accentColor }}
              >
                <span className="group-hover/link:underline truncate">{card.linkText}</span>
                <ExternalLink size={11} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CodingProfilesWidget;
