import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Bookmark } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Bookmark.create({ ...body, user })
    .then((bookmark) => bookmark.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Bookmark.count(query)
    .then(count => Bookmark.find(query, select, cursor)
      .populate('user')
      .then((bookmarks) => ({
        count,
        rows: bookmarks.map((bookmark) => bookmark.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Bookmark.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((bookmark) => bookmark ? bookmark.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Bookmark.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((bookmark) => bookmark ? Object.assign(bookmark, body).save() : null)
    .then((bookmark) => bookmark ? bookmark.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Bookmark.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((bookmark) => bookmark ? bookmark.remove() : null)
    .then(success(res, 204))
    .catch(next)
