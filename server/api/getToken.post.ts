export default defineEventHandler(async (event) => {
  const { accessToken } = await readBody(event)
  const config = useRuntimeConfig()
  const response = await $fetch('https://api.xiaoyuzhoufm.com/app_auth_tokens.refresh', {
    method: 'GET',
    headers: {
      'x-jike-access-token': accessToken ?? config.accessToken,
      'x-jike-device-id': config.deviceId,
      'x-jike-refresh-token': config.refreshToken,
    },
  })
  return response
})
