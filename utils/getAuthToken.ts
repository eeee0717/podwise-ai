import type { authToken } from '~/types'

// 如果deviceId是固定值，考虑定义为常量
const DEFAULT_DEVICE_ID = '69F65C43-9B15-4621-AAA2-83F894DC0B51'

const accessToken = useLocalStorage('accessToken', '')
const deviceId = useLocalStorage('deviceId', DEFAULT_DEVICE_ID)
const freshToken = useLocalStorage('freshToken', '')

export async function getAuthToken() {
  try {
    const response = await $fetch('/api/getToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: accessToken.value,
      }),
    })
    if (!response) {
      throw new Error('No response from getToken API')
    }
    const { 'x-jike-access-token': access, 'x-jike-refresh-token': refresh } = response as authToken
    if (!access || !refresh) {
      throw new Error('Invalid response structure for tokens')
    }
    accessToken.value = access
    freshToken.value = refresh
    deviceId.value = DEFAULT_DEVICE_ID // 可以在这里设置，如果设备ID是动态的，应该在其他地方设置
  }
  catch (err) {
    console.error('Error fetching auth token:', err)
    throw err // 或根据你的错误处理策略返回一个特定的错误对象
  }
}

export function getAppToken() {
  return {
    accessToken: accessToken.value,
    deviceId: deviceId.value,
    freshToken: freshToken.value,
  }
}
