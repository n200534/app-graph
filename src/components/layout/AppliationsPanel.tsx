export function ApplicationsPanel() {
  return (
    <aside className="w-[300px] border-r bg-background p-4">
      <h2 className="text-sm font-semibold mb-3">Application</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search..."
          className="flex-1 h-8 rounded bg-muted px-2 text-sm"
        />
        <button className="h-8 w-8 rounded bg-primary text-primary-foreground">
          +
        </button>
      </div>

      <ul className="space-y-2">
        <li className="h-10 rounded bg-muted px-3 flex items-center">
          supertokens-golang
        </li>
        <li className="h-10 rounded bg-muted px-3 flex items-center">
          supertokens-java
        </li>
      </ul>
    </aside>
  );
}
