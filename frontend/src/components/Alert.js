import React from 'react';

export default ({ onDismiss, message, className }) => (
  <div className={`paper body alert ${className}`}>
    <i className="fas fa-times alert-close" onClick={onDismiss} />
    {message}
  </div>
);
