import type { DirectiveBinding } from 'vue';

type ExtendedHTMLElement = HTMLElement & {
  clickOutsideEvent: (e: MouseEvent) => void
}

const clickOutside = {
  created(el: HTMLElement, binding: DirectiveBinding) {
    (el as ExtendedHTMLElement).clickOutsideEvent = (
      event: MouseEvent
    ) => {
      if (
        el.isEqualNode(event.target as Node) ||
        el.contains(event.target as Node) ||
        typeof binding.value !== 'function'
      ) {
        return
      }
      binding.value(event)
    }
    document.body.addEventListener(
      'click',
      (el as ExtendedHTMLElement).clickOutsideEvent
    )
  },
  beforeUnmount(el: HTMLElement) {
    document.body.removeEventListener(
      'click',
      (el as ExtendedHTMLElement).clickOutsideEvent
    )
  },
};

export { clickOutside };
