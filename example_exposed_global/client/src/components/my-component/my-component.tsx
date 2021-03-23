import { Component, h, Prop, Build } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop()
  people: any[];

  async componentWillLoad() {
    try {
      if (Build.isServer) {
        // @ts-ignore
        const people = await global.dataProvider<any[]>('people');
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
