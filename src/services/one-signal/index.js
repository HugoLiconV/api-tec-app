import OneSignal from 'onesignal-node'
import { appId, userAuthKey, appAuthKey } from '../../config'

export const client = new OneSignal.Client({
  userAuthKey,
  app: {
    appAuthKey,
    appId
  }
})

export function sendPushNotification (news) {
  const notification = new OneSignal.Notification({
    contents: {
      en: news.title
    },
    included_segments: news.tags
  })

  client.sendNotification(notification, function (err, httpResponse, data) {
    if (err) {
      console.log('Something went wrong...')
    } else {
      console.log(data, httpResponse.statusCode)
    }
  })
  return news
}
