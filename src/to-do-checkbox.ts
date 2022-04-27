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
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .checkbox-wrapper {
      flex: 0 1 auto;
      position: relative;
      margin-right: 15px;
      line-height: 0;
    }

    .checkbox {
      position: relative;
      width: 25px;
      height: 25px;
      z-index: 2;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }

    .checkbox:hover + .faux-checkbox {
      background-color: #f1f1f1;
    }

    .checkbox:focus + .faux-checkbox {
      border-color: #00c1fc;
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
    }

    .check-mark {
      width: 15px;
      opacity: 0;
    }

    .is-checked .check-mark {
      opacity: 1;
    }

    .label {
      flex: 1 1 auto;
      pointer-events: none;
      font-weight: bold;
    }

    .is-checked .label {
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

  render() {
    return html`
      <span
        class="checkbox-wrapper ${classMap({ 'is-checked': this.checked })}"
      >
        <input
          id="${this.id}"
          class="checkbox"
          type="checkbox"
          .checked=${this.checked}
          @change=${this.handleChange}
        />
        <span class="faux-checkbox"> ${icons.checkMark} </span>
      </span>
      <label for="${this.id}" class="label"> ${this.label} </label>
    `;
  }
}
