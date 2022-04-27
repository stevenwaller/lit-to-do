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
  static styles = css`
    .container {
      background-color: #fff;
      border-radius: 20px;
      padding: 20px 20px;
      box-shadow: 0px 5px 48px 0px rgba(0, 0, 0, 0.35);
    }

    .form {
      margin-bottom: 15px;
    }

    .title {
      margin: 0 0 15px 0;
    }

    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: 1px solid #e5e5e5;
    }
  `;

  @property({ type: String }) title = 'To Do List';

  @property({ type: Array }) items: IToDoItem[] = [];

  @property({ type: Array }) completedItems: IToDoItem[] = [];

  connectedCallback() {
    const storedItems = localStorage.getItem('items');
    const storedCompletedItems = localStorage.getItem('completed-items');

    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }

    if (storedCompletedItems) {
      this.completedItems = JSON.parse(storedCompletedItems);
    }

    super.connectedCallback();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.get('items')) {
      localStorage.setItem('items', JSON.stringify(this.items));
    }

    if (changedProperties.get('completedItems')) {
      localStorage.setItem(
        'completed-items',
        JSON.stringify(this.completedItems)
      );
    }
  }

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
      <section class="container">
        <h1 class="title">${this.title}</h1>
        <to-do-form class="form" @on-submit=${this.handleAddItem}></to-do-form>
        <ul class="list">
          ${this.renderItems(this.items)}
        </ul>
        <hr />
        <ul class="list">
          ${this.renderItems(this.completedItems)}
        </ul>
      </section>
    `;
  }
}
