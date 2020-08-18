import { UPDATE_ARTICLES } from "../constants/constants";
export function updateData(data) {
  return {
    type: UPDATE_ARTICLES,
    payload: data,
  };
}
