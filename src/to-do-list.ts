import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

  @state() touchedItemId: string | null = null;

  @state() editingItemId: string | null = null;

  connectedCallback() {
    const storedItems = localStorage.getItem('items');
    const storedCompletedItems = localStorage.getItem('completed-items');

    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }

    if (storedCompletedItems) {
      this.completedItems = JSON.parse(storedCompletedItems);
    }

    document.addEventListener('touchstart', this.handleTouchStart);

    super.connectedCallback();
  }

  disconnectedCallback() {
    document.removeEventListener('touchstart', this.handleTouchStart);

    super.disconnectedCallback();
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

  handleItemChange(event: CustomEvent) {
    function getItemsWithChange(items: IToDoItem[], itemToEdit: IToDoItem) {
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
      this.completedItems = getItemsWithChange(
        this.completedItems,
        event.detail
      );
    } else {
      this.items = getItemsWithChange(this.items, event.detail);
    }

    this.editingItemId = null;
  }

  handleItemEditing(event: CustomEvent) {
    if (event.detail.isEditing) {
      this.editingItemId = event.detail.id;
    } else {
      this.editingItemId = null;
    }
  }

  handleTouchStart = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.tagName.toLowerCase() !== 'to-do-list') {
      if (target.tagName.toLowerCase() === 'to-do-item') {
        if (this.touchedItemId !== target.id) {
          this.touchedItemId = target.id;
        }
      } else if (this.touchedItemId !== null) {
        this.touchedItemId = null;
      }
    }
  };

  renderItems(items: IToDoItem[]) {
    if (items.length <= 0) {
      return null;
    }

    return html`
      <ul class="list">
        ${repeat(
          items,
          item => item.id,
          item => html`
            <to-do-item
              id=${item.id}
              .value=${item.value}
              ?completed=${item.completed}
              ?isTouched=${item.id === this.touchedItemId}
              ?isEditing=${item.id === this.editingItemId}
              @on-complete=${this.handleItemComplete}
              @on-change=${this.handleItemChange}
              @on-edit-mode=${this.handleItemEditing}
              @on-delete=${this.handleItemDelete}
            ></to-do-item>
          `
        )}
      </ul>
    `;
  }

  render() {
    return html`
      <section class="container" @touchstart=${this.handleTouchStart}>
        <h1 class="title">${this.title}</h1>
        <to-do-form class="form" @on-submit=${this.handleAddItem}></to-do-form>
        ${this.renderItems(this.items)}
        ${this.completedItems.length > 0 ? html`<hr />` : null}
        ${this.renderItems(this.completedItems)}
      </section>
    `;
  }
}
