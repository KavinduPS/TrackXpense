import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center  bg-Darkgrayishviolet z-10">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-blue-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
