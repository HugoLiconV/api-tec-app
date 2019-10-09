import { News } from '.'

let news

beforeEach(async () => {
  news = await News.create({ title: 'test', content: 'test', image: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = news.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.title).toBe(news.title)
    expect(view.content).toBe(news.content)
    expect(view.image).toBe(news.image)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = news.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.title).toBe(news.title)
    expect(view.content).toBe(news.content)
    expect(view.image).toBe(news.image)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
