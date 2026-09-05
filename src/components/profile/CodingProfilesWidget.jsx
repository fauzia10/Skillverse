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
      <div className="group relative p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white via-[#FFFDF9] to-[#FFF8EB]/40 hover:border-[#FFA116] hover:shadow-[0_16px_32px_-8px_rgba(255,161,22,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFA116] to-[#FFC069] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#FFE8BF] flex items-center justify-center text-[#FFA116] shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_12px_rgba(255,161,22,0.2)] transition-all duration-300">
                <LeetCodeIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218] group-hover:text-[#FFA116] transition-colors duration-200">LeetCode</p>
                <p className="text-xs text-[#707584]">@{profile.leetcodeUsername || "rahul_codes"}</p>
              </div>
            </div>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#707584] hover:text-[#FFA116] hover:bg-[#FFF8EB] group-hover:scale-105 transition-all"
              title="Open LeetCode Profile"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#101218] font-display group-hover:text-[#FFA116] transition-colors duration-200">
                {profile.leetcodeSolved || 428}
              </span>
              <span className="text-xs font-semibold text-[#FFA116] bg-[#FFF8EB] px-2 py-0.5 rounded-md border border-[#FFE8BF] group-hover:bg-[#FFA116] group-hover:text-white transition-colors duration-200">
                Rating: {profile.leetcodeRating || 1845}
              </span>
            </div>
            <p className="text-[11px] text-[#707584]">Problems Solved across Data Structures & Algorithms</p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-semibold">
            <span className="px-2 py-0.5 rounded-md bg-[#E8F7F1] text-[#1B7352] border border-[#C6EFE0]">
              Easy: {profile.leetcodeEasy || 160}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#FFF8EB] text-[#B57C1E] border border-[#FFE8BF]">
              Med: {profile.leetcodeMedium || 215}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#FCEBEF] text-[#BA203B] border border-[#F5CAD3]">
              Hard: {profile.leetcodeHard || 53}
            </span>
          </div>
        </div>

        <a
          href={leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#FFA116] hover:text-[#d8840c] flex items-center justify-between group/link"
        >
          <span className="group-hover/link:underline">View LeetCode Activity</span>
          <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {/* GitHub Card */}
      <div className="group relative p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white via-[#FAF8F9] to-[#F0EEF0]/50 hover:border-[#101218] hover:shadow-[0_16px_32px_-8px_rgba(16,18,24,0.22)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#101218] to-[#555A68] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F0EEF0] border border-[#E0DCE0] flex items-center justify-center text-[#101218] shrink-0 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_4px_12px_rgba(16,18,24,0.18)] transition-all duration-300">
                <GithubIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218] group-hover:text-[#BA203B] transition-colors duration-200">GitHub</p>
                <p className="text-xs text-[#707584]">@{profile.githubUsername || "rahul-sharma"}</p>
              </div>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#707584] hover:text-[#101218] hover:bg-[#F0EEF0] group-hover:scale-105 transition-all"
              title="Open GitHub Profile"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#101218] font-display group-hover:text-[#BA203B] transition-colors duration-200">
                {profile.githubRepos || 18}
              </span>
              <span className="text-xs font-semibold text-[#101218] bg-[#F0EEF0] px-2 py-0.5 rounded-md border border-[#E0DCE0] group-hover:bg-[#101218] group-hover:text-white transition-colors duration-200">
                {profile.githubContributions || 342} Commits / yr
              </span>
            </div>
            <p className="text-[11px] text-[#707584]">Public Repositories & Open Source Contributions</p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#707584]">
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E9E2E5]">Python</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E9E2E5]">JavaScript</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E9E2E5]">SQL</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E9E2E5]">React</span>
          </div>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#101218] hover:text-[#BA203B] flex items-center justify-between group/link"
        >
          <span className="group-hover/link:underline">Explore Repositories</span>
          <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>

      {/* Codeforces Card */}
      <div className="group relative p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white via-[#F6FAFD] to-[#EAF4FB]/50 hover:border-[#1F8ACB] hover:shadow-[0_16px_32px_-8px_rgba(31,138,203,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1F8ACB] to-[#6BC0F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FB] border border-[#CDE5F7] flex items-center justify-center text-[#1F8ACB] shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_4px_12px_rgba(31,138,203,0.2)] transition-all duration-300">
                <CodeforcesIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218] group-hover:text-[#1F8ACB] transition-colors duration-200">Codeforces</p>
                <p className="text-xs text-[#707584]">@{profile.codeforcesHandle || "rahul_sharma"}</p>
              </div>
            </div>
            <a
              href={codeforcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#707584] hover:text-[#1F8ACB] hover:bg-[#EAF4FB] group-hover:scale-105 transition-all"
              title="Open Codeforces Profile"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#101218] font-display group-hover:text-[#1F8ACB] transition-colors duration-200">
                {profile.codeforcesRating || 1492}
              </span>
              <span className="text-xs font-semibold text-[#1F8ACB] bg-[#EAF4FB] px-2 py-0.5 rounded-md border border-[#CDE5F7] group-hover:bg-[#1F8ACB] group-hover:text-white transition-colors duration-200">
                {profile.codeforcesRank || "Specialist"}
              </span>
            </div>
            <p className="text-[11px] text-[#707584]">Contest Rating & Algorithmic Benchmarks</p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#707584]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EAF4FB] text-[#1F8ACB] font-semibold border border-[#CDE5F7]">
              <Trophy size={11} /> Active Competitor
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E9E2E5]">32 Contests</span>
          </div>
        </div>

        <a
          href={codeforcesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#1F8ACB] hover:text-[#166d9f] flex items-center justify-between group/link"
        >
          <span className="group-hover/link:underline">View Contest History</span>
          <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </div>
  );
}

export default CodingProfilesWidget;
