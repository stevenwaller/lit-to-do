import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';

@customElement('to-do-form')
export class ToDoForm extends LitElement {
  static styles = css``;

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

  renderCancelButton() {
    if (this.editMode) {
      return html`<button type="button" @click=${this.handleCancel}>
        Cancel
      </button>`;
    }

    return null;
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <input
          id="input"
          type="text"
          .value=${this.value}
          placeholder="Enter something to do"
          aria-label=${this.editMode ? 'Edit to do' : 'Add new to do'}
        />
        <button type="button" @click=${this.handleClear}>Clear</button>
        ${this.renderCancelButton()}
        <button type="submit">${this.editMode ? 'Save' : 'Add'}</button>
      </form>
    `;
  }
}
