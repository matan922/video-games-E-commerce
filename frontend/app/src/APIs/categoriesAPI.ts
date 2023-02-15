import axios from "axios";
import { getGenres, getAllGames } from "../globalVariables/endpoints";
import { selectCategories } from "../Reducers/categoriesSlice";



export function getCategories() {
    return new Promise<{ data: any }>((resolve) =>
      axios.get(getGenres).then((res) => resolve({ data: res.data }))
    );
  }
  
