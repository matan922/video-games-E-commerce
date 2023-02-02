const myToken = JSON.parse(localStorage.getItem("token") as string)
const accessToken = myToken ? myToken.access : "";
console.log(accessToken)
export let config = {
  headers: { 'Authorization': `Bearer ${accessToken}` }
}
