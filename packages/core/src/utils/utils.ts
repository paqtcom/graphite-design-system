export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function renderInputOutsideShadowRoot(container: HTMLElement, name: string, value: string | null) {
  let input = container.querySelector("input.hidden-input") as HTMLInputElement | null;
  if (!input) {
      input = container.ownerDocument.createElement("input");
      input.type = "hidden";
      input.classList.add("hidden-input");
      container.appendChild(input);
  }
  input.name = name;
  input.value = value || "";
}