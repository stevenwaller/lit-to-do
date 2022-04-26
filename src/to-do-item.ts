import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

import './to-do-form';

@customElement('to-do-item')
export class ToDoItem extends LitElement {
  static styles = css``;

  @property({ type: String }) id = '';

  @property({ type: String }) value = '';

  @property({ type: Boolean }) completed = false;

  @state() isEditing = false;

  @query('input')
  private _checkboxElement!: HTMLInputElement;

  private get _toDoItem() {
    return {
      id: this.id,
      value: this.value,
      completed: this._checkboxElement
        ? this._checkboxElement.checked
        : this.completed,
    };
  }

  handleCheckboxChange() {
    const newEvent = new CustomEvent('on-complete', {
      detail: { ...this._toDoItem },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  handleDelete() {
    const newEvent = new CustomEvent('on-delete', {
      detail: { ...this._toDoItem },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  handleEdit() {
    this.isEditing = true;
  }

  handleFormSubmit(event: CustomEvent) {
    this.isEditing = false;

    const newEvent = new CustomEvent('on-edit', {
      detail: { ...this._toDoItem, value: event.detail.value },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  handleFormCancel() {
    this.isEditing = false;
  }

  render() {
    if (this.isEditing) {
      return html`
        <li id="${this.id}">
          <to-do-form
            @on-submit=${this.handleFormSubmit}
            @on-cancel=${this.handleFormCancel}
            .value=${this.value}
            ?editMode=${true}
          ></to-do-form>
        </li>
      `;
    }

    return html`
      <li id="${this.id}">
        <input
          type="checkbox"
          aria-label="Mark item as completed"
          .checked=${this.completed}
          @change=${this.handleCheckboxChange}
        />
        ${this.value} <button @click=${this.handleEdit}>Edit</button>
        <button @click=${this.handleDelete}>Delete</button>
      </li>
    `;
  }
}
