import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
