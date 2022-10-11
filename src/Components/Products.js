import React, { useContext } from "react";
import { StateContext } from "../App";

function Products() {
  const [state, dispatch] = useContext(StateContext);
  return (
    <>
      {state.products.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <div className="product-cart">
              <div className="product-img">
                <img src={product.images[0]} alt="error" />
              </div>
              <div className="product-details">
                <p className="product-details-title">{product.title}</p>
                <p className="product-details-price">${product.price}</p>
              </div>
              {state.carts.some((cartItem) => cartItem.id === product.id) ? (
                <button
                  className="btn btn-red"
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", value: product.id })
                  }
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="btn btn-green"
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      value: {
                        id: product.id,
                        thumbnail: product.thumbnail,
                        price: product.price,
                        product: product.title,
                        qyt: 1,
                      },
                    })
                  }
                >
                  Add to Cart
                </button>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default React.memo(Products);
