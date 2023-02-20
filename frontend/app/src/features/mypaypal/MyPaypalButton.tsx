import React from "react";
import { PayPalScriptProvider, PayPalButtons   } from "@paypal/react-paypal-js";
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

const MyPaypalButton = () => {
  const zip = useAppSelector(selectZip);
  const city = useAppSelector(selectCity);
  const full_name = useAppSelector(selectFullName);
  const total = useAppSelector(selectTotal);
  const address = useAppSelector(selectAddress);
  const cart = useAppSelector(selectCartList);
  const dispatch = useAppDispatch();


  const orderData = {
    city: city,
    full_name: full_name,
    address: address,
    zip: zip,
  }

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
          disabled={!(zip && city && full_name && address)}
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
          onApprove={(data: any,actions: any) => {
            return actions.order?.capture().then((details: any) => {
                dispatch(orderAsync({ orderData, orderDetails: cart }))
                toast.success("Success!")
                localStorage.removeItem("cart")
                window.location.replace("/")
            })
            // .catch((error:any) => {
            //     toast.error("Error in transaction, please try again.")
            // })
          }}
          onError= {() => {
            toast.error("There was an error with the payment, try again.")
          }}
          onCancel= {() => {
            toast.error("Transaction has been cancelled.")
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default MyPaypalButton;
