
// Game related endpoints
export const getAllGames = "/games_list/games/";
export const getSingleGame = "/games_list/game/";
export const order = "/games_list/orders/"
export const getGenres = "/games_list/genres/"


// authentication related endpoints
export const authLogin = "/auth/api/token/"
export const authLogout = "/auth/api/token/refresh/"
export const authRegister = "/auth/register/"


// community related endpoints
export const profileGet = "/community/profile/"
export const allProfilesGet = "/community/profiles/"
export const steamGames = "/games_list/steamapi/"


// reviews endpoints
export const reviewGet = "/games_list/reviews/"
export const reviewPost = "/games_list/new_review/"