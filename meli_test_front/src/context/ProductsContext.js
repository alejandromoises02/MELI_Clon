import React, { useState } from 'react';

export const ProductsContext = React.createContext([]);//Context para almacenar el endpoint de productos

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  return (
    <ProductsContext.Provider value={[productos, setProductos]}>
      {children}
    </ProductsContext.Provider>
  );
};
