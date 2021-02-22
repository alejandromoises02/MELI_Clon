import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { BreadcrumbContext } from '../context/BreadcrumbContext';
import Breadcrumb from './Breadcrumb';
import ItemsDetalContainer from './ItemsDetalContainer';


const Items = () => {
  const [productos, setProductos] = useContext(ProductsContext);//Context para manipular la data de productos   
  const [breadcrumb, setBreadcrumb] = useContext(BreadcrumbContext);//Context para manipular la data de breadcrumb
  const [loading, setLoading] = useState(false);//Hook de estado para mostrar mientras se cargan los productos
  const search = new URLSearchParams(useLocation().search).get('search');//Obtener parametros por ruta

  useEffect(() => {//Consulta a server por endpoint para lista de productos
    const url = `http://localhost:3001/api/items?q=${search}`
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
          setProductos(data.results)
          setBreadcrumb(data.breadcrumb)
      });
  }, [search]);

  //Llamada a componentes breadcrumb y vista de detalles de productos obtenidos
  return (
    <>
    {loading && <span></span>}
    {!loading && <><Breadcrumb search = {search}/>
      <ItemsDetalContainer/></>}
    </>
  );
};

export default Items;
