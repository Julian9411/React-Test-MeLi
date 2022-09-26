import axios from "axios";
import { useQuery } from "react-query";

export const useGetItemDescription = (id: string) =>
  useQuery("getItemDescription", () =>
    axios.get(`/api/items/${id}`).then((res) => {
      return res.data;
    })
  );