import React from "react";
import logo from "./logo.png";

import { Link } from "react-router-dom";

let search = window.location.search;
let params = new URLSearchParams(search);
let tokenId = params.get("token");

const Logo = () => {
  return <img src={logo} alt="Gesture Logo" height="50px" />;
};

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        flexBasis: 1,
        width: "100%",
        margin: "10px 0 10px 10px",
      }}
    >
      <div
        style={{
          width: "10%",
          display: "flex",
          color: "#8585ff",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          to={`/history/?token=${tokenId}`}
          style={{ textDecoration: "none", color: "#8585ff" }}
        >
          <i className="fas fa-chevron-circle-left fa-2x"></i>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          width: "80%",
          color: "#8585ff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </div>
    </div>
  );
};

export default NavBar;
