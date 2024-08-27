const mongoose = require('mongoose')
const {marked} = require('marked');
const creatDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = creatDomPurify(new JSDOM().window);
const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function (next) {
    if (this.markdown) {
        const html = marked(this.markdown);
        this.sanitizedHtml = dompurify.sanitize(html);
    }

    next();
});

module.exports = mongoose.model('Article', articleSchema)