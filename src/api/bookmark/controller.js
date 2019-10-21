import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Bookmark } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Bookmark.findOne({ user: user.id, news: body.news })
    .then(bookmark => {
      if (bookmark) {
        return Bookmark.deleteOne().then(() =>
          res.status(200).json({ bookmarked: false })
        )
      } else {
        return Bookmark.create({ ...body, user }).then(() =>
          res.status(200).json({ bookmarked: true })
        )
      }
    })
    .catch(next)

export const index = (
  { user, querymen: { query, select, cursor } },
  res,
  next
) => Bookmark.count({ ...query, user: user.id })
  .then(count =>
    Bookmark.find({ ...query, user: user.id }, select, cursor)
      .populate('news')
      .populate('user')
      .then(bookmarks => ({
        count,
        rows: bookmarks.map(bookmark => bookmark.view())
      }))
  )
  .then(success(res))
  .catch(next)


export const show = ({ user, params }, res, next) =>
  Bookmark.findById(params.id)
    .populate('user')
    .populate('news')
    .then(authorOrAdmin(res, user, 'user'))
    .then(notFound(res))
    .then(bookmark => (bookmark ? bookmark.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Bookmark.findById(params.id)
    .populate('user')
    .populate('news')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(bookmark => (bookmark ? Object.assign(bookmark, body).save() : null))
    .then(bookmark => (bookmark ? bookmark.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Bookmark.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(bookmark => (bookmark ? bookmark.remove() : null))
    .then(success(res, 204))
    .catch(next)
