import { Component, h, Prop, Build } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Prop()
  people: { name: string }[];

  async componentWillLoad() {
    try {
      if (Build.isServer) {

        const people = await (global as any).dataProvider('people');

        this.people = people;
      }

    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <div>{this.people?.map(person => <p>{person?.name}</p>)}</div>;
  }
}
