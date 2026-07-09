import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  subtitle,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal
      className={center ? "mx-auto text-center" : ""}
      style={{ maxWidth: 640, marginBottom: 36 }}
    >
      <span
        className="eyebrow"
        style={{ color: dark ? "#D8C3A5" : "#8B6849" }}
      >
        {eyebrow}
      </span>
      <h2
        className="h2"
        style={{ color: dark ? "#F6F2EB" : "#22352A", margin: "12px 0 0" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            marginTop: 12,
            fontSize: 16.5,
            lineHeight: 1.6,
            color: dark ? "rgba(246,242,235,.78)" : "#5b5f56",
          }}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
