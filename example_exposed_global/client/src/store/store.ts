import { Build } from "@stencil/core";
import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  people: Build.isBrowser ? (window as any).appState?.people : []
});

onChange('people', value => {
  state.people = value;
});

export default state;