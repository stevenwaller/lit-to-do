import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import icons from './lib/icons';

@customElement('action-button')
export class ToDoCheckbox extends LitElement {
  static styles = css`
    .action-btn {
      position: relative;
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }

    .action-btn:after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      content: '';
      background-color: #f1f1f1;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transform: scale(0);
      transition: transform ease 0.3s;
    }

    .action-btn:focus {
      outline: none;
    }

    .action-btn:hover::after,
    .action-btn:focus::after {
      transform: scale(1);
    }

    .action-btn:hover svg,
    .action-btn:focus svg {
      fill: #00c1fc;
    }

    .action-btn svg {
      position: relative;
      z-index: 2;
    }
  `;

  @property({ type: String }) 'action-type': 'edit' | 'delete' = 'edit';

  @property({ type: String }) label: string | undefined;

  handleClick() {
    const newEvent = new CustomEvent('click', {
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(newEvent);
  }

  renderIcon() {
    switch (this['action-type']) {
      case 'edit':
        return icons.edit;
      case 'delete':
        return icons.trash;
      default:
        return null;
    }
  }

  render() {
    return html`
      <button
        class="action-btn"
        @click=${this.handleClick}
        aria-label=${ifDefined(this.label)}
        title=${ifDefined(this.label)}
      >
        ${this.renderIcon()}
      </button>
    `;
  }
}
