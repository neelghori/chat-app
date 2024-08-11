import axios from "axios";
import Cookies from "universal-cookie";

export default async function ApiCall(
  url: string,
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE",
  body?: any,
  header?: any,
  Externaltoken?: string
) {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      // timeout: 10000,
      headers: {
        Authorization: Externaltoken
          ? `Bearer ${Externaltoken}`
          : token
          ? `Bearer ${token}`
          : "",
        "Content-Type": "application/json",
      },
    });

    switch (method) {
      case "GET":
        return await instance
          .get(url)
          .then((data) => data.data)
          .catch((error) => error.response.data);

      case "POST":
        return await instance
          .post(url, body, header)
          .then((data) => data.data)
          .catch((error) => error.response.data);

      case "PUT":
        return await instance
          .put(url, body, header)
          .then((data) => data.data)
          .catch((error) => error.response.data);

      case "DELETE":
        return await instance
          .delete(url, header)
          .then((data) => data.data)
          .catch((error) => error.response.data);
      default:
        return null;
    }
  } catch (error: any) {
    return {
      status: {
        code: error.status,
        status: false,
      },
      message: error.message,
      data: null,
      errors: true,
    };
  }
}
