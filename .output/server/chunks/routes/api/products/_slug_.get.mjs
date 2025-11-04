import { d as defineEventHandler, g as getRouterParams, c as createError } from '../../../nitro/nitro.mjs';
import { f as findProductBySlug } from '../../../_/products.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _slug__get = defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);
  const product = await findProductBySlug(slug);
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  return product;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
