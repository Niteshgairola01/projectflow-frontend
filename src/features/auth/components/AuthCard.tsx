type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, children }: Props) => {
  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>

      {children}
    </div>
  );
};

export default AuthCard;
