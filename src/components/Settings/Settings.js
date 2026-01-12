import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";
import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "privacy":
        return <PrivacySettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#0f172a]/30 dark:backdrop-blur-md">
      <div className="py-8 text-center border-b border-gray-200 dark:border-indigo-500/20 mb-6">
        <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-indigo-100">
          Settings
        </h2>
      </div>
      <div className="px-8 pb-8">
        <div className="settings-nav">
          <button
            onClick={() => setActiveTab("general")}
            className={activeTab === "general" ? "active" : ""}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={activeTab === "notifications" ? "active" : ""}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={activeTab === "privacy" ? "active" : ""}
          >
            Privacy
          </button>
        </div>
        <div className="settings-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Settings;
