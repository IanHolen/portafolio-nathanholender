export default function SectionDivider({ color = "rgba(34,197,94,0.05)" }: { color?: string }) {
  return (
    <div className="relative -my-1 h-16 w-full overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 32C240 0 480 64 720 32C960 0 1200 64 1440 32V64H0V32Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
