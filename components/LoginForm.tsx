"use client";
import React from "react";
import Link from "next/link";
import useLogin from "@ChatApp/hooks/useLogin";
import { Loader2 } from "lucide-react";
import FormInput from "./ui/FormInput";
import { Button } from "./ui/button";

const LoginForm = () => {
  const { formik, loading } = useLogin();
  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
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
      <div>
        <FormInput
          label="Password"
          placeholder="Enter Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>
      <div className="text-right">
        <Link href="/register" className="text-blue-700 text-bold">
          Create new account?
        </Link>
      </div>
      <Button type="submit" size={"lg"} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {loading ? "Please Wait" : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
