import mongoose, { Schema } from 'mongoose'
import {careers} from '../user/model'
const newsSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  tags: {
    type: [careers]
  },
  image: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

newsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      content: this.content,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('News', newsSchema)

export const schema = model.schema
export default model
