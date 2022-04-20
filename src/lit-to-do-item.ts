import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-to-do-item')
export class LitToDoItem extends LitElement {
  static styles = css``;

  @property({ type: String }) value = '';

  render() {
    return html` <li><slot></slot></li> `;
  }
}
