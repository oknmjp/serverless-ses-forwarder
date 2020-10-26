import { SESHandler } from 'aws-lambda'
import LambdaForwarder from 'aws-lambda-ses-forwarder'

export const handler: SESHandler = (event, context, callback) => {
  const overrides = {
    config: {
      emailBucket: 'ses-oknmjp-receive-mail',
      emailKeyPrefix: '',
      forwardMapping: {
        'okonomi@oknm.jp': [
          'shinya.kawakami@gmail.com'
        ]
      }
    }
  }
  LambdaForwarder.handler(event, context, callback, overrides)
}
