import { Bookmark } from '.'
import { User } from '../user'

let user, bookmark

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  bookmark = await Bookmark.create({ user, news: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bookmark.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookmark.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.news).toBe(bookmark.news)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bookmark.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bookmark.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.news).toBe(bookmark.news)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
