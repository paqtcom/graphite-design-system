/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner button in `way-button` should inherit
 * the `aria-label` attribute that developers set directly on `way-button`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export const inheritAttributes = (el: HTMLElement, attributes: string[] = []) => {
  const attributeObject: { [k: string]: any } = {};

  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }
      el.removeAttribute(attr);
    }
  });

  return attributeObject;
}

/**
 * This method is used to add a hidden input to a host element that contains
 * a Shadow DOM. It does not add the input inside of the Shadow root which
 * allows it to be picked up inside of forms. It should contain the same
 * values as the host element.
 *
 * @param container The element where the input will be added
 * @param name The name of the input
 * @param value The value of the input
 * @param disabled If true, the input is disabled
 */
 export const renderHiddenInput = (container: HTMLElement, name: string, value: string | undefined | null, disabled: boolean) => {
    let input = container.querySelector('input.aux-input') as HTMLInputElement | null;
    if (!input) {
      input = container.ownerDocument!.createElement('input');
      input.type = 'hidden';
      input.classList.add('aux-input');
      container.appendChild(input);
    }
    input.disabled = disabled;
    input.name = name;
    input.value = value || '';
};

export const addEventListener = (el: any, eventName: string, callback: any, opts?: any) => {
  if (typeof (window as any) !== 'undefined') {
    const win = window as any;
    const config = win && win.Ionic && win.Ionic.config;
    if (config) {
      const ael = config.get('_ael');
      if (ael) {
        return ael(el, eventName, callback, opts);
      } else if (config._ael) {
        return config._ael(el, eventName, callback, opts);
      }
    }
  }

  return el.addEventListener(eventName, callback, opts);
};

export const removeEventListener = (el: any, eventName: string, callback: any, opts?: any) => {
  if (typeof (window as any) !== 'undefined') {
    const win = window as any;
    const config = win && win.Ionic && win.Ionic.config;
    if (config) {
      const rel = config.get('_rel');
      if (rel) {
        return rel(el, eventName, callback, opts);
      } else if (config._rel) {
        return config._rel(el, eventName, callback, opts);
      }
    }
  }

  return el.removeEventListener(eventName, callback, opts);
};

// TODO: Remove usage of this function with renderHiddenInput and remove this function 
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