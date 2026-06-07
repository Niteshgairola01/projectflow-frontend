interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ children, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      disabled={isLoading || props.disabled}
      {...props}
      className="w-full rounded-md bg-blue-600 px-4 text-white disabled:opacity-50"
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
