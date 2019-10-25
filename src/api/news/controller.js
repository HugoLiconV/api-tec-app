import { success, notFound } from '../../services/response/'
import { News } from '.'
import { sendPushNotification } from '../../services/one-signal'

export const create = ({ bodymen: { body } }, res, next) => {
  return News.create(body)
    .then(sendPushNotification)
    .then((news) => news.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  console.log("TCL: index -> cursor", cursor)
  return News.count(query)
    .then(count => News.find(query, select, cursor)
      .then((news) => ({
        count,
        rows: news.map((news) => news.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  News.findById(params.id)
    .then(notFound(res))
    .then((news) => news ? news.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  News.findById(params.id)
    .then(notFound(res))
    .then((news) => news ? Object.assign(news, body).save() : null)
    .then((news) => news ? news.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  News.findById(params.id)
    .then(notFound(res))
    .then((news) => news ? news.remove() : null)
    .then(success(res, 204))
    .catch(next)
