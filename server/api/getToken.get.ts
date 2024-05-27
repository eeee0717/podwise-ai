export default defineEventHandler(async (_) => {
  const config = useRuntimeConfig()
  const response = await $fetch('https://api.xiaoyuzhoufm.com/app_auth_tokens.refresh', {
    method: 'GET',
    headers: {
      'x-jike-access-token': config.accessToken,
      'x-jike-device-id': config.deviceId,
      'x-jike-refresh-token': config.refreshToken,
    },
  }).then((res) => { return JSON.stringify(res) })
  return response
})
