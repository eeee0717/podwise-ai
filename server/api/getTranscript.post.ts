import * as tencentcloud from 'tencentcloud-sdk-nodejs-common'

export default defineEventHandler(async (event) => {
  try {
    const { mediaUrl } = await readBody(event)
    const CommonClient = tencentcloud.CommonClient
    const config = useRuntimeConfig(event)
    const clientConfig = {
      credential: {
        secretId: config.tencent.secretId,
        secretKey: config.tencent.secretKey,
      },
      region: '',
      profile: {
        httpProfile: {
          endpoint: 'asr.tencentcloudapi.com',
        },
      },
    }

    const client = new CommonClient(
      'asr.tencentcloudapi.com',
      '2019-06-14',
      clientConfig,
    )

    const params = {
      EngineModelType: '16k_zh',
      ChannelNum: 1,
      ResTextFormat: 0,
      SourceType: 0,
      Url: mediaUrl,
    }

    const { Data } = await client.request('CreateRecTask', params)

    return Data.TaskId
  }
  catch (err) {
    console.error('error', err)
  }
})
