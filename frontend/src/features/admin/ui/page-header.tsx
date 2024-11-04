import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string | React.ReactNode;
};

const PageTitle: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="mb-4 mt-4 flex justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </div>
  );
};

export default PageTitle;
