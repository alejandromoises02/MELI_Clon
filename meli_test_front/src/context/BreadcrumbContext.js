import React, { useState } from 'react';

export const BreadcrumbContext = React.createContext([]);//Context para almacenar datos para el armado del breadcrumb

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState([]);

  return (
    <BreadcrumbContext.Provider value={[breadcrumb, setBreadcrumb]}>
      {children}
    </BreadcrumbContext.Provider>
  );
};