import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('lit-to-do-form')
export class LitToDoForm extends LitElement {
  static styles = css``;

  @query('input')
  private _inputRef!: HTMLInputElement;

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this._inputRef.value) {
      const newEvent = new CustomEvent('submit', {
        detail: { value: this._inputRef.value },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(newEvent);

      this._inputRef.value = '';
    }
  }

  handleClear() {
    this._inputRef.value = '';
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <input
          id="input"
          type="text"
          placeholder="Enter something to do"
          aria-label="Add new to do"
        />
        <button type="button" @click="${this.handleClear}">Clear</button>
        <button type="submit">Add</button>
      </form>
    `;
  }
}
