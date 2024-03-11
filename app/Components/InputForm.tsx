"use client";

import React from "react";
import { match } from "ts-pattern";

import { SeePasswordIcon } from "@/icons";

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  labelName: string;
  placeholder: string;
  type: string;
  id: string;
};

const InputForm: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ labelName, placeholder, type, id, ...restProps }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <label htmlFor={id} className={"flex flex-col text-sm relative"}>
      {labelName}
      <input
        {...restProps}
        ref={ref}
        placeholder={placeholder}
        type={isPasswordVisible ? "text" : "password"}
        className={
          "border-b-grayishBlue border-b-2 h-12 w-80 pl-4 rounded-t focus-visible:outline-none bg-transparent focus-visible:border-b-turquoise"
        }
        id={id}
      />
      {match(type)
        .with("password", () => (
          <button
            onClick={(event) => {
              event.preventDefault();
              handleToggleVisibility();
            }}
            className={
              "absolute top-2/3 right-4 transform -translate-y-1/2 bg-transparent border-none"
            }
          >
            <SeePasswordIcon />
          </button>
        ))
        .otherwise(() => null)}
    </label>
  );
};

export default React.forwardRef(InputForm);
