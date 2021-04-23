import { Component, h, Build, Element, Prop, Host } from '@stencil/core';

import state from '../../store/store';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Element() el: HTMLElement;

  @Prop()
  people: any[];

  async componentWillLoad() {
    if (Build.isServer) {
      try {
        // @ts-ignore
        state.people = await global.dataProvider<string[]>('people');
      } catch (e) {
        console.error(e);
      }
    }

    // this happens directly in store
    // if (Build.isBrowser) {
    //   this.people = state.people;
    // }
  }

  handleClick(_e: Event, person: string) {
    this.people = this.people.map(per => {
      if (person === per) {
        return { name: 'clicked' }
      }

      return { name: person };
    })
  }

  render() {
    return <Host>
      {state.people?.map(person => <p onClick={e => this.handleClick(e, person)}>{person.name}</p>)}
    </Host>;
  }
}
