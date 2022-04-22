import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { ToDoList } from '../src/to-do-list.js';
import '../src/lit-to-do/lit-to-do';

describe('ToDoList', () => {
  let element: ToDoList;
  beforeEach(async () => {
    element = await fixture(html`<to-do-list></to-do-list>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
