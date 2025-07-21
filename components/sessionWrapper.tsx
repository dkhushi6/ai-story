"useclient";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
const SessionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default SessionWrapper;
