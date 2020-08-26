import React from "react";
import InfoSidebarDetail from "./InfoSidebarDetail";

const InfoSidebar = ({ data }) => {
  return (
    <>
      <div className="info-sidebar">
        {data.default.features.map(info => (
          <InfoSidebarDetail info={info} key={info.properties.PARK_ID} />
        ))}
      </div>
    </>
  );
};

export default InfoSidebar;
