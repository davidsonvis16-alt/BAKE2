/** Lets the navbar ask the menu page to focus its search box, even if the page hasn't mounted yet. */
export const SEARCH_FOCUS_EVENT = 'bm:focus-search';

let pending = false;

export function requestSearchFocus() {
  pending = true;
  window.dispatchEvent(new Event(SEARCH_FOCUS_EVENT));
}

export function consumeSearchFocus() {
  const wasPending = pending;
  pending = false;
  return wasPending;
}
