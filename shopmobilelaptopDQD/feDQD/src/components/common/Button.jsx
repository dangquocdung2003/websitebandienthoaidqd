export default function Button({ children, className = "", ...rest }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold
                  ring-1 ring-inset ring-white/40 hover:ring-white/70 transition
                  ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
