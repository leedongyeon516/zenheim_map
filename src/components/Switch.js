import React, { useState } from "react";

function Switch({ setSwitchOn }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="toggle-btn-wrapper">
      <div className="toggle-btn" id="_1st-toggle-btn">
        <input
          type="checkbox"
          onClick={() => {
            setIsOn(!isOn);
            setSwitchOn(isOn);
          }}
        />
        <span></span>
      </div>
    </div>
  );
}

export default Switch;
