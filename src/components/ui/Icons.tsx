import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconElectrolyte = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.2c-2.9 3.6-5.6 7-5.6 10.3a5.6 5.6 0 0 0 11.2 0C17.6 10.2 14.9 6.8 12 3.2Z" />
    <path d="m12.6 10.4-2.1 3.4h3l-2.1 3.4" />
  </Svg>
);

export const IconMicronutrient = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="12" cy="5.9" r="1" />
    <circle cx="17.3" cy="15" r="1" />
    <circle cx="6.7" cy="15" r="1" />
    <path d="M12 7v2.8M15.5 14l-1.6-.9M8.5 14l1.6-.9" />
  </Svg>
);

export const IconCitrus = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="6.2" />
    <path d="M12 5.8v12.4M5.8 12h12.4M7.6 7.6l8.8 8.8M16.4 7.6l-8.8 8.8" />
  </Svg>
);

export const IconLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19c0-8 5-13.5 14-14-.2 9-5.6 14-14 14Z" />
    <path d="M5 19 14.5 9.5" />
  </Svg>
);

export const IconDrop = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.2c-2.9 3.6-5.6 7-5.6 10.3a5.6 5.6 0 0 0 11.2 0C17.6 10.2 14.9 6.8 12 3.2Z" />
    <path d="M9.2 14.2a2.9 2.9 0 0 0 2.3 2.6" />
  </Svg>
);

export const IconFlask = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 3.5h5M10.3 3.5v5.4L5 18.2a1.6 1.6 0 0 0 1.4 2.3h11.2a1.6 1.6 0 0 0 1.4-2.3L13.7 8.9V3.5" />
    <path d="M7.4 14.2h9.2" />
  </Svg>
);

export const IconNoCaffeine = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 9h10.2v5.2a4.6 4.6 0 0 1-4.6 4.6h-1a4.6 4.6 0 0 1-4.6-4.6V9Z" />
    <path d="M15.7 10.6h1.2a2.1 2.1 0 0 1 0 4.2h-1.4M8.6 3.8c-.6.9.6 1.6 0 2.6M12.4 3.8c-.6.9.6 1.6 0 2.6" />
    <path d="M3.5 20.5 20.5 3.5" />
  </Svg>
);

export const IconNoTaurine = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.6 3.5h4.8M10.3 3.5v5.4L5 18.2a1.6 1.6 0 0 0 1.4 2.3h11.2a1.6 1.6 0 0 0 1.4-2.3L13.7 8.9V3.5" />
    <path d="M3.5 20.5 20.5 3.5" />
  </Svg>
);

export const IconBalance = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v16M7 20h10M5 7.5h14M12 5.6 5 7.5M12 5.6l7 1.9" />
    <path d="m5 7.5-2.4 5.3a2.6 2.6 0 0 0 4.8 0L5 7.5ZM19 7.5l-2.4 5.3a2.6 2.6 0 0 0 4.8 0L19 7.5Z" />
  </Svg>
);

export const IconSeed = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20.5v-8" />
    <path d="M12 12.5c0-4 2.6-6.6 7-6.8-.1 4.3-2.8 6.8-7 6.8ZM12 14.8c0-3.3-2.2-5.4-5.8-5.6.1 3.5 2.3 5.6 5.8 5.6Z" />
  </Svg>
);

export const IconDocument = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3.5h7.7l4.3 4.3v12.7h-12z" />
    <path d="M14 3.5v4.5h4.5M9 12h6M9 15h6M9 18h3.5" />
  </Svg>
);

export const IconHands = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20.5s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10-7.5 10Z" />
    <path d="M9.2 12.2h5.6M12 9.4V15" />
  </Svg>
);

export const IconMicroscope = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.6 3.5 13 6l-3.4 6-4.4-2.5z" />
    <path d="m10.8 4.8.9-1.6M8 11.5l-1 1.7M5 20.5h14M12.3 20.5a6 6 0 0 0 2.6-10.6" />
    <path d="M8.8 17.3h6.4" />
  </Svg>
);

export const IconSpoon = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="7.2" rx="3.6" ry="4.2" />
    <path d="M12 11.4v9.1" />
  </Svg>
);

export const IconGlass = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 3.5h13l-1.6 15.4a1.8 1.8 0 0 1-1.8 1.6H8.9a1.8 1.8 0 0 1-1.8-1.6z" />
    <path d="M6.4 10.5c2-.9 3.8.9 5.6 0s3.7-.9 5.6 0" />
  </Svg>
);

export const IconStir = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 8h13l-1.4 11a1.8 1.8 0 0 1-1.8 1.5H8.7a1.8 1.8 0 0 1-1.8-1.5z" />
    <path d="M14 3.2 11 15.5" />
    <path d="M8.6 13.4c1.6.9 4.2.9 6.8 0" />
  </Svg>
);

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.8" y="5.2" width="16.4" height="15" rx="2.2" />
    <path d="M3.8 9.8h16.4M8.3 3.4v3.4M15.7 3.4v3.4" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="1.8" />
    <path d="m3.8 6.6 8.2 6.2 8.2-6.2" />
  </Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.3 4.3L19 7.2" />
  </Svg>
);

export const IconAlert = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.6v5.4M12 16.2v.2" />
  </Svg>
);

export const IconInstagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.8" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.1" cy="6.9" r=".6" fill="currentColor" />
  </Svg>
);

export const IconTikTok = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.6 3.6v11.2a3.4 3.4 0 1 1-3.4-3.4" />
    <path d="M13.6 3.6c.3 2.6 2.1 4.4 4.8 4.6" />
  </Svg>
);

export const IconPinterest = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m10.8 10.2-2.3 10M9.6 15c3.3 1.6 6.6-.4 6.6-4.1a4.2 4.2 0 0 0-8.4 0c0 .9.2 1.6.7 2.2" />
  </Svg>
);
