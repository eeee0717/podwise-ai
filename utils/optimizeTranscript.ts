export default function optimizeTranscript(transcript?: string) {
  if (!transcript)
    return ''
  // 删除transcript中的时间戳 例如：[6:0.480,6:55.280]
  return transcript.replace(/\[\d+:\d+\.\d+,\d+:\d+\.\d+\]/g, '')
}
