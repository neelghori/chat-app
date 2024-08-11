import SignupForm from "@ChatApp/components/SignupForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Signup",
};
const SignUp = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an new account
            </h1>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
