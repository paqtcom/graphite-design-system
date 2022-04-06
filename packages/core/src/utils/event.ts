//
// Emits a custom event with more convenient defaults.
//
export function emit(el: HTMLElement, name: string, options?: CustomEventInit) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {},
    ...options
  });
  el.dispatchEvent(event);
  return event;
}