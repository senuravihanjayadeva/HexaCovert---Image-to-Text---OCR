import React from "react";

export default function NavbarComponent() {
  return (
    <div
      style={{
        margin: "0px 10%",
        backgroundColor: "#035691",
        color: "white",
        borderBottomRightRadius: "30px",
        borderBottomLeftRadius: "30px",
        padding: "1%",
      }}
    >
      <center>
        {" "}
        <span
          className="text-center"
          style={{ fontSize: "30px", fontFamily: "'Poppins', sans-serif" }}
        >
          HexaConvert | Convert Image to Text
        </span>
      </center>
    </div>
  );
}
