import React, {InputHTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: (value: string) => void;
  onEnterKey?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  suffix?: string;
};

const PostTitleInput: React.FC<Props> = ({
  value,
  onChange,
  onEnterKey,
  suffix,
  className,
  ...rest
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATUS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="flex-grow">
      <input
        {...rest}
        value={value}
        className={twMerge("up-input", className || false)}
        onKeyDown={event => {
          if (event.key === "Enter" && onEnterKey) {
            event.preventDefault();
            onEnterKey(event);
          }
        }}
      />
      {suffix && (
        <span className="block flex-shrink-0 rounded-e-md bg-gray-200 px-4 py-2">
          {suffix}
        </span>
      )}
    </div>
  );
};

export default PostTitleInput;
