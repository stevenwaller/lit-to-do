import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import './lit-to-do-form';
import './lit-to-do-item';

const uniqueId = () => Math.floor(Math.random() * Date.now()).toString();

interface IItem {
  id: string;
  value: string;
  completed: boolean;
}

@customElement('lit-to-do')
export class LitToDo extends LitElement {
  @property({ type: String }) title = 'To Do';

  @property({ type: Array }) items: IItem[] = [
    {
      id: uniqueId(),
      value: 'Example to do',
      completed: false,
    },
  ];

  @property({ type: Array }) completedItems: IItem[] = [];

  static styles = css``;

  handleFormSubmit(event: CustomEvent) {
    this.items = [
      ...this.items,
      {
        id: uniqueId(),
        value: event.detail.value,
        completed: false,
      },
    ];
  }

  handleItemDelete(event: CustomEvent) {
    if (event.detail.completed) {
      this.completedItems = this.completedItems.filter(
        item => item.id !== event.detail.id
      );
    } else {
      this.items = this.items.filter(item => item.id !== event.detail.id);
    }
  }

  handleItemChange(event: CustomEvent) {
    console.log(event.detail);
    if (event.detail.completed) {
      // find the item and remove it
      this.items = this.items.filter(item => item.id !== event.detail.id);

      // add item to completed
      this.completedItems = [event.detail, ...this.completedItems];
    } else {
      // find the item and remove it
      this.completedItems = this.completedItems.filter(
        item => item.id !== event.detail.id
      );

      // add item to completed
      this.items = [...this.items, event.detail];
    }
    // this.items = this.items.map(item => {
    //   if (item.id === event.detail.id) {
    //     return { ...item, completed: event.detail.completed };
    //   }

    //   return item;
    // });
  }

  renderItems(items: IItem[]) {
    return repeat(
      items,
      item => item.id,
      item => html`
        <lit-to-do-item
          id="${item.id}"
          value="${item.value}"
          ?completed="${item.completed}"
          @change="${this.handleItemChange}"
          @delete="${this.handleItemDelete}"
        ></lit-to-do-item>
      `
    );
  }

  render() {
    return html`
      <section>
        <h1>${this.title}</h1>
        <lit-to-do-form @submit="${this.handleFormSubmit}"></lit-to-do-form>
        <ul>
          ${this.renderItems(this.items)}
        </ul>
        <hr />
        <ul>
          ${this.renderItems(this.completedItems)}
        </ul>
      </section>
    `;
  }
}
