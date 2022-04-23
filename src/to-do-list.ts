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

  handleAddItem(event: CustomEvent) {
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

  handleItemComplete(event: CustomEvent) {
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

  handleItemEdit(event: CustomEvent) {
    function getItemsWithEdit(items: IToDoItem[], itemToEdit: IToDoItem) {
      return items.map(item => {
        if (item.id === itemToEdit.id) {
          return {
            ...item,
            value: itemToEdit.value,
          };
        }

        return item;
      });
    }

    if (event.detail.completed) {
      this.completedItems = getItemsWithEdit(this.completedItems, event.detail);
    } else {
      this.items = getItemsWithEdit(this.items, event.detail);
    }
  }

  renderItems(items: IToDoItem[]) {
    return repeat(
      items,
      item => item.id,
      item => html`
        <to-do-item
          id=${item.id}
          .value=${item.value}
          ?completed=${item.completed}
          @on-complete=${this.handleItemComplete}
          @on-edit=${this.handleItemEdit}
          @on-delete=${this.handleItemDelete}
        ></to-do-item>
      `
    );
  }

  render() {
    return html`
      <section>
        <h1>${this.title}</h1>
        <to-do-form @on-submit=${this.handleAddItem}></to-do-form>
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
