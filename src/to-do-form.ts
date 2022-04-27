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
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .form {
      display: flex;
      align-items: stretch;
    }

    .input-wrapper {
      position: relative;
      flex: 1 0 auto;
    }

    .input {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      border: 2px solid black;
      margin-right: 10px;
      border-radius: 0;
      height: 40px;
      font-size: 16px;
      font-weight: bold;
      padding: 5px 10px;
    }

    .input:focus {
      outline: none;
      border-color: #00c1fc;
    }

    .clear-btn {
      -webkit-appearance: none;
      appearance: none;
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      background: none;
      padding: 0;
      display: none;
    }

    .clear-icon {
      width: 10px;
    }

    .actions {
      flex: 0 0 auto;
      font-size: 0;
    }

    .action-btn {
      height: 100%;
      -webkit-appearance: none;
      appearance: none;
      border: 2px solid black;
      background: none;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
    }

    .action-btn:first-child {
    }

    .action-btn:focus {
      outline: none;
      border-color: #00c1fc;
      background-color: #00c1fc;
    }

    .action-btn--secondary {
      background-color: white;
      color: black;
      border-left: none;
      /* border-right-color: white; */
    }

    .action-btn--secondary svg {
      fill: black;
    }

    .action-btn--primary {
      background-color: black;
      color: white;
    }

    .action-btn--primary svg {
      fill: white;
    }

    .action-btn--text {
      padding: 10px 10px;
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

  handleClear() {
    this._inputElement.value = '';
  }

  handleCancel() {
    this._inputElement.value = '';

    const newEvent = new CustomEvent('on-cancel');

    this.dispatchEvent(newEvent);
  }

  renderButtons() {
    if (this.editMode) {
      return html`
        <button
          class="action-btn action-btn--secondary"
          type="button"
          aria-label="Cancel"
          title="Cancel"
          @click=${this.handleCancel}
        >
          ${icons.closeThin}
        </button>
        <button
          class="action-btn action-btn--primary"
          type="submit"
          aria-label="Save"
          title="Save"
        >
          ${icons.checkThin}
        </button>
      `;
    }

    return html`
      <button
        class="action-btn action-btn--primary action-btn--text"
        type="submit"
      >
        Save
      </button>
    `;
  }

  render() {
    return html`
      <form class="form" @submit="${this.handleSubmit}">
        <div class="input-wrapper">
          <input
            id="input"
            class="input"
            type="text"
            .value=${this.value}
            placeholder="Enter something to do"
            aria-label=${this.editMode ? 'Edit to do' : 'Add new to do'}
          />
          <button
            class="clear-btn"
            type="button"
            @click=${this.handleClear}
            aria-label="Clear input value"
          >
            <svg class="clear-icon" viewBox="0 0 24 24">
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
          </button>
        </div>
        <div class="actions">${this.renderButtons()}</div>
      </form>
    `;
  }
}
