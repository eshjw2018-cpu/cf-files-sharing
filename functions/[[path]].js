import worker from '../src/index.js';

export async function onRequest(context) {
  // 1. 获取原始请求 URL
  const url = new URL(context.request.url);

  // 2. 重新构建 Request 对象，确保 url 和 headers 完整传递
  const request = new Request(url.toString(), context.request);

  // 3. 将 request、env 和 context 一并传给原本的 worker
  return worker.fetch(request, context.env, context);
}
