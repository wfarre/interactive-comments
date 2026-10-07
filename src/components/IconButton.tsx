import React from "react";

type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
};

const IconButton = (props: Props) => {
  return (
    <button
      className={`${props.label === "Delete" ? "text-red-500" : "text-purple-600"} hover:opacity-50 transition-opacity cursor-pointer flex items-center gap-2`}
      onClick={props.onClick}
    >
      <img src={props.icon} alt={props.label} className="inline-block" />
      {props.label}
    </button>
  );
};

export default IconButton;
