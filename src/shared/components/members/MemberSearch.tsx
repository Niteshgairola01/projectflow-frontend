import { Input } from "../ui/Input/Input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MemberSearch({ value, onChange }: Props) {
  return (
    <div className="flex w-full items-center gap-2 sm:w-64">
      <Input
        type="search"
        aria-label="Search members by name or email"
        placeholder="Search name or email..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && <button type="button" className="text-sm text-primary" onClick={() => onChange("")}>Clear</button>}
    </div>
  );
}
