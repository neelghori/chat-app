"use client";

import { Label } from "@radix-ui/react-label";
import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "./input";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useFormikContext } from "formik";

const FormInput: React.FC<any> = (props) => {
  const [selectedImage, setSelectedImage] = useState<
    string | null | ArrayBuffer
  >((props.imageurl as string) ?? "");
  const inputFile = useRef(null);
  const formik = useFormikContext();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!props.error || props.error.trim() !== "") {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
      props.onChange?.(event);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Label htmlFor={props.id}>{props.label}</Label>
        {props.infoMessage ? (
          <p className="text-slate-400 text-xs">{props.infoMessage}</p>
        ) : null}
      </div>
      <Input
        {...props}
        imageurl={""}
        onChange={(e) => {
          return props.type == "file"
            ? handleImageChange(e)
            : props.onChange?.(e);
        }}
        ref={inputFile}
      />
      {props.error && (
        <small className={`text-red-600 pl-3 text-xs`}>{props.message}</small>
      )}
      {props.type == "file" && selectedImage && !props.error && (
        <div className="relative w-60 h-60 bg-gray-200 rounded-md p-10">
          <div
            className="absolute top-2 right-2 z-50"
            onClick={() => {
              if (inputFile.current) {
                //@ts-ignore
                inputFile!.current!.value = "";
              }
              setSelectedImage("");
              formik.setFieldValue(props.id as string, "");
            }}
          >
            <Cross1Icon className="w-5 h-5 cursor-pointer" />
          </div>
          <Image
            src={selectedImage as string}
            alt="no Image"
            fill
            className="p-5"
          />
        </div>
      )}
    </div>
  );
};

export default FormInput;
