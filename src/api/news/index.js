import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export News, { schema } from './model'

const router = new Router()
const { title, content, image } = schema.tree

/**
 * @api {post} /news Create news
 * @apiName CreateNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title News's title.
 * @apiParam content News's content.
 * @apiParam image News's image.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
/**router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, content, image }),
  create)
  */

  router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, content, image }),
  create)

/**
 * @api {get} /news Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of news.
 * @apiSuccess {Object[]} rows List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /news/:id Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /news/:id Update news
 * @apiName UpdateNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title News's title.
 * @apiParam content News's content.
 * @apiParam image News's image.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, content, image }),
  update)

/**
 * @api {delete} /news/:id Delete news
 * @apiName DeleteNews
 * @apiGroup News
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
