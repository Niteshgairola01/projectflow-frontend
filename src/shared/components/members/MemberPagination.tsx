interface Props {
  page: number;
  totalPages: number;
  total: number;
  start: number;
  end: number;
  onPageChange: (page: number) => void;
}

export default function MemberPagination({ page, totalPages, total, start, end, onPageChange }: Props) {
  if (!total) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/20 px-4 py-3 text-sm sm:px-6">
      <p aria-live="polite" className="text-muted-foreground">Showing {start}–{end} of {total} members</p>
      <nav aria-label="Member pagination" className="flex items-center gap-3">
        <button type="button" className="rounded-lg border px-3 py-1 disabled:opacity-40" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button type="button" className="rounded-lg border px-3 py-1 disabled:opacity-40" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
      </nav>
    </div>
  );
}
