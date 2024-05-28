import type { authToken } from '~/types'

const accessToken = useLocalStorage('accessToken', '')
const deviceId = useLocalStorage('deviceId', '')
const freshToken = useLocalStorage('freshToken', '')
export async function getAuthToken() {
  const response = await $fetch('/api/getToken', {
    method: 'POST',
    body: {
      accessToken,
    },
  }).catch((err) => {
    console.error(err)
    return null
  })
  if (response === null)
    return null
  const authToken = response as authToken
  accessToken.value = authToken['x-jike-access-token']
  freshToken.value = authToken['x-jike-refresh-token']
  deviceId.value = '69F65C43-9B15-4621-AAA2-83F894DC0B51'
}
