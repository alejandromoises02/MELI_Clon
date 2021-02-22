import React from "react";
import { Link } from "react-router-dom";
import Logo_ML from "./img/Logo_ML.png";

//Logo MELI nav
const LogoIcon = () => {
  return <Link to={"/"}>{<img alt="Mercado Libre" src={Logo_ML} />}</Link>;
};

export default LogoIcon;
