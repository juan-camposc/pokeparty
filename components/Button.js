export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.base,
        ...styles[variant],
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

const styles = {
  base: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    fontSize: 14,
    fontWeight: "bold",
  },
  primary: {
    backgroundColor: "#4d79ff",
    color: "#fff",
  },
  danger: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
  },
  success: {
    backgroundColor: "#2ecc71",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
  
};
