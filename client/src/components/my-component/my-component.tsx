import { Component, h, Prop, Build } from '@stencil/core';
import got from 'got';

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

        const response = await got('http://localhost:3000/api');

        this.people = JSON.parse(response.body);
      }

    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return <div>{this.people?.map(person => <p>{person?.name}</p>)}</div>;
  }
}
