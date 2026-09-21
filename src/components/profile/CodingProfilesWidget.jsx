import React from "react";
import { ExternalLink, Code2, Trophy, GitBranch, CheckCircle2, Star } from "lucide-react";
import { LeetCodeIcon, CodeforcesIcon, GithubIcon, LinkedinIcon } from "../common/PlatformIcons";

export function CodingProfilesWidget({ profile = {} }) {
  const leetcodeUrl = profile.leetcode || (profile.leetcodeUsername ? `https://leetcode.com/u/${profile.leetcodeUsername}` : "https://leetcode.com/");
  const githubUrl = profile.github || (profile.githubUsername ? `https://github.com/${profile.githubUsername}` : "https://github.com/");
  const codeforcesUrl = profile.codeforces || (profile.codeforcesHandle ? `https://codeforces.com/profile/${profile.codeforcesHandle}` : "https://codeforces.com/");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* LeetCode Card */}
      <div className="group relative p-5 rounded-2xl border border-[#232F47] bg-gradient-to-br from-[#131824] via-[#161D2B] to-[#131824] hover:border-[#FFA116] hover:shadow-[0_16px_32px_-8px_rgba(255,161,22,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFA116] to-[#FFC069] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#2D2010] border border-[#523A16] flex items-center justify-center text-[#FFA116] shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_12px_rgba(255,161,22,0.2)] transition-all duration-300">
                <LeetCodeIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#FFA116] transition-colors duration-200">LeetCode</p>
                <p className="text-xs text-[#94A3B8]">@{profile.leetcodeUsername || "rahul_codes"}</p>
              </div>
            </div>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#FFA116] hover:bg-[#2D2010] group-hover:scale-105 transition-all"
              title="Open LeetCode Profile"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#F1F5F9] font-display group-hover:text-[#FFA116] transition-colors duration-200">
                {profile.leetcodeSolved || 428}
              </span>
              <span className="text-xs font-semibold text-[#FFA116] bg-[#2D2010] px-2 py-0.5 rounded-md border border-[#523A16] group-hover:bg-[#FFA116] group-hover:text-[#0A0D14] transition-colors duration-200">
                Rating: {profile.leetcodeRating || 1845}
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">Problems Solved across Data Structures & Algorithms</p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-[#062E23] text-[#10B981] border border-[#0F5132]">
              Easy: {profile.leetcodeEasy || 160}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#3A2A10] text-[#FBBF24] border border-[#5C4218]">
              Med: {profile.leetcodeMedium || 215}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#36121C] text-[#FB7185] border border-[#541B2C]">
              Hard: {profile.leetcodeHard || 53}
            </span>
          </div>
        </div>

        <a
          href={leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-[#232F47] text-xs font-semibold text-[#FFA116] hover:text-[#FFC069] flex items-center justify-between group/link"
        >
          <span className="group-hover/link:underline">View LeetCode Activity</span>
          <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {/* GitHub Card */}
      <div className="group relative p-5 rounded-2xl border border-[#232F47] bg-gradient-to-br from-[#131824] via-[#161D2B] to-[#131824] hover:border-[#00C0F3] hover:shadow-[0_16px_32px_-8px_rgba(0,192,243,0.22)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C0F3] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#182030] border border-[#232F47] flex items-center justify-center text-[#F1F5F9] shrink-0 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_4px_12px_rgba(0,192,243,0.18)] transition-all duration-300">
                <GithubIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#00C0F3] transition-colors duration-200">GitHub</p>
                <p className="text-xs text-[#94A3B8]">@{profile.githubUsername || "rahul-sharma"}</p>
              </div>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00C0F3] hover:bg-[#182030] group-hover:scale-105 transition-all"
              title="Open GitHub Profile"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#F1F5F9] font-display group-hover:text-[#00C0F3] transition-colors duration-200">
                {profile.githubRepos || 18}
              </span>
              <span className="text-xs font-semibold text-[#00C0F3] bg-[#0D2D3E] px-2 py-0.5 rounded-md border border-[#164863] group-hover:bg-[#00C0F3] group-hover:text-[#0A0D14] transition-colors duration-200">
                {profile.githubContributions || 342} Commits / yr
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">Public Repositories & Open Source Contributions</p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#94A3B8]">
            <span className="px-2 py-0.5 rounded-md bg-[#182030] border border-[#232F47] text-[#F1F5F9]">Python</span>
            <span className="px-2 py-0.5 rounded-md bg-[#182030] border border-[#232F47] text-[#F1F5F9]">JavaScript</span>
            <span className="px-2 py-0.5 rounded-md bg-[#182030] border border-[#232F47] text-[#F1F5F9]">SQL</span>
            <span className="px-2 py-0.5 rounded-md bg-[#182030] border border-[#232F47] text-[#F1F5F9]">React</span>
          </div>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-[#232F47] text-xs font-semibold text-[#00C0F3] hover:text-[#38BDF8] flex items-center justify-between group/link"
        >
          <span className="group-hover/link:underline">Explore Repositories</span>
          <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {/* Codeforces Card */}
      <div className="group relative p-5 rounded-2xl border border-[#232F47] bg-gradient-to-br from-[#131824] via-[#161D2B] to-[#131824] hover:border-[#1F8ACB] hover:shadow-[0_16px_32px_-8px_rgba(31,138,203,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1F8ACB] to-[#6BC0F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0D2434] border border-[#16425F] flex items-center justify-center text-[#1F8ACB] shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_12px_rgba(31,138,203,0.2)] transition-all duration-300">
                <CodeforcesIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#1F8ACB] transition-colors duration-200">Codeforces</p>
                <p className="text-xs text-[#94A3B8]">@{profile.codeforcesHandle || "rahul_sharma"}</p>
              </div>
            </div>
            <a
              href={codeforcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#1F8ACB] hover:bg-[#0D2434] group-hover:scale-105 transition-all"
              title="Open Codeforces Profile"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#F1F5F9] font-display group-hover:text-[#1F8ACB] transition-colors duration-200">
                {profile.codeforcesRating || 1492}
              </span>
              <span className="text-xs font-semibold text-[#1F8ACB] bg-[#0D2434] px-2 py-0.5 rounded-md border border-[#16425F] group-hover:bg-[#1F8ACB] group-hover:text-[#0A0D14] transition-colors duration-200">
                {profile.codeforcesRank || "Specialist"}
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">Contest Rating & Algorithmic Benchmarks</p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#94A3B8]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0D2434] text-[#1F8ACB] font-semibold border border-[#16425F]">
              <Trophy size={11} /> Active Competitor
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#182030] border border-[#232F47] text-[#F1F5F9]">32 Contests</span>
          </div>
        </div>

        <a
          href={codeforcesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-[#232F47] text-xs font-semibold text-[#1F8ACB] hover:text-[#6BC0F0] flex items-center justify-between group/link"
        >
          <span className="group-hover/link:underline">View Contest History</span>
          <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}

export default CodingProfilesWidget;
