import React, { useEffect, useReducer } from "react";
import "./styles/App.css";
import Products from "./Components/Products";
import Carts from "./Components/Carts";
import getProductsData from "./getProductsData";

export const StateContext = React.createContext();
const initialState = {
  products: [],
  carts: [],
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.value,
      };
    case "HAS_ERROR":
      return {
        ...state,
        hasError: action.value,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        carts: [...state.carts, action.value],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        carts: state.carts.filter((cartItem) => cartItem.id !== action.value),
      };
    case "CHANGE_QTY":
      const res = state.carts.map((cartItem) =>
        cartItem.id === action.value.id
          ? { ...cartItem, qyt: action.value.qyt }
          : { ...cartItem }
      );

      return { ...state, carts: res };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProductsData()
      .then((products) => {
        dispatch({ type: "GET_PRODUCTS", value: products });
      })
      .catch((error) => {
        dispatch({ type: "HAS_ERROR", value: true });
      });
  }, []);

  if (state.hasError === true) {
    return (
      <>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            fontFamily: "Poppins",
          }}
        >
          <p>Something went wrong</p>
          <p>Check your internet</p>
        </div>
      </>
    );
  }
  return (
    <>
      <StateContext.Provider value={[state, dispatch]}>
        <div className="App">
          <div className="carts">
            <Carts />
          </div>
          <div className="products">
            <Products />
          </div>
        </div>
      </StateContext.Provider>
    </>
  );
}

export default App;
