"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ApiCall from "@ChatApp/lib/ApiCall";
import * as Yup from "yup";
import { toast } from "sonner";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValue = {
    email: "",
    password: "",
    name: "",
    profile_photo: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Name is Required"),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    profile_photo: Yup.mixed().required("Profile Photo is Required"),
  });
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const formDataToSend = new FormData();
      for (const key in values) {
        //@ts-ignore
        formDataToSend.append(key, values[key]);
      }
      const response: any = await ApiCall("register", "POST", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response!.errors) {
        toast.success(response.message);
        resetForm();
        router.push("/login");
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

export default useSignup;
