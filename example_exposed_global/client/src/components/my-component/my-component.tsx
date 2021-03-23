import { Component, h, Build, Element, Prop, Host } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {

  @Element() el;

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

  connectedCallback() {
    setTimeout(() => {
      console.log('calling eryk!', this.people)
      this.people = [{name: 'eryk'}];
      console.log('calling eryk! timeout', this.people)
    }, 1000)
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
      {JSON.stringify(this.people)}
      <div>{this.people?.map(person => <p onClick={e => this.handleClick(e, person)}>{person.name}</p>)}</div>
    </Host>;
  }
}
