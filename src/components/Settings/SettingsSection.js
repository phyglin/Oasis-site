import React from 'react';

function SettingsSection({ title, children }) {
  return (
    <div className="settings-section-card">
      {title && <h4 className="settings-section-title">{title}</h4>}
      <div className="settings-section-content">
        {children}
      </div>
    </div>
  );
}

export default SettingsSection;
