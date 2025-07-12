const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const container = {
    paddingRight: "12px",
    paddingLeft: "12px",
    maxWidth: "600px",
    margin: "0 auto",
};

const logoContainer = (theme: "dark" | "light") => ({
    backgroundColor: theme === "dark" ? "#0a0b0e" : "#ffffff",
    borderRadius: "8px",
    marginTop: "0px",
    padding: "0px",
});

const logo = {
    margin: "12px auto 32px auto",
    display: "block",
};

const h1 = {
    textAlign: "center" as const,
    margin: "32px 0 16px 0",
    fontWeight: "bold",
    fontSize: "24px",
    color: "#333",
    padding: "0",
};

const text = {
    lineHeight: "24px",
    margin: "16px 0",
    fontSize: "13px",
    color: "#333",
};

const button = {
    background: "linear-gradient(90deg, #007bff 50%, #ff2560 100%)", // blue to red gradient
    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
    transition: "background 0.2s",
    textAlign: "center" as const,
    textDecoration: "none",
    padding: "12px 24px",
    margin: "24px auto",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#ffffff",
    display: "block",
    width: "200px",
    border: "none",
};

const link = {
    wordBreak: "break-all" as const,
    textDecoration: "underline",
    color: "#007bff",
    fontSize: "14px",
};

const hr = {
    borderColor: "#e6e6e6",
    margin: "24px 0",
};

const footer = {
    textAlign: "center" as const,
    lineHeight: "16px",
    fontSize: "12px",
    color: "#6c757d",
    margin: "8px 0",
};

export { main, container, logoContainer, logo, h1, text, button, link, hr, footer };
