import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { chevronIcon } from './lib/icons';

@customElement('expandable-section')
export class ExpandableSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .container {
      padding: 15px 0 0 0;
    }

    .trigger {
      position: relative;
      -webkit-appearance: none;
      appearance: none;
      border: none;
      background: none;
      margin-bottom: 5px;
      margin-left: 3px;
      padding: 0 0 0 15px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      color: black;
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
        color 0.2s ease;
    }

    .trigger svg {
      position: absolute;
      top: 0;
      left: 0;
      fill: black;
      transition: fill 0.2s ease, transform 0.2s ease;
    }

    .trigger:hover,
    .trigger:focus {
      outline: none;
      color: #00c1fc;
    }

    .trigger:hover svg,
    .trigger:focus svg {
      fill: #00c1fc;
    }

    .content {
      display: none;
      margin-top: 15px;
    }

    .is-expanded .content {
      display: block;
    }

    .is-expanded .trigger svg {
      transform: rotate(90deg);
    }
  `;

  @state() isExpanded = true;

  handleButtonClick() {
    this.isExpanded = !this.isExpanded;
  }

  render() {
    return html`
      <div class="container ${classMap({ 'is-expanded': this.isExpanded })}">
        <button class="trigger" @click=${this.handleButtonClick}>
          ${chevronIcon} Completed
        </button>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
