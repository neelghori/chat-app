import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ChatApp/components/ui/dialog";
import { Loader2, User } from "lucide-react";
import { Button } from "./ui/button";
import useGetProfile from "@ChatApp/hooks/useGetProfile";
import FormInput from "./ui/FormInput";
const UpdateProfile = () => {
  const { formik } = useGetProfile();
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldError,
    setFieldValue,
  } = formik;

  return (
    <Dialog>
      <DialogTrigger>
        <User className="mr-2 h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
              label="Profile Photo"
              type="file"
              accept="image/*"
              imageurl={values.profile_photo}
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
          <DialogFooter>
            <Button type="submit">
              {formik.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {formik.isSubmitting ? "Please Wait" : "Update Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
