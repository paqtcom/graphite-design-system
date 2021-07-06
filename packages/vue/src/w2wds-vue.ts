import { App, Plugin } from "vue";
import { initialize } from "@w2wds/core/components";

/**
 * We need to make sure that the web component fires an event
 * that will not conflict with the user's @way-change binding,
 * otherwise the binding's callback will fire before any
 * v-model values have been updated.
 */
const toKebabCase = (eventName: string) =>
  eventName === "way-change"
    ? "v-way-change"
    : eventName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

const getHelperFunctions = () => {
  return {
    ael: (el: any, eventName: string, cb: any, opts: any) =>
      el.addEventListener(toKebabCase(eventName), cb, opts),
    rel: (el: any, eventName: string, cb: any, opts: any) =>
      el.removeEventListener(toKebabCase(eventName), cb, opts),
    ce: (eventName: string, opts: any) =>
      new CustomEvent(toKebabCase(eventName), opts),
  };
};

export const Way2WebDesignSystemVue: Plugin = {
  async install(_: App) {
    if (typeof (window as any) !== "undefined") {
      const { ael, rel, ce } = getHelperFunctions();
      initialize({
        _ael: ael,
        _rel: rel,
        _ce: ce,
      });
    }
  },
};
