import splitToChunks from '~/utils/splitToChunks'

export default defineEventHandler(async (event) => {
  const { transcript } = await readBody(event)
  const chunks = splitToChunks(transcript, 5000, 1000)
  return chunks
})
