import axios from "axios";
import { getConfig } from "../globalVariables/config";
import { order } from "../globalVariables/endpoints";
import { CartInterface, orderData } from "../models/Games";


export function makeOrder(orderData: orderData, orderDetails: CartInterface[]) {
    return new Promise<{ data: any }>((resolve) =>
      axios.post(order, { "orderData": orderData, "orderDetails": orderDetails }, getConfig()).then((res) => resolve({ data: res.data }))
    );
  }
  