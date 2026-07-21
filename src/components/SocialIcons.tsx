import type { SVGProps } from "react";

export function RiInstagramFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="insta-grad-fill" x1="2" y1="22" x2="22" y2="2">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="url(#insta-grad-fill)"
        strokeWidth="2.2"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        stroke="url(#insta-grad-fill)"
        strokeWidth="2.2"
        fill="none"
      />
      <circle cx="17.2" cy="6.8" r="1.35" fill="url(#insta-grad-fill)" />
    </svg>
  );
}

export function RiYoutubeFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="4.5" width="20" height="15" rx="4.5" fill="#ff0000" />
      <path d="M9.75 8.5L15.75 12L9.75 15.5V8.5Z" fill="#ffffff" />
    </svg>
  );
}

export function RiLinkedinBoxFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#0a66c2" />
      <circle cx="7.2" cy="7.2" r="1.5" fill="#ffffff" />
      <rect x="5.7" y="10.2" width="3" height="8.1" fill="#ffffff" />
      <path
        d="M10.8 10.2H13.4V11.35C13.8 10.65 14.7 10.1 16.0 10.1C18.4 10.1 19 11.6 19 14.1V18.3H16.4V14.6C16.4 13.5 16.15 12.6 14.9 12.6C13.65 12.6 13.4 13.5 13.4 14.6V18.3H10.8V10.2Z"
        fill="#ffffff"
      />
    </svg>
  );
}
