import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

function Carts() {
  const [totalPrice, settotalPrice] = useState(0);
  const [totalItems, settotalItems] = useState(0);
  const [state, dispatch] = useContext(StateContext);

  useEffect(() => {
    settotalPrice(
      state.carts.reduce(
        (acc, currentValue) =>
          acc + Number(currentValue.price) * currentValue.qyt,
        0
      )
    );
    settotalItems(
      state.carts.reduce((acc, currentValue) => acc + currentValue.qyt, 0)
    );
  }, [state.carts]);
  if (state.carts.length !== 0) {
    return (
      <>
        <h1 className="cart-heading">Cart</h1>
        <p className="cart-details">
          Total-Items : <span>{totalItems}</span>
        </p>
        <p className="cart-details">
          Total-Price : <span>${totalPrice}</span>
        </p>
        {state.carts.map((cartItem) => {
          return (
            <React.Fragment key={cartItem.id}>
              <div className="cart-item">
                <div className="cart-item-main">
                  <div className="cart-item-img">
                    <img src={cartItem.thumbnail} alt="error" />
                  </div>
                  <div className="cart-item-details">
                    <p className="cart-item-product">{cartItem.product}</p>
                    <p className="cart-item-price">
                      Price : <span>${cartItem.price * cartItem.qyt}</span>
                    </p>
                  </div>
                </div>
                <div className="qyt-btn">
                  <button
                    onClick={() => {
                      if (cartItem.qyt === 1) {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          value: cartItem.id,
                        });
                      } else {
                        dispatch({
                          type: "CHANGE_QTY",
                          value: {
                            id: cartItem.id,
                            qyt: cartItem.qyt - 1,
                          },
                        });
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{cartItem.qyt}</span>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "CHANGE_QTY",
                        value: {
                          id: cartItem.id,
                          qyt: cartItem.qyt + 1,
                        },
                      });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  }
  return (
    <>
      <h1 className="cart-heading">Cart</h1>
      <p className="empty-cart">Cart is Empty</p>
    </>
  );
}

export default React.memo(Carts);
