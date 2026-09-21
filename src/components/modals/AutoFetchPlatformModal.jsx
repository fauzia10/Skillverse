import React, { useState } from "react";
import {
  X,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import {
  LeetCodeIcon,
  CodeforcesIcon,
  GithubIcon,
  HackerRankIcon,
  GfgIcon,
  CodeChefIcon,
} from "../common/PlatformIcons";
import {
  detectPlatform,
  extractUsername,
  autoFetchPlatformData,
} from "../../utils/platformFetcher";

export function AutoFetchPlatformModal({ isOpen, onClose, onApplyMetrics }) {
  const [inputUrl, setInputUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const detected = detectPlatform(inputUrl);
  const effectivePlatform = selectedPlatform === "auto" ? detected : selectedPlatform;

  const handleFetch = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setFetchResult(null);

    if (!inputUrl.trim()) {
      setError("Please paste a profile URL or username.");
      return;
    }

    setLoading(true);
    try {
      const data = await autoFetchPlatformData(inputUrl, effectivePlatform);
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch platform profile data.");
      }
      setFetchResult(data);
    } catch (err) {
      setError(err.message || "Could not fetch platform data. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!fetchResult) return;
    onApplyMetrics(fetchResult);
    onClose();
  };

  const platforms = [
    { id: "auto", name: "Auto-Detect", icon: Sparkles },
    { id: "github", name: "GitHub", icon: GithubIcon, color: "#00C0F3" },
    { id: "leetcode", name: "LeetCode", icon: LeetCodeIcon, color: "#FFA116" },
    { id: "codeforces", name: "Codeforces", icon: CodeforcesIcon, color: "#1F8ACB" },
    { id: "hackerrank", name: "HackerRank", icon: HackerRankIcon, color: "#10B981" },
    { id: "gfg", name: "GeeksforGeeks", icon: GfgIcon, color: "#34D399" },
    { id: "codechef", name: "CodeChef", icon: CodeChefIcon, color: "#F59E0B" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-[Inter,sans-serif]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0D14]/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#101522] border border-[#232F47] shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#182030] transition-all cursor-pointer"
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#00C0F3]/10 border border-[#00C0F3]/30 flex items-center justify-center text-[#00C0F3] shadow-sm">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Auto-Fetch Coding Metrics
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Paste any coding profile link to automatically sync verified live statistics.
            </p>
          </div>
        </div>

        {/* Platform Selector Chips */}
        <div className="mb-4">
          <label className="block text-[11px] font-medium text-[#94A3B8] mb-2 uppercase tracking-wider">
            Target Platform
          </label>
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#00C0F3] text-[#0A0D14] shadow-sm"
                      : "bg-[#182030] text-[#94A3B8] hover:text-white border border-[#232F47]"
                  }`}
                >
                  <Icon size={14} />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFetch} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Profile Link or Handle <span className="text-[#00C0F3]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <LinkIcon size={16} />
              </div>
              <input
                type="text"
                autoFocus
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. https://github.com/fauzia10 or https://leetcode.com/u/fauzia10"
                className="w-full pl-10 pr-28 py-3 rounded-xl bg-[#0A0D14] border border-[#1F293D] focus:border-[#00C0F3] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !inputUrl.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-[#00C0F3] hover:bg-[#38BDF8] disabled:opacity-40 text-[#0A0D14] text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                {loading ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <>
                    <span>Fetch</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Platform auto-detect indicator badge */}
          {detected && selectedPlatform === "auto" && (
            <div className="flex items-center gap-2 text-xs text-[#00C0F3] bg-[#00C0F3]/10 border border-[#00C0F3]/20 px-3 py-1.5 rounded-xl">
              <CheckCircle2 size={14} />
              <span>Detected: <strong>{detected.toUpperCase()}</strong> Profile Link</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#FCA5A5] text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Live Fetched Result Preview */}
        {fetchResult && (
          <div className="mt-5 p-4 rounded-2xl bg-[#0A0D14] border border-[#00C0F3]/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F293D] mb-3">
              <div className="flex items-center gap-2.5">
                {fetchResult.avatarUrl ? (
                  <img
                    src={fetchResult.avatarUrl}
                    alt="Platform Avatar"
                    className="w-9 h-9 rounded-xl object-cover border border-[#232F47]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-[#182030] flex items-center justify-center text-[#00C0F3] font-bold text-xs">
                    {fetchResult.platform?.toUpperCase().slice(0, 2)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{fetchResult.name || fetchResult.username || fetchResult.handle}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-semibold border border-[#10B981]/30">
                      Live Verified
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#94A3B8]">
                    @{fetchResult.username || fetchResult.handle} · {fetchResult.platform?.toUpperCase()}
                  </p>
                </div>
              </div>

              {fetchResult.url && (
                <a
                  href={fetchResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00C0F3] hover:underline flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Platform Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center mb-4">
              {fetchResult.platform === "github" && (
                <>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-white">{fetchResult.repos}</span>
                    <span className="text-[10px] text-[#94A3B8]">Public Repos</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#00C0F3]">{fetchResult.contributions}</span>
                    <span className="text-[10px] text-[#94A3B8]">Est. Commits</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-white">{fetchResult.followers}</span>
                    <span className="text-[10px] text-[#94A3B8]">Followers</span>
                  </div>
                </>
              )}

              {fetchResult.platform === "codeforces" && (
                <>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#38BDF8]">{fetchResult.rating}</span>
                    <span className="text-[10px] text-[#94A3B8]">Contest Rating</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-white">{fetchResult.rank}</span>
                    <span className="text-[10px] text-[#94A3B8]">Rank Tier</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-white">{fetchResult.maxRating}</span>
                    <span className="text-[10px] text-[#94A3B8]">Max Rating</span>
                  </div>
                </>
              )}

              {fetchResult.platform === "leetcode" && (
                <>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#FFA116]">{fetchResult.totalSolved}</span>
                    <span className="text-[10px] text-[#94A3B8]">Solved</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#10B981]">{fetchResult.easySolved}E / {fetchResult.mediumSolved}M</span>
                    <span className="text-[10px] text-[#94A3B8]">Easy / Med</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#EF4444]">{fetchResult.hardSolved}</span>
                    <span className="text-[10px] text-[#94A3B8]">Hard</span>
                  </div>
                </>
              )}

              {fetchResult.platform === "hackerrank" && (
                <>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#10B981]">{fetchResult.stars}</span>
                    <span className="text-[10px] text-[#94A3B8]">Stars</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-white">{fetchResult.badges}</span>
                    <span className="text-[10px] text-[#94A3B8]">Gold Badges</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131824] border border-[#1F293D]">
                    <span className="block text-sm font-bold text-[#00C0F3]">Verified</span>
                    <span className="text-[10px] text-[#94A3B8]">Status</span>
                  </div>
                </>
              )}
            </div>

            {/* Apply CTA */}
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3 rounded-xl bg-[#00C0F3] hover:bg-[#38BDF8] text-[#0A0D14] text-xs font-bold transition-all cursor-pointer shadow-[0_8px_20px_rgba(0,192,243,0.25)] flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={15} />
              <span>Apply Verified Metrics to Portfolio</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoFetchPlatformModal;
