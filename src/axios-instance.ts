import axios from "axios";
import { baseApi } from "@/settings/site.settings";

const instance = axios.create({
  baseURL: baseApi,
});

export default instance;
