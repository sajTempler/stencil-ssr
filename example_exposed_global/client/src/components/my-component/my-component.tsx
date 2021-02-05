import { Component, h, Prop, Build } from '@stencil/core';
import { People, DataProviderType } from 'data_contract';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop()
  people: People[];

  async componentWillLoad() {
    try {
      if (Build.isServer) {
        const people = await global.dataProvider<People[]>(DataProviderType.PEOPLE);
        this.people = people;
      }

    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <div>{this.people?.map(person => <p>{person.name}</p>)}</div>;
  }
}
