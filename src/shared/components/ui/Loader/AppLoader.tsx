interface AppLoaderProps {
  message?: string
}

const AppLoader = ({ message }: AppLoaderProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />

        <div className="space-y-1 text-center">
          <h2 className="text-sm font-semibold text-foreground">ProjectFlow</h2>

          <p className="text-xs text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
