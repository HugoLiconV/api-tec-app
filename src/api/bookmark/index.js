import { Router } from 'express'
import { Schema } from 'mongoose';
import querymen, { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Bookmark, { schema } from './model'

const router = new Router()
const { news } = schema.tree
const customSchema = new querymen.Schema(
  {
    news_id: {
      type: Schema.ObjectId,
      paths: ['news'],
      operator: '$eq'
    }
  }
)

/**
 * @api {post} /bookmarks Create bookmark
 * @apiName CreateBookmark
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam news Bookmark's news.
 * @apiSuccess {Object} bookmark Bookmark's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookmark not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ news }),
  create)

/**
 * @api {get} /bookmarks Retrieve bookmarks
 * @apiName RetrieveBookmarks
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of bookmarks.
 * @apiSuccess {Object[]} rows List of bookmarks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(customSchema),
  index)

/**
 * @api {get} /bookmarks/:id Retrieve bookmark
 * @apiName RetrieveBookmark
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} bookmark Bookmark's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookmark not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /bookmarks/:id Update bookmark
 * @apiName UpdateBookmark
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam news Bookmark's news.
 * @apiSuccess {Object} bookmark Bookmark's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bookmark not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ news }),
  update)

/**
 * @api {delete} /bookmarks/:id Delete bookmark
 * @apiName DeleteBookmark
 * @apiGroup Bookmark
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bookmark not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
