type IconName =
  | "arrow-right"
  | "arrow-down"
  | "arrow-up-right"
  | "copy"
  | "check"
  | "plus"
  | "minus"
  | "keyboard"
  | "mail";

const paths: Record<Exclude<IconName, "keyboard" | "copy" | "mail">, string> = {
  "arrow-down": "M12 4v16m-6-6 6 6 6-6",
  "arrow-right": "M4 12h16m-6-6 6 6-6 6",
  "arrow-up-right": "M5 19 19 5M5 5h14v14",
  check: "m5 12 4 4L19 6",
  minus: "M5 12h14",
  plus: "M5 12h14M12 5v14",
};

export default function HomeIcon({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      width="24"
    >
      {name === "keyboard" && (
        <>
          <rect height="14" rx="2" width="20" x="2" y="5" />
          <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" />
        </>
      )}
      {name === "copy" && (
        <>
          <rect height="14" rx="2" width="13" x="8" y="8" />
          <path d="M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
        </>
      )}
      {name === "mail" && (
        <>
          <rect height="16" rx="2" width="20" x="2" y="4" />
          <path d="m2 6 10 7L22 6" />
        </>
      )}
      {name !== "keyboard" && name !== "copy" && name !== "mail" && (
        <path d={paths[name]} />
      )}
    </svg>
  );
}
