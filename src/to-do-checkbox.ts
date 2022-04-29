import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import icons from './lib/icons';

@customElement('to-do-checkbox')
export class ToDoCheckbox extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      width: 100%;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .checkbox-wrapper {
      flex: 0 1 auto;
      position: relative;
      margin-right: 15px;
      line-height: 0;
    }

    .input {
      position: relative;
      width: 25px;
      height: 25px;
      z-index: 2;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }

    .faux-checkbox {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 1;
      width: 25px;
      height: 25px;
      border: 2px solid black;
      border-radius: 50%;
      background-color: white;
      transition: border 0.2s ease;
    }

    .faux-checkbox::after {
      position: absolute;
      content: '';
      z-index: 1;
      background-color: #f9f9f9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .faux-checkbox svg {
      position: relative;
      z-index: 2;
      width: 15px;
      opacity: 0;
      transition: fill 0.2s ease;
    }

    .input:hover + .faux-checkbox {
      border-color: #00c1fc;
    }

    .input:focus + .faux-checkbox {
      border-color: #00c1fc;
    }

    .input:hover + .faux-checkbox::after,
    .input:focus + .faux-checkbox::after {
      transform: scale(1);
      opacity: 1;
    }

    .input:hover + .faux-checkbox svg,
    .input:focus + .faux-checkbox svg {
      fill: #00c1fc;
    }

    .input:checked + .faux-checkbox svg {
      opacity: 1;
    }

    .label {
      flex: 1 1 auto;
      pointer-events: none;
      font-weight: bold;
    }

    .label.is-checked {
      text-decoration: line-through;
    }
  `;

  @property({ type: String }) id!: string;

  @property({ type: String }) label!: string;

  @property({ type: Boolean }) checked = false;

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target) {
      const newEvent = new CustomEvent('change', {
        detail: { checked: target.checked },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(newEvent);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      const target = event.target as HTMLInputElement;

      if (target) {
        const newEvent = new CustomEvent('change', {
          detail: { checked: !target.checked },
          bubbles: true,
          composed: true,
        });

        this.dispatchEvent(newEvent);
      }
    }
  }

  render() {
    return html`
      <span class="checkbox-wrapper">
        <input
          id="${this.id}"
          class="input"
          type="checkbox"
          .checked=${this.checked}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
        />
        <span class="faux-checkbox"> ${icons.checkMark} </span>
      </span>
      <label
        for="${this.id}"
        class="label ${classMap({ 'is-checked': this.checked })}"
      >
        ${this.label}
      </label>
    `;
  }
}
