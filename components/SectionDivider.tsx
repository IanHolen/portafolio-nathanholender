/* Technical hairline divider — a thin rule with a centered node and edge ticks.
   Replaces the decorative wave; reads like a seam on a control panel. */
export default function SectionDivider({ color }: { color?: string }) {
  void color; // kept for backwards-compat with existing call sites
  return (
    <div className="relative mx-auto h-px w-full max-w-6xl px-6" aria-hidden="true">
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-ink-900/12 to-transparent">
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-accent-green/50 bg-paper" />
      </div>
    </div>
  );
}
