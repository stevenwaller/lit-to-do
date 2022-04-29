import { html } from 'lit';

export const chevronIcon = html`
  <svg width="8" height="12" viewBox="0 0 8 12">
    <path d="M2 0 .59 1.41 5.17 6 .59 10.59 2 12l6-6z" fill-rule="nonzero" />
  </svg>
`;

export const xIcon = html`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M19 6.813 17.187 5 12 10.187 6.813 5 5 6.813 10.187 12 5 17.187 6.813 19 12 13.813 17.187 19 19 17.187 13.813 12z"
    />
  </svg>
`;

export const checkMarkIcon = html`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M21 6.813 19.187 5 9 15.187 4.813 11 3 12.813 7.187 17 9 18.813 10.813 17z"
      fill-rule="nonzero"
    />
  </svg>
`;

export const smallCheckMarkIcon = html`
  <svg class="check-mark" aria-hidden="true" viewBox="0 0 32 32">
    <path
      d="M11.941 28.754 0 16.812l5.695-5.695 6.246 6.246L26.305 3 32 8.695z"
      fill-rule="nonzero"
    />
  </svg>
`;

export const pencilIcon = html`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <g fill-rule="nonzero">
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
      />
    </g>
  </svg>
`;

export const trashIcon = html`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"
      fill-rule="nonzero"
    />
  </svg>
`;
