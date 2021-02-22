import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { navigate } from "@reach/router";
import LogoIcon from "./LogoIcon";
import SearchIcon from "./SearchIcon";

const Buscador = () => {
  const history = useHistory(); //Hook para generar la busqueda con enter key
  const [busqueda, setbusqueda] = useState(""); //Hook de estado para almacenar entrada de busqueda

  const busquedaInputChange = (event) => {
    //Funcion para almacenar entrada de input de busqueda
    setbusqueda(event.target.value);
  };

  const OnKeyPress = (e) => {
    //Funcion evento para iniciar la busqueda con enter key
    if (e.which === 13) {
      console.log("enter");
      history.push(`/items?search=${busqueda}`);
    }
  };

  //Render nav y caja de busqueda
  return (
    <div className="navback">
      <div className="container">
        <div className="row">
          <div className="col-10 offset-1 nav_search">
            <LogoIcon />
            <div>
              <input
                type="text"
                name="finder"
                onKeyPress={OnKeyPress}
                onChange={busquedaInputChange}
                placeholder="Nunca dejes de buscar"
                maxLength="120"
              />
              <button type="submit">
                <Link to={`/items?search=${busqueda}`}>
                  <SearchIcon />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buscador;
