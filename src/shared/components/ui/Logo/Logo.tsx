interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src="/favicon.svg" alt="" width={32} height={32} className="size-8 shrink-0" />
      <span className="text-lg font-bold tracking-tight">Project<span className="text-primary">Flow</span></span>
    </div>
  );
}
