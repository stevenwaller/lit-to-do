import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { smallCheckMarkIcon } from './lib/icons';

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
      transition: border 0.2s ease, background-color 0.2s ease;
    }

    .faux-checkbox svg {
      position: relative;
      z-index: 2;
      width: 15px;
      opacity: 0;
      transition: fill 0.2s ease;
    }

    .input:hover + .faux-checkbox,
    .input:focus + .faux-checkbox {
      border-color: #00c1fc;
      background-color: #f9f9f9;
    }

    .input:hover + .faux-checkbox svg,
    .input:focus + .faux-checkbox svg {
      fill: #00c1fc;
    }

    .input:checked + .faux-checkbox {
      background-color: black;
    }

    .input:checked + .faux-checkbox svg {
      opacity: 1;
      fill: white;
    }

    .input:checked:hover + .faux-checkbox,
    .input:checked:focus + .faux-checkbox {
      background-color: #00c1fc;
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
          title="Complete to do"
          .checked=${this.checked}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
        />
        <span class="faux-checkbox"> ${smallCheckMarkIcon} </span>
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
