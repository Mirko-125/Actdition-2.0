import React from "react";
import Navbar from '../components/functionalities/navbar/Navbar.jsx';
import Documentation from "../components/looks/docs/Documentation.jsx";

function HowItWorks() {
  return (
    <>
      <Navbar Page={1}/>
      <Documentation />
    </>
  );
}

export default HowItWorks;
