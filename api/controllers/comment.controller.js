const Comment_Contents = require("../models/comment_contents.model")
const User = require('../models/user.model')
const Content = require("../models/content.model")

async function getCommentsContent(req, res) {
    try {
        const commentContent = await Comment_Contents.find(req.params.id)
        if (!commentContent) { res.status(404).send('Comment on content not found') }
        return res.status(200).json(commentContent)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createCommentContent(req, res) {
    try {
        const comment = await Comment_Contents.create(req.body)
        const user = await User.findById(res.locals.user.id)
        if (!user) { res.status(404).send('User not found') }
        const content = await Content.findById(req.params.contentId)
        await comment.setContent(content)
        await comment.setUser(user)
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteCommentContent(req, res) {
    try {
        const commentContent = await Comment_Contents.findByIdAndDelete(req.params.id)
        res.status(500).json({ text: 'Comment on content removed', commentContent: commentContent })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getCommentsContent,
    createCommentContent,
    deleteCommentContent
}