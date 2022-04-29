import { html } from 'lit';

const icons = {
  trash: html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"
        fill-rule="nonzero"
      />
    </svg>
  `,
  close: html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          fill="#000"
          fill-rule="nonzero"
          d="M21 5.762 18.238 3 12 9.238 5.762 3 3 5.762 9.238 12 3 18.238 5.762 21 12 14.762 18.238 21 21 18.238 14.762 12z"
        />
        <path d="M0 0h24v24H0z" />
      </g>
    </svg>
  `,
  edit: html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <g fill-rule="nonzero">
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
        />
      </g>
    </svg>
  `,
  checkMark: html`
    <svg class="check-mark" aria-hidden="true" viewBox="0 0 32 32">
      <path
        d="M11.941 28.754 0 16.812l5.695-5.695 6.246 6.246L26.305 3 32 8.695z"
        fill-rule="nonzero"
      />
    </svg>
  `,
  closeThin: html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill-rule="nonzero"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  `,
  checkThin: html`
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill-rule="nonzero"
      />
    </svg>
  `,
  chevron: html`
    <svg width="8" height="12" viewBox="0 0 8 12">
      <path d="M2 0 .59 1.41 5.17 6 .59 10.59 2 12l6-6z" fill-rule="nonzero" />
    </svg>
  `,
};

export default icons;
