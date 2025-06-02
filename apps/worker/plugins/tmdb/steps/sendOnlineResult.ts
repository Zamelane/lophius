import type { Context } from '@plugins/tmdb/types.ts'

export async function sendOnlineResult(ctx: Context): Promise<Context> {
  // if (ctx.realtimeResult && ctx.mediaModel?.mediaType === 'kino' && ctx.mediaModel.id) {
  //   ctx.realtimeResult.status.addUpdate({
  //     mediaType: 'kino',
  //     id: ctx.mediaModel.id!,
  //     title: ctx.fetchedTranslatesData?.translations?.find(v => v.data?.title)?.data?.title || 'Нету',
  //     isAdult: false,
  //     objectType: 'media'
  //   })
  // }
  return ctx
}
