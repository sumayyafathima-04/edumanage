import React from 'react';

const StatCard = ({ title, value, icon, color = 'blue', subtitle }) => {
  const getIconClass = () => {
    switch (color) {
      case 'green': return 'icon-green';
      case 'amber': return 'icon-amber';
      case 'purple': return 'icon-purple';
      default: return 'icon-blue';
    }
  };

  return (
    <div className="stat-card">
      <div className={`stat-icon ${getIconClass()}`}>
        {icon}
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
