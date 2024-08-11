import ApiCall from "@ChatApp/lib/ApiCall";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
const useGetProfile = () => {
  const [userData, setUserData] = useState({});
  const initalValue = {
    name: "",
    profile_photo: "",
  };
  const formik = useFormik({
    initialValues: initalValue,
    validationSchema: Yup.object().shape({
      name: Yup.string().trim().required("Name is Required"),
      profile_photo: Yup.mixed().required("Profile Photo is Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formDataToSend = new FormData();
      for (const key in values) {
        if (key == "profile_photo") {
          //@ts-ignore
          if (!values.profile_photo?.name as string) {
            const splitimageurl = values.profile_photo.split("/");
            formDataToSend.append(key, splitimageurl[splitimageurl.length - 1]);
          } else {
            formDataToSend.append(key, values[key]);
          }
        } else {
          //@ts-ignore
          formDataToSend.append(key, values[key]);
        }
      }
      const response: any = await ApiCall(
        "update/profile",
        "POST",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response!.errors) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
  });
  const getUser = async () => {
    const response = await ApiCall("list/userprofile", "GET");
    if (response && response.data) {
      setUserData(response.data[0]);
      formik.setFieldValue("name", response?.data[0]?.name);
      formik.setFieldValue("profile_photo", response?.data[0]?.profile_photo);
    } else {
      setUserData({});
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return {
    userData,
    formik,
  };
};

export default useGetProfile;
