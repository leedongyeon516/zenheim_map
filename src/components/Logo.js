import React from "react";

const Logo = ({ switchOn }) => {
  const logoColor = switchOn ? "black" : "white";

  return (
    <a href="https://zenheim.ca">
      <h1 className="logo" style={{ color: logoColor }}>
        Zenheim
      </h1>
    </a>
  );
};

export default Logo;
