import type { Component } from 'vue';

import EsTableSelect from './es-table-select.vue';

export type {
  EsTableSelectEmits,
  EsTableSelectProps,
  TableSelectOption,
} from './types';

export { EsTableSelect };

export default EsTableSelect as Component;
