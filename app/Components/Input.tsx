import {
  Input as NextuiInput,
  InputProps as NextuiInputProps,
  Tooltip,
} from "@nextui-org/react";
import { FC, ForwardRefRenderFunction, forwardRef } from "react";

type InputProps = NextuiInputProps;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { errorMessage, id, ...rest },
  ref
) => {
  return (
    <Tooltip
      content={errorMessage as string}
      isDisabled={!errorMessage}
      isOpen={!!errorMessage}
      placement={id !== "secondName" && id !== "number" ? "left" : "right"}
      showArrow={true}
      color="danger"
      offset={15}
    >
      <NextuiInput
        {...rest}
        ref={ref}
        variant="underlined"
        classNames={
          !errorMessage
            ? {
                inputWrapper:
                  "border-grayishBlue after:bg-turquoise hover:border-grayishBlue",
              }
            : {
                inputWrapper:
                  "border-danger after:bg-turquoise hover:border-danger",
              }
        }
      />
    </Tooltip>
  );
};
export default forwardRef(Input);
