import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "../../shared/hooks/useTheme";

type Props = {
  children: React.ReactNode;
};

const ThemedToaster = () => {
  const { theme } = useTheme();
  return <Toaster theme={theme} position="top-right" richColors />;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <QueryProvider>{children}</QueryProvider>

        <ThemedToaster />
      </ReduxProvider>
    </ThemeProvider>
  );
};
