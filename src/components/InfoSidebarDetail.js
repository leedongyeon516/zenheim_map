import React from "react";

const InfoSidebarDetail = ({ info }) => {
  const infoHandler = () => {
    console.log("a");
  };

  return (
    <div className="info-sidebar-detail" onClick={infoHandler}>
      <h4>{info.properties.ADDRESS}</h4>
      <h5>{info.properties.DESCRIPTION}</h5>
      <p>{info.properties.MODIFIED_DA}</p>
    </div>
  );
};

export default InfoSidebarDetail;
