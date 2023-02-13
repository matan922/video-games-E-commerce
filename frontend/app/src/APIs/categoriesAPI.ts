import axios from "axios";
import { getGenres } from "../globalVariables/endpoints";



export function getCategories() {
    return new Promise<{ data: any }>((resolve) =>
      axios.get(getGenres).then((res) => resolve({ data: res.data }))
    );
  }
  