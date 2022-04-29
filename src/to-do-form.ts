import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';

import icons from './lib/icons';

@customElement('to-do-form')
export class ToDoForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .form {
      display: flex;
      align-items: stretch;
    }

    .input {
      flex: 1 0 auto;
      -webkit-appearance: none;
      appearance: none;
      height: 40px;
      padding: 5px 10px;
      margin: 0;
      border: 2px solid black;
      border-right: 0;
      border-radius: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: border 0.2s ease, background-color 0.2s ease;
    }

    .input:hover,
    .input:focus {
      outline: none;
      border-color: #00c1fc;
    }

    .buttons {
      flex: 0 0 auto;
      font-size: 0;
    }

    .button {
      flex: 0 0 auto;
      -webkit-appearance: none;
      appearance: none;
      height: 40px;
      margin: 0;
      border: 2px solid black;
      background: none;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      background-color: black;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease, border-color 0.2s ease,
        color 0.2s ease;
    }

    .button svg {
      fill: white;
      transition: fill 0.2s ease;
    }

    .button:hover,
    .button:focus {
      outline: none;
      background-color: #00c1fc;
      border-color: #00c1fc;
      color: white;
    }

    .button:hover svg,
    .button:focus svg {
      fill: white;
    }

    .button--secondary {
      background-color: white;
      color: black;
    }

    .button--secondary svg {
      fill: black;
    }

    .button--secondary:hover,
    .button--secondary:focus {
      background-color: #f9f9f9;
      color: black;
    }

    .button--secondary:hover svg,
    .button--secondary:focus svg {
      fill: #00c1fc;
    }

    .button--icon {
      width: 40px;
      padding: 0;
      line-height: 0;
    }

    .button--text {
      padding: 10px 10px;
    }

    .button:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `;

  @property({ type: String }) value = '';

  @property({ type: Boolean }) editMode = false;

  @query('input')
  private _inputElement!: HTMLInputElement;

  firstUpdated() {
    this._inputElement.focus();
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this._inputElement.value) {
      const newEvent = new CustomEvent('on-submit', {
        detail: { value: this._inputElement.value },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(newEvent);

      this._inputElement.value = '';
    }
  }

  handleCancel() {
    this._inputElement.value = '';

    const newEvent = new CustomEvent('on-cancel');

    this.dispatchEvent(newEvent);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.handleCancel();
    }
  }

  renderButtons() {
    if (this.editMode) {
      return html`
        <button
          class="button button--icon button--secondary"
          type="button"
          aria-label="Cancel"
          title="Cancel"
          @click=${this.handleCancel}
        >
          ${icons.closeThin}
        </button>
        <button
          class="button button--icon"
          type="submit"
          aria-label="Save"
          title="Save"
        >
          ${icons.checkThin}
        </button>
      `;
    }

    return html`
      <button class="button button--text" type="submit">Add</button>
    `;
  }

  render() {
    return html`
      <form
        class="form"
        @submit=${this.handleSubmit}
        @keydown=${this.handleKeyDown}
      >
        <input
          id="input"
          class="input"
          type="text"
          placeholder="Enter something to do"
          aria-label=${this.editMode ? 'Edit to do' : 'Add new to do'}
          .value=${this.value}
        />
        ${this.renderButtons()}
      </form>
    `;
  }
}
