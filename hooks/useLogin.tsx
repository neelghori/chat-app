"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Cookies from "universal-cookie";
import ApiCall from "@ChatApp/lib/ApiCall";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValue = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response: any = await ApiCall("login", "POST", { ...values });
      if (!response!.errors) {
        const cookies = new Cookies();
        cookies.set("token", response.data.token);
        toast.success(response.message);
        router.push("/");
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
  });
  return {
    formik,
    loading,
  };
};

export default useLogin;
