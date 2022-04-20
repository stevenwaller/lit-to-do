import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './lit-to-do-form';
import './lit-to-do-item';

@customElement('lit-to-do')
export class LitToDo extends LitElement {
  @property({ type: String }) title = 'To Do';

  @property({ type: Array }) items: String[] = ['first item'];

  static styles = css``;

  handleSubmit(event: CustomEvent) {
    this.items = [...this.items, event.detail];
  }

  render() {
    return html`
      <section>
        <h1>${this.title}</h1>
        <lit-to-do-form @submit="${this.handleSubmit}"></lit-to-do-form>
        <ul>
          ${this.items.map(
            item => html`<lit-to-do-item>${item}</lit-to-do-item>`
          )}
        </ul>
      </section>
    `;
  }
}
