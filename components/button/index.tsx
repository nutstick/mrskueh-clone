import React from "react";
import cx from "classnames";
import s from "./style.module.css";

interface Props {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ className, disabled, children, onClick }: Props) => {
  return (
    <button
      className={cx(
        "px-4",
        "py-2",
        "rounded-sm",
        s.button,
        disabled && s.disabled,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
