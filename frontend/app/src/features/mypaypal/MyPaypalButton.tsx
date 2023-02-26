import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCity,
  selectZip,
  selectFullName,
  selectTotal,
  selectAddress,
  selectCartList,
  orderAsync,
} from "../../Reducers/orderSlice";
import { toast } from "react-toastify";
import { orderData } from "../../models/Games";

const MyPaypalButton = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartList);
  const { full_name, address, city, zip, total } = useAppSelector(
    (state) => state.order
  );

  const onApprove = (data: any, action: any) => {
    return action.order?.capture().then((details: any) => {
      dispatch(orderAsync({ orderDetails: cart }));
      toast.success("Success!");
      localStorage.removeItem("cart");
      window.location.replace("/");
    });
  };

  const initialOptions = {
    "client-id":
      "AY_C3wNYUFG2a1B7FEL4ePgWaAFcnVczmpPj5GAfsuxMIXNMMisI3--EpbI8kMmqQa4DaAX74bPFQxRT",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          disabled={!(zip && city && full_name && address) || total === 0}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: String(total),
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            });
          }}
          onApprove={onApprove}
          onError={() => {
            toast.error("There was an error with the payment, try again.");
          }}
          onCancel={() => {
            toast.error("Transaction has been cancelled.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default MyPaypalButton;
