import React, { createContext, useReducer } from 'react';

const ProductosContext = createContext();

const productosReducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_PRODUCTO':
      return [...state, action.payload];
    case 'EDITAR_PRODUCTO':
      return state.map((producto) =>
        producto.id === action.payload.id ? { ...producto, ...action.payload.data } : producto
      );
    case 'ELIMINAR_PRODUCTO':
      return state.filter((producto) => producto.id !== action.payload);
    default:
      return state;
  }
};

const ProductosProvider = ({ children }) => {
  const [productos, dispatch] = useReducer(productosReducer, []);

  const agregarProducto = (producto) => {
    dispatch({ type: 'AGREGAR_PRODUCTO', payload: { ...producto, id: Date.now() } });
  };

  const editarProducto = (id, data) => {
    dispatch({ type: 'EDITAR_PRODUCTO', payload: { id, data } });
  };

  const eliminarProducto = (id) => {
    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: id });
  };

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
};

export { ProductosContext, ProductosProvider };
