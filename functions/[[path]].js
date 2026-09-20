import worker from '../src/index.js';

export async function onRequest(context) {
  return worker.fetch(context.request, context.env, {
    waitUntil: context.waitUntil.bind(context),
    passThroughOnException: () => {},
  });
}
