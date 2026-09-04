export const STORAGE_KEYS = {
  PROFILE: "skillverse_profile",
  SKILLS: "skillverse_skills",
  PROJECTS: "skillverse_projects",
  CERTIFICATES: "skillverse_certificates",
  SETTINGS: "skillverse_settings",
  AVATAR: "skillverse_avatar",
};

export function loadState(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error loading state for key "${key}":`, error);
    return fallbackValue;
  }
}

export function saveState(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving state for key "${key}":`, error);
  }
}

export function clearAllState() {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Error clearing state:", error);
  }
}
