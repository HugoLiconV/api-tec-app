import mongoose, { Schema } from 'mongoose'

const bookmarkSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  news: {
    type: Schema.ObjectId,
    ref: 'News',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

bookmarkSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      news: this.news && this.news.view(full),
      user: this.user && this.user.view(full)
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Bookmark', bookmarkSchema)

export const schema = model.schema
export default model
