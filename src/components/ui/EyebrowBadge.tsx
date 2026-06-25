export function EyebrowBadge({
  children,
  variant = "orange",
}: {
  children: React.ReactNode;
  variant?: "orange" | "dark" | "light";
}) {
  const styles = {
    orange: "bg-[var(--color-orange)] text-white",
    dark: "bg-[var(--color-navy)] text-white",
    light: "bg-white text-[var(--color-navy)]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
