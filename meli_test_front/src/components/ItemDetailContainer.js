import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { BreadcrumbContext } from '../context/BreadcrumbContext';
import Breadcrumb from './Breadcrumb';
import ItemDetail from './ItemDetail';


const ItemDetailContainer = () => {
  const [productos, setProductos] = useContext(ProductsContext);//Context para manipular la data de productos   
  const [producto, setProducto] = useState({});//Hook de estado para alamacenar datos del producto a mostrar
  const [breadcrumb, setBreadcrumb] = useContext(BreadcrumbContext);//Context para manipular la data de breadcrumb

  const { id } = useParams();

  useEffect(() => {//Consulta a server por endpoint para datos del producto
    const url = `http://localhost:3001/api/items/${id}`
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setProducto(data.item);
        setBreadcrumb(data.breadcrumb);
        setProductos([]);
      });
  }, [id]);

  //Llamada a componentes breadcrumb y vista de detalles de item

  return (
    <>
      {Object.entries(producto).length > 0 ? (
        <>
          <Breadcrumb search={''} />
          <ItemDetail producto={producto} />
        </>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default ItemDetailContainer;

