export const getConfig = () => {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";
  console.log(accessToken)
  return {
    headers: {
      "Authorization": `Bearer ${accessToken}`}
  };
};
