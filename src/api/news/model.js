import mongoose, { Schema } from 'mongoose'
import {careers} from '../user/model'
import mongooseKeywords from 'mongoose-keywords'

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: [
        {
          type: String,
          enum: careers
        }
      ]
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

newsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      content: this.content,
      image: this.image,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

newsSchema.plugin(mongooseKeywords, { paths: ['tags'] })

newsSchema.statics = {
  careers
}
newsSchema.index({
  title: 'text'
})

const model = mongoose.model('News', newsSchema)

export const schema = model.schema
export default model
