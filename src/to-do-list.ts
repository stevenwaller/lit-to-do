import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import './to-do-form';
import './to-do-item';

const uniqueId = () => Math.floor(Math.random() * Date.now()).toString();

interface IToDoItem {
  id: string;
  value: string;
  completed: boolean;
}

@customElement('to-do-list')
export class ToDoList extends LitElement {
  static styles = css``;

  @property({ type: String }) title = 'To Do';

  @property({ type: Array }) items: IToDoItem[] = [
    {
      id: uniqueId(),
      value: 'Example to do',
      completed: false,
    },
  ];

  @property({ type: Array }) completedItems: IToDoItem[] = [];

  handleFormSubmit(event: CustomEvent) {
    this.items = [
      {
        id: uniqueId(),
        value: event.detail.value,
        completed: false,
      },
      ...this.items,
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
    if (event.detail.completed) {
      this.items = this.items.filter(item => item.id !== event.detail.id);

      this.completedItems = [event.detail, ...this.completedItems];
    } else {
      this.completedItems = this.completedItems.filter(
        item => item.id !== event.detail.id
      );

      this.items = [...this.items, event.detail];
    }
  }

  renderItems(items: IToDoItem[]) {
    return repeat(
      items,
      item => item.id,
      item => html`
        <to-do-item
          id=${item.id}
          value=${item.value}
          ?completed=${item.completed}
          @change=${this.handleItemChange}
          @delete=${this.handleItemDelete}
        ></to-do-item>
      `
    );
  }

  render() {
    return html`
      <section>
        <h1>${this.title}</h1>
        <to-do-form @submit=${this.handleFormSubmit}></to-do-form>
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
