import React from "react";

const Popup = ({ title, close, message, next }) => {
  return (
    <div>
      <div className="popup-overlay">
        <div className="popup">
          <div className="popup-header">
            <span className="popup-title">{title}</span>
            <button className="close-button" onClick={() => close()}>
              &#10005; {/* Cross sign */}
            </button>
          </div>
          <div className="popup-content">
            <p>{message}</p>
          </div>
          <div className="popup-footer">
            <button
              onClick={() => {
                return title === "Failure" ? null : next();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
