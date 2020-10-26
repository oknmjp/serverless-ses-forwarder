import { SESHandler } from 'aws-lambda'
import LambdaForwarder from 'aws-lambda-ses-forwarder'

export const handler: SESHandler = (event, context, callback) => {
  let forwardMapping;
  forwardMapping[process.env.ORIGINAL_RECIPIENT] = [
    process.env.FORWARD_RECIPIENT
  ]

  const overrides = {
    config: {
      emailBucket: process.env.EMAIL_BUCKET,
      emailKeyPrefix: '',
      forwardMapping,
    }
  }
  LambdaForwarder.handler(event, context, callback, overrides)
}
