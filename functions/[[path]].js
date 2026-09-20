import worker from '../src/index.js';

export async function onRequest(context) {
  const { request, env } = context;

  // 如果是上传文件请求（POST 并且包含 multipart/form-data）
  if (request.method === 'POST' && request.headers.get('content-type')?.includes('multipart/form-data')) {
    try {
      // 复制一份 request 避免流被一次性读取抛错
      const clonedReq = request.clone();
      const formData = await clonedReq.formData();
      const file = formData.get('file');

      if (file && file instanceof File) {
        // 将解构出的真实文件名和真实字节大小挂载到 context 上透传
        context.fileName = file.name;
        context.fileSize = file.size;
      }
    } catch (e) {
      // 忽略解析异常，降级走默认处理
    }
  }

  // 构造标准 context 传给底层 worker
  return worker.fetch(request, env, {
    waitUntil: (p) => context.waitUntil(p),
    passThroughOnException: () => context.passThroughOnException(),
    ...context
  });
}
