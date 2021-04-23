import { Component, h, Build, Element, Prop, Host, State } from '@stencil/core';

import state from '../../store/store';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Element() el: HTMLElement;

  @Prop()
  people: { name: string }[];

  @State() logged: boolean = false;

  async componentWillLoad() {
    if (Build.isServer) {
      try {
        // @ts-ignore
        state.people = (await global.dataProvider())?.people;
        // @ts-ignore
        state.restricted = (await global.dataProvider())?.restricted;
      } catch (e) {
        console.error(e);
      }
    }

    // for client data is initialized directly in store
  }

  handleClick(_e: Event, person: { name: string }) {
    state.people = state.people.map(({name}) => {
      if (person.name === name) {
        return { name: `${name} clicked!` }
      }

      return { name };
    })
  }

  parseCookie() {
    const [cookieName, value] = document.cookie.split('=');
    return { [cookieName]: value };
  }

  render() {
    return <Host>
      <h1>People:</h1>
      {state.people?.map(person => <p onClick={e => this.handleClick(e, person)}>{person.name}</p>)}

      <h2>Restricted access:</h2>
      {state.restricted?.map(val => <p>{val}</p>)}
    </Host>;
  }
}
