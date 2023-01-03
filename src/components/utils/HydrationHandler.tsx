import { ReactNode } from 'react';

const HydrationHandler = ({ children }: { children: ReactNode }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

export default HydrationHandler;
