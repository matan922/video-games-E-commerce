import axios from "axios";
import { getConfig } from "../globalVariables/config";
import { allProfilesGet, profileGet } from "../globalVariables/endpoints";
import { Profile } from "../models/CommunityInterfaces";
import { CommunityPagination } from "../models/PaginationInterfaces";



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
      resolve({ data: res.data })
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
      resolve({ data: res.data })
    })
  );
}


export const getAllProfiles = (pageNumber: number, searchQuery: string) => {
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(allProfilesGet, { params: { page: pageNumber, search: searchQuery } }).then((res) => {
      resolve({ data: res.data["results"] })
    })
  )
}
