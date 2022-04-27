import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('to-do-checkbox')
export class ToDoCheckbox extends LitElement {
  static styles = css`
    .checkbox {
      -webkit-appearance: none;
      appearance: none;
      display: grid;
      place-content: center;
      background-color: none;
      margin: 0 10px 0 0;
      width: 20px;
      height: 20px;
      border: 1px solid black;
      border-radius: 3px;
    }

    .checkbox:checked {
      background-color: #00c1fc;
    }
  `;

  @property({ type: String }) label: string | undefined;

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
      <input
        class="checkbox"
        aria-label=${ifDefined(this.label)}
        type="checkbox"
        .checked=${this.checked}
        @change=${this.handleChange}
      />
    `;
  }
}
