export default function splitToChunks(transcript: string, chunkSize: number, overlap: number) {
  const result = []
  if (chunkSize > 3000) {
    chunkSize = 3000
    overlap = 500
  }
  for (let i = 0; i < transcript.length; i += chunkSize - overlap) {
    result.push(transcript.slice(i, i + chunkSize))
  }
  return result
}
