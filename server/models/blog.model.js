// const { next } = require('cheerio/lib/api/traversing');
const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const blogSchema = mongoose.Schema({

    title: String,
    markdown: {
        type: String,
    },
    description:{
        type:String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    dateCreate:{
        type:Date,
        default:new Date()
    },
    img:{
        type:String
    }


})

blogSchema.pre('validate', function(next) {
    // let h = marked.parse('# Marked in Node.js\n\nRendered by **marked**.');
    let h = marked.parse(this.markdown);
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
  
    if (this.markdown) {
      this.sanitizedHtml = dompurify.sanitize(h)
    }
  
    next()
  })
module.exports = mongoose.model('Blogs', blogSchema)