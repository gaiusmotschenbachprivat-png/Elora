import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 22, children, ...rest }: P) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="square"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconBag = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 8.5h15l-1 12h-13z" />
    <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
  </Svg>
);
export const IconUser = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M4.5 20.5c.8-3.8 3.7-5.8 7.5-5.8s6.7 2 7.5 5.8" />
  </Svg>
);
export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </Svg>
);
export const IconPlus = (p: P) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const IconMinus = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);
export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="m5 12.5 4.3 4.3L19 7.2" />
  </Svg>
);
export const IconAlert = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.6v5.4M12 16.2v.2" />
  </Svg>
);
export const IconChevron = (p: P) => (
  <Svg {...p}>
    <path d="m9 5.5 6.5 6.5L9 18.5" />
  </Svg>
);
export const IconInstagram = (p: P) => (
  <Svg {...p}>
    <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="4.6" />
    <circle cx="12" cy="12" r="3.8" />
  </Svg>
);
export const IconTikTok = (p: P) => (
  <Svg {...p}>
    <path d="M13.6 3.6v11.2a3.4 3.4 0 1 1-3.4-3.4" />
    <path d="M13.6 3.6c.3 2.6 2.1 4.4 4.8 4.6" />
  </Svg>
);
export const IconPinterest = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m10.8 10.2-2.3 10M9.6 15c3.3 1.6 6.6-.4 6.6-4.1a4.2 4.2 0 0 0-8.4 0c0 .9.2 1.6.7 2.2" />
  </Svg>
);
