import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import './to-do-form';
import './to-do-checkbox';
import './action-button';

@customElement('to-do-item')
export class ToDoItem extends LitElement {
  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .item {
      display: flex;
      align-items: center;
      position: relative;
      padding: 5px 0;
      margin: 0;
      border-bottom: 1px solid #e5e5e5;
      font-size: 16px;
      min-height: 49px;
    }

    .item.is-editing {
      padding: 4px 0;
    }

    .actions {
      display: none;
      align-items: center;
      position: absolute;
      font-size: 0;
      top: 0px;
      right: 0;
      background-color: white;
      height: 100%;
      padding-left: 5px;
    }

    .actions::after {
      position: absolute;
      top: 0;
      left: -60px;
      width: 60px;
      height: 100%;
      content: '';
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 95%
      );
    }

    .item.has-visible-actions .actions,
    .item:focus-within .actions {
      display: flex;
    }
  `;

  @property({ type: String }) id = '';

  @property({ type: String }) value = '';

  @property({ type: Boolean }) completed = false;

  @property({ type: Boolean }) isTouched = false;

  @state() isMouseOver = false;

  @state() isEditing = false;

  private _isTouchDevice = matchMedia('(hover: none)').matches;

  private get _toDoItem() {
    return {
      id: this.id,
      value: this.value,
      completed: this.completed,
    };
  }

  handleCheckboxChange(event: CustomEvent) {
    const newEvent = new CustomEvent('on-complete', {
      detail: { ...this._toDoItem, completed: event.detail.checked },
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

    const newEvent = new CustomEvent('on-change', {
      detail: { ...this._toDoItem, value: event.detail.value },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  handleFormCancel() {
    this.isEditing = false;
  }

  handleMouseEnter() {
    if (!this._isTouchDevice) {
      this.isMouseOver = true;
    }
  }

  handleMouseLeave() {
    if (!this._isTouchDevice) {
      this.isMouseOver = false;
    }
  }

  render() {
    if (this.isEditing) {
      return html`
        <li id=${this.id} class="item is-editing">
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
      <li
        id=${this.id}
        class="item ${classMap({
          'has-visible-actions':
            this.isEditing || this.isTouched || this.isMouseOver,
        })}"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <to-do-checkbox
          id="${this.id}-checkbox"
          .checked=${this.completed}
          @change=${this.handleCheckboxChange}
          label=${this.value}
        ></to-do-checkbox>
        <span class="actions">
          <action-button
            label="Edit to do"
            action-type="edit"
            @click=${this.handleEdit}
          ></action-button>
          <action-button
            label="Delete to do"
            action-type="delete"
            @click=${this.handleDelete}
          ></action-button>
        </span>
      </li>
    `;
  }
}
