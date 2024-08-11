"use client";
import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import FormInput from "./ui/FormInput";
import { Button } from "./ui/button";
import useSignup from "@ChatApp/hooks/useSignup";

const SignupForm = () => {
  const { formik, loading } = useSignup();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
  } = formik;
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-col-1 md:grid-cols-2 gap-3">
        <FormInput
          label="Name"
          placeholder="Enter Your Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          label="Email"
          placeholder="Enter Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>
      <div className="grid grid-col-1 md:grid-cols-2 gap-3">
        <FormInput
          label="Password"
          placeholder="Enter Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormInput
          label="Profile Photo"
          type="file"
          accept="image/*"
          id="profile_photo"
          onChange={(e: any) => {
            const file = e.target.files![0];
            if (file && file.size > 10 * 1024 * 1024) {
              setFieldError("profile_photo", "File size is too large");
              return false;
            } else {
              setFieldValue("profile_photo", file);
            }
          }}
          error={errors.profile_photo}
        />
      </div>
      <div className="text-right">
        Have an Account{" "}
        <Link href="/login" className="text-blue-700 text-bold">
          Login?
        </Link>
      </div>
      <Button type="submit" size={"lg"} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {loading ? "Please Wait" : "Signup"}
      </Button>
    </form>
  );
};

export default SignupForm;
