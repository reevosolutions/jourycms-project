"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color={"#e5d3a5"}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgressProvider;
