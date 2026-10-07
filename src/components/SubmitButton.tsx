import React from "react";
type Props = {
  children?: React.ReactNode;
};

const SubmitButton = (props: Props) => {
  return (
    <button className="bg-purple-600 text-white w-26 h-12 rounded-lg hover:opacity-50 transition-opacity cursor-pointer">
      {props.children}
    </button>
  );
};

export default SubmitButton;
