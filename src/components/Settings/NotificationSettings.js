import React from "react";
import SettingsSection from "./SettingsSection";

function NotificationSettings() {
  return (
    <div className="settings-card">
      <h3>Notifications</h3>
      <SettingsSection title="Channels">
        <div className="setting-option">
          <label>Email Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-option">
          <label>Push Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
      </SettingsSection>
      <SettingsSection title="Content Notifications">
        <div className="setting-option">
          <label>New followers</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-option">
          <label>Post replies</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-option">
          <label>Post mentions</label>
          <input type="checkbox" />
        </div>
        <div className="setting-option">
          <label>Votes on your proposals</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-option">
          <label>Case verdicts you participated in</label>
          <input type="checkbox" defaultChecked />
        </div>
      </SettingsSection>
    </div>
  );
}

export default NotificationSettings;
