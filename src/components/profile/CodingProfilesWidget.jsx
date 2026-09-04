import React from "react";
import { ExternalLink, Code2, Trophy, GitBranch, CheckCircle2, Star } from "lucide-react";
import { LeetCodeIcon, CodeforcesIcon, GithubIcon, LinkedinIcon } from "../common/PlatformIcons";

export function CodingProfilesWidget({ profile = {} }) {
  const leetcodeUrl = profile.leetcode || (profile.leetcodeUsername ? `https://leetcode.com/u/${profile.leetcodeUsername}` : "https://leetcode.com/");
  const githubUrl = profile.github || (profile.githubUsername ? `https://github.com/${profile.githubUsername}` : "https://github.com/");
  const codeforcesUrl = profile.codeforces || (profile.codeforcesHandle ? `https://codeforces.com/profile/${profile.codeforcesHandle}` : "https://codeforces.com/");
  const linkedinUrl = profile.linkedin || "https://linkedin.com/";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* LeetCode Card */}
      <div className="p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white to-[#FFFDF9] hover:border-[#FFA116]/60 hover:shadow-sm transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#FFE8BF] flex items-center justify-center text-[#FFA116] shrink-0">
                <LeetCodeIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218]">LeetCode</p>
                <p className="text-xs text-[#707584]">@{profile.leetcodeUsername || "rahul_codes"}</p>
              </div>
            </div>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#707584] hover:text-[#FFA116] hover:bg-[#FFF8EB] transition-colors"
              title="Open LeetCode Profile"
            >
              <ExternalLink size={15} />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#101218] font-display">
                {profile.leetcodeSolved || 428}
              </span>
              <span className="text-xs font-semibold text-[#FFA116] bg-[#FFF8EB] px-2 py-0.5 rounded-md border border-[#FFE8BF]">
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
          className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#FFA116] hover:underline flex items-center justify-between"
        >
          <span>View LeetCode Activity</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* GitHub Card */}
      <div className="p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white to-[#FAF8F9] hover:border-[#101218]/40 hover:shadow-sm transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F0EEF0] border border-[#E0DCE0] flex items-center justify-center text-[#101218] shrink-0">
                <GithubIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218]">GitHub</p>
                <p className="text-xs text-[#707584]">@{profile.githubUsername || "rahul-sharma"}</p>
              </div>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#707584] hover:text-[#101218] hover:bg-[#F0EEF0] transition-colors"
              title="Open GitHub Profile"
            >
              <ExternalLink size={15} />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#101218] font-display">
                {profile.githubRepos || 18}
              </span>
              <span className="text-xs font-semibold text-[#101218] bg-[#F0EEF0] px-2 py-0.5 rounded-md border border-[#E0DCE0]">
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
          className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#101218] hover:underline flex items-center justify-between"
        >
          <span>Explore Repositories</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Codeforces Card */}
      <div className="p-5 rounded-2xl border border-[#E9E2E5] bg-gradient-to-br from-white to-[#F6FAFD] hover:border-[#1F8ACB]/60 hover:shadow-sm transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FB] border border-[#CDE5F7] flex items-center justify-center text-[#1F8ACB] shrink-0">
                <CodeforcesIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101218]">Codeforces</p>
                <p className="text-xs text-[#707584]">@{profile.codeforcesHandle || "rahul_sharma"}</p>
              </div>
            </div>
            <a
              href={codeforcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#707584] hover:text-[#1F8ACB] hover:bg-[#EAF4FB] transition-colors"
              title="Open Codeforces Profile"
            >
              <ExternalLink size={15} />
            </a>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-extrabold text-[#101218] font-display">
                {profile.codeforcesRating || 1492}
              </span>
              <span className="text-xs font-semibold text-[#1F8ACB] bg-[#EAF4FB] px-2 py-0.5 rounded-md border border-[#CDE5F7]">
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
          className="mt-4 pt-3 border-t border-[#F2ECEE] text-xs font-semibold text-[#1F8ACB] hover:underline flex items-center justify-between"
        >
          <span>View Contest History</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export default CodingProfilesWidget;
