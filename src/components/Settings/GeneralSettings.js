import React from "react";
import SettingsSection from "./SettingsSection";
import { useTheme } from "../../contexts/ThemeContext";

function GeneralSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="settings-card">
      <h3>General</h3>
      <SettingsSection title="Account Settings">
        <div className="setting-option">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" defaultValue="current_username" />
        </div>
        <div className="setting-option">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" defaultValue="user@example.com" />
        </div>
      </SettingsSection>
      <SettingsSection title="Display Settings">
        <div className="setting-option">
          <label>Language</label>
          <select>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="setting-option">
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="capitalize"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </SettingsSection>
    </div>
  );
}

export default GeneralSettings;
