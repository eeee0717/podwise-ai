export async function checkTranscriptPoll(taskId: number, result: Ref<{ status?: string, result?: string }>) {
  console.log('checkTranscriptPoll', taskId)
  await new Promise((resolve, reject) => {
    $fetch('/api/checkTranscriptStaus', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    })
      .then((response) => {
        if (!response) {
          reject(new Error('Response is empty'))
        }
        result.value.status = response.status
        result.value.result = response.result
        resolve(response)
      })
      .catch(() => {
        reject(new Error('Unknown error occurred during database operation'))
      })
  })
}
