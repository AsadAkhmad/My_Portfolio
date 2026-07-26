"use client";

export function DeleteButton({
  action,
  id,
  confirmText = "Delete this entry? This can't be undone.",
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-500 hover:underline">
        Delete
      </button>
    </form>
  );
}
