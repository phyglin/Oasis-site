import React from "react";
import SettingsSection from "./SettingsSection";

function PrivacySettings() {
  return (
    <div className="settings-card">
      <h3>Privacy</h3>
      <SettingsSection title="Visibility">
        <div className="setting-option">
          <label>Who can see your profile?</label>
          <select>
            <option>Everyone</option>
            <option>Verified Users</option>
            <option>Nobody</option>
          </select>
        </div>
        <div className="setting-option">
          <label>Allow search engines to index your profile</label>
          <input type="checkbox" defaultChecked />
        </div>
      </SettingsSection>
      <SettingsSection title="Data">
        <div className="setting-option">
          <label>Show your online status</label>
          <input type="checkbox" />
        </div>
        <div className="setting-option">
          <label>Allow others to see your voting history</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-option">
          <label>Make your case history public</label>
          <input type="checkbox" />
        </div>
      </SettingsSection>
    </div>
  );
}

export default PrivacySettings;
