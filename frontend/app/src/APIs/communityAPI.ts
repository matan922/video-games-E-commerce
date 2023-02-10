import axios from "axios";
import { getConfig } from "../globalVariables/config";
import { allProfilesGet, profileGet } from "../globalVariables/endpoints";
import { Profile } from "../models/CommunityInterfaces";



export const getProfile = (id: string) => {
  return new Promise<{ data: Profile }>((resolve) =>
    axios.get(profileGet + id).then((res) => {
      resolve({ data: res.data })
    })
  );
}

export const getMyProfile = () => {
  return new Promise<{ data: Profile }>((resolve) =>
    axios.get(profileGet, getConfig()).then((res) => {
      resolve({ data: res.data["profile"] })
    })
  );
}

export const editMyProfile = (updateData: any) => {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";
  let config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }

  return new Promise<{ data: Profile }>((resolve) =>
    axios.put(profileGet, updateData, config).then((res) => {
      console.log({ data: res.data["profile"] })
      resolve({ data: res.data["profile"] })
    })
  );
}


export const getAllProfiles = () => {
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(allProfilesGet).then((res) => {
      resolve({ data: res.data })
    })
  )
}


export const searchProfiles = (searchQuery: string) => {
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(allProfilesGet, { params: { search: searchQuery } }).then((res) => resolve({ data: res.data }))
  );
}



