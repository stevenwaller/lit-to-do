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
      border: 2px solid black;
      border-radius: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      height: 40px;
      font-size: 16px;
      font-weight: bold;
      padding: 5px 10px;
    }

    .input:focus {
      outline: none;
      border-color: #00c1fc;
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
      background-color: black;
      color: white;
    }

    .action-btn:focus {
      outline: none;
      border-color: #00c1fc;
      background-color: #00c1fc;
    }

    .action-btn svg {
      fill: white;
    }

    .action-btn--secondary {
      background-color: white;
      color: black;
      border-left: none;
    }

    .action-btn--secondary svg {
      fill: black;
    }

    .action-btn--icon {
      width: 40px;
      padding: 0;
      line-height: 0;
    }

    .action-btn--text {
      padding: 10px 10px;
    }

    .action-btn:last-child {
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

  renderButtons() {
    if (this.editMode) {
      return html`
        <button
          class="action-btn action-btn--icon action-btn--secondary"
          type="button"
          aria-label="Cancel"
          title="Cancel"
          @click=${this.handleCancel}
        >
          ${icons.closeThin}
        </button>
        <button
          class="action-btn action-btn--icon"
          type="submit"
          aria-label="Save"
          title="Save"
        >
          ${icons.checkThin}
        </button>
      `;
    }

    return html`
      <button class="action-btn action-btn--text" type="submit">Add</button>
    `;
  }

  render() {
    return html`
      <form class="form" @submit="${this.handleSubmit}">
        <input
          id="input"
          class="input"
          type="text"
          .value=${this.value}
          placeholder="Enter something to do"
          aria-label=${this.editMode ? 'Edit to do' : 'Add new to do'}
        />
        <div class="actions">${this.renderButtons()}</div>
      </form>
    `;
  }
}
