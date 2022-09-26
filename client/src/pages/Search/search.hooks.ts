import axios from "axios";
import { useQuery } from "react-query";

export const useGetList = (query: string) =>
  useQuery("getList", () =>
    axios.get(`/api/items${query}`).then((res) => {
      return res.data;
    })
  );