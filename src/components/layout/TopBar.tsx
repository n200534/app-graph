export function TopBar() {
  return (
    <header className="h-12 border-b bg-background flex items-center justify-between px-4">
      <div className="font-semibold">App Graph Builder</div>
      <div className="flex gap-2 text-sm text-muted-foreground">
        <button>Fit</button>
        <button>Share</button>
      </div>
    </header>
  );
}
