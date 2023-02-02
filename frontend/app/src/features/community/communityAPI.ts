import axios from "axios";
import { profileEdit, profileGet } from "../../globalVariables/endpoints";
import { config } from "../../globalVariables/tokenConfig";
import { Profile } from "../../models/CommunityInterfaces";



export const getProfile = () => {
  return new Promise<{ data: Profile }>((resolve) =>
    axios.get(profileGet, config).then((res) => resolve({ data: res.data }))
  );
}

// export const editProfile = () => {
//   return new Promise<{ data: Profile }>((resolve)=>
//   axios.patch(profileEdit, config).then((res)=> console.log({ data: res.data }))
  
//   )
// }