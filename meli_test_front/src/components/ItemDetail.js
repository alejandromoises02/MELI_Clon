import React, { useContext, useEffect, useState } from 'react';

const ItemDetail = ({ producto }) => {//Recepcion por props producto a mostrar 
  //Render de datos de productos en vista “/items/:id”
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='item_datail col-10 offset-1'>
            <img src={producto.picture} />
            <div>
              <h4>
                {producto.condition === 'new' ? 'Nuevo' : 'Usado'} -{' '}
                {producto.sold_quantity} vendidos
              </h4>
              <h3>{producto.title}</h3>
              <h1>
                {producto?.price?.currency === 'ARS' && '$ '}
                {producto?.price?.amount
                  .toString()
                  .split('')
                  .reverse()
                  .join('')
                  .replace(/(?=\d*\.?)(\d{3})/g, '$1.')
                  .split('')
                  .reverse()
                  .join('')
                  .replace(/^[\.]/, '')}
              </h1>
              <button type='button'>Comprar</button>
            </div>
            <div>
              <h2>Descripción del Producto</h2>
              <p>{producto.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
