import worker from '../src/index.js';

export async function onRequest(context) {
  // 1. 创建符合原 Worker 预期的 request 对象
  const request = context.request;
  
  // 2. 补齐 context.env 全局环境变量，确保 D1, R2, FormData 等能被正确读取
  const env = context.env;

  // 3. 运行 Worker 逻辑
  return worker.fetch(request, env, context);
}
