import { Context, Next } from '@tugraph/actions';
import stream from 'stream';

export function dataWrapping() {
  return async function dataWrapping(ctx: Context, next: Next) {
    await next();

    if (ctx.withoutDataWrapping) {
      return;
    }

    // if (!ctx?.action?.params) {
    //   return;
    // }

    if (ctx.body instanceof stream.Readable) {
      return;
    }

    if (ctx.body instanceof Buffer) {
      return;
    }

    if (!ctx.body) {
      if (ctx.action?.actionName == 'get') {
        ctx.status = 200;
      }
    }

    if (Array.isArray(ctx.body)) {
      ctx.body = {
        data: ctx.body,
      };
      return;
    }

    if (ctx.body) {
      const { rows, ...meta } = ctx.body;

      if (rows) {
        ctx.body = {
          data: rows,
          meta,
        };
      } else {
        ctx.body = {
          data: ctx.body,
        };
      }
    }
  };
}

export default dataWrapping;
