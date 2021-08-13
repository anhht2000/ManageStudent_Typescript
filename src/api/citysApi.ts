import { ListResponse, cities } from "typeData";
import axiosClient from "./axiosClient";

const citysApi = {
  getAll: (): Promise<ListResponse<cities>> => {
    //dinh nghia ham nay tra ve 1 promise se tra ve 1 mang cac cities
    const url = "/cities";
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};
export default citysApi;
