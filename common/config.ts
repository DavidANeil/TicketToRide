
export const API = '/api';
export const loginAPI = API + '/login';
export const registerAPI = API + '/register';
export const gameListAPI = API + '/gamelist';
export const createGameAPI = API + '/creategame';
export function getGameListingAPI(gameId: string): string {
  return API + '/listing/' + gameId;
}

export function getPlayerAPI(playerId: string): string {
  return API + '/player/' + playerId;
}

export const authenticationCookie = 'ttruserauthentication';


export const worldPollIntervalMS = 3000;
export const gamePollIntervalMS = 1000;