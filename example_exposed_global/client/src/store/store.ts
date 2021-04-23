import { createStore } from "@stencil/store";

type StoreData = {
  people: { name: string }[],
  restricted: string[]
}

const { state, onChange } = createStore<StoreData>({
  people: (window as any)?.appState?.people,
  restricted: (window as any)?.appState?.restricted
});

onChange('people', value => {
  state.people = value;
});

export default state;