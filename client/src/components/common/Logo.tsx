function Logo({ className }: { className?: string }) {
  return (
    <img
      src="https://placehold.co/300x100?text=LOGO"
      alt="Pennypal"
      className={` ${className}`}
    />
  );
}

export default Logo;
