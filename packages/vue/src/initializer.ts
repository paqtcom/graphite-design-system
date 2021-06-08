import { defineCustomElements } from "@w2wds/core/loader";

/**
 * We need to make sure that the web component fires an event
 * that will not conflict with the user's @way-change binding,
 * otherwise the binding's callback will fire before any
 * v-model values have been updated.
 */
const transformEventName = (eventName: string) =>
  eventName === "way-change" ? "v-way-change" : eventName;

const getHelperFunctions = () => {
  return {
    ael: (el: any, eventName: string, cb: any, opts: any) =>
      el.addEventListener(transformEventName(eventName), cb, opts),
    rel: (el: any, eventName: string, cb: any, opts: any) =>
      el.removeEventListener(transformEventName(eventName), cb, opts),
    ce: (eventName: string, opts: any) =>
      new CustomEvent(transformEventName(eventName), opts),
  };
};

export const initializeWay2WebDesignSystem = async () => {
  if (typeof (window as any) !== "undefined") {
    const { ael, rel, ce } = getHelperFunctions();

    await defineCustomElements(window, {
      ce,
      ael,
      rel,
    } as any);
  }
};
