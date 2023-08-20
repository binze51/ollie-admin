import axios from "axios";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

// //通用请求类型
type Request = {
  path: string,
  method: string,
  body: string | null
}

//通用请求回调
export async function generalHttpHandler({path, method, body}: Request) {
  const  _handler= instance({
    method: "post",
    url:  "/v3/login",
    data: {
      "username": "jojo",
      "password": "aa123456",
    }
  })
  return _handler
}

export function createInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_API || "/",
    //跨域不需要凭证
    withCredentials: false,
  });
}

const instance = createInstance();

instance.interceptors.request.use(
  async config => {
    const token = await localforage.getItem("reqtoken");
    //TODO 这里需要判断jwt是否过期。过期时再次使用retoken来注定续签再请求
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  },
  error => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.error("unexpected network err ", error);
      // Message.error('服务繁忙');
      return Promise.reject(error);
    } else {
      const navigate = useNavigate();
      if (error.response.status === 401) {
        navigate("/login");
      } else if (error.response.status == 403) {
        navigate("/403");
      }
      return Promise.reject(error);
    }
  }
);

