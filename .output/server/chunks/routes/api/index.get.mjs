import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { a as fetchProducts } from '../../_/products.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const index_get = defineEventHandler(async () => {
  return await fetchProducts();
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
