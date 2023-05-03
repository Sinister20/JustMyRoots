
import { GLOBAL_STORE_UPDATE_BY_KEY } from './constants';


export function updateGlobelStoreByKeyVal(payload) {
  return {
    type: GLOBAL_STORE_UPDATE_BY_KEY,
    payload
  };
}
