import worker from '../src/index.js';

export async function onRequest(context) {
  // 1. 获取上下文中的 request 和 env
  const { request, env } = context;

  // 2. 构造符合原 Worker 要求的 executionContext
  const ctx = {
    waitUntil: (promise) => context.waitUntil(promise),
    passThroughOnException: () => context.passThroughOnException(),
  };

  // 3. 将包含 formData 和完整 Method 的请求直接透传给 Worker
  return worker.fetch(request, env, ctx);
}
