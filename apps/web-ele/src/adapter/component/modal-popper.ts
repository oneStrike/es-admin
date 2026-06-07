import type { ComputedRef, InjectionKey } from 'vue';

import { computed, inject } from 'vue';

export type EsModalPopperAppendTo = HTMLElement | undefined;

export const ES_MODAL_POPPER_APPEND_TO_KEY: InjectionKey<
  ComputedRef<EsModalPopperAppendTo>
> = Symbol('ES_MODAL_POPPER_APPEND_TO_KEY');

export function useEsModalPopperAppendTo() {
  return inject(
    ES_MODAL_POPPER_APPEND_TO_KEY,
    computed<EsModalPopperAppendTo>(() => undefined),
  );
}
