import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import './to-do-form';
import './to-do-checkbox';

@customElement('to-do-item')
export class ToDoItem extends LitElement {
  static styles = css`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .item {
      display: flex;
      align-items: center;
      padding: 4px 0;
      margin: 0;
      border-bottom: 1px solid #f1f1f1;
    }

    .item:hover {
      /* background-color: #f1f1f1; */
    }

    .checkbox-wrapper {
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

    .is-completed .check-mark {
      opacity: 1;
    }

    .label {
      flex: 1 0 auto;
      pointer-events: none;
      font-weight: bold;
    }

    .is-completed .label {
      text-decoration: line-through;
    }

    .actions {
      flex: 0 0 auto;
    }

    .action-btn {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
    }
  `;

  @property({ type: String }) id = '';

  @property({ type: String }) value = '';

  @property({ type: Boolean }) completed = false;

  @state() isEditing = false;

  private get _toDoItem() {
    return {
      id: this.id,
      value: this.value,
      completed: this.completed,
    };
  }

  handleCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const newEvent = new CustomEvent('on-complete', {
      detail: { ...this._toDoItem, completed: target.checked },
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
        <li
          id=${this.id}
          class="item ${classMap({ 'is-completed': this.completed })}"
        >
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
        class="item ${classMap({ 'is-completed': this.completed })}"
      >
        <span class="checkbox-wrapper">
          <input
            id="${this.id}-checkbox"
            class="checkbox"
            type="checkbox"
            .checked=${this.completed}
            @change=${this.handleCheckboxChange}
          />
          <span class="faux-checkbox">
            <svg class="check-mark" aria-hidden="true" viewBox="0 0 32 32">
              <path
                d="M11.941 28.754 0 16.812l5.695-5.695 6.246 6.246L26.305 3 32 8.695z"
                fill="#231F20"
                fill-rule="nonzero"
              />
            </svg>
          </span>
        </span>
        <label for="${this.id}-checkbox" class="label"> ${this.value} </label>
        <span class="actions">
          <button
            class="action-btn"
            @click=${this.handleEdit}
            aria-label="Edit to do"
            title="Edit to do"
          >
            <svg width="24" height="24">
              <g fill="none" fill-rule="evenodd">
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
                  fill="#000"
                  fill-rule="nonzero"
                />
                <path d="M0 0h24v24H0z" />
              </g>
            </svg>
          </button>
          <button
            class="action-btn"
            @click=${this.handleDelete}
            aria-label="Delete to do"
            title="Delete to do"
          >
            <svg width="24" height="24">
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
        </span>
      </li>
    `;
  }
}
