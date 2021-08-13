import { ListResponse, cities, Params, students } from "typeData";
import axiosClient from "./axiosClient";

const studentApi = {
  getAll: (params: Params): Promise<ListResponse<students>> => {
    //dinh nghia ham nay tra ve 1 promise se tra ve 1 mang cac cities
    const url = "/students";
    return axiosClient.get(url, {
      params: params,
    });
  },
  getbyId: (id: string): Promise<students> => {
    const url = "/students/" + id;
    return axiosClient.get(url);
  },
  addStudent: (data: students): Promise<students> => {
    const url = "/students";
    return axiosClient.post(url, data);
  },
  updateStudent: (data: students): Promise<students> => {
    const url = `/students/${data.id}`; //
    return axiosClient.patch(url, data);
  },
  removeStudent: (id: string): Promise<any> => {
    const url = "/students/" + id;
    return axiosClient.delete(url);
  },
};
export default studentApi;
