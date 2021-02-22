import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { BreadcrumbContext } from "../context/BreadcrumbContext";

const Breadcrumb = ({ search }) => {//Search por props con contenido de la busqueda
  search = search.toLowerCase();
  search = search.charAt(0).toUpperCase() + search.slice(1);//Se cambia el formato de escritura de la entrada de la busqueda en minusculas con mayuscula incial

  const [breadcrumb, setBreadcrumb] = useContext(BreadcrumbContext);//Consulta a context de bradcrumb

  //Render Breadcrumb con datos del context
  return (
    <div className="container">
      <div className="row">
        <div className="bann_breadcrumb col-10 offset-1">
          {breadcrumb?.length > 0 ? (
            breadcrumb.map((element, index) => (
              <Link className="prop_breadcrumb" key={index} to={"/"}>
                {element}
                {breadcrumb.length > index+1 ? (<FontAwesomeIcon className="svg_breadcrumb" icon={faAngleRight}/>):(null)}
              </Link>
              
            )) 
          ) : (
            <div className="prop_breadcrumb" to={"/"}>
              {(search = search.charAt(0).toUpperCase() + search.slice(1))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
