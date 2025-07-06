function Error({ error }) {
  return (
    <div className="error">
      <ProhibitedIcon />
      <p>
        <span className="error__error">Error:</span> {error?.message}
      </p>
    </div>
  );
}

function ProhibitedIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" strokeWidth="2" />
    </svg>
  );
}

export default Error;
