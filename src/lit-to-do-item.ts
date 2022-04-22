import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('lit-to-do-item')
export class LitToDoItem extends LitElement {
  static styles = css``;

  @property({ type: String }) id = '';

  @property({ type: String }) value = '';

  @property({ type: Boolean }) completed = false;

  @query('input')
  private _checkboxRef!: HTMLInputElement;

  getToDoItem() {
    return {
      id: this.id,
      value: this.value,
      completed: this._checkboxRef.checked,
    };
  }

  handleChange() {
    const newEvent = new CustomEvent('change', {
      detail: { ...this.getToDoItem() },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  handleDelete() {
    const newEvent = new CustomEvent('delete', {
      detail: { ...this.getToDoItem() },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  render() {
    return html`
      <li id="${this.id}">
        <input
          type="checkbox"
          aria-label="Mark item as completed"
          .checked="${this.completed}"
          @change="${this.handleChange}"
        />
        ${this.value} <button @click="${this.handleDelete}">Delete</button>
      </li>
    `;
  }
}
