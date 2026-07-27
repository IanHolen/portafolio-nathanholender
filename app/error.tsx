"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="font-display text-4xl font-light text-ink-900">
        Algo salió mal
      </h2>
      <p className="mt-4 max-w-md text-ink-600">
        Ocurrió un error inesperado. Intenta recargar la página.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-ink-900 px-8 py-4 text-sm font-medium text-paper transition hover:bg-ink-900/90"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
