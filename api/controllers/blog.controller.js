const Blog = require('../models/blog.model')

async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find()
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) { res.status(500).send('Blog not found') }
        return res.status(200).json(blog)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createBlog(req, res) {
    try {
        const blog = await Blog.create(req.body)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateBlog(req, res) {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }); // {new: true} para devolver el documento modificado.
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteBlog(req, res) {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.status(200).json({ text: 'Blog removed', blog: blog })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllBlogs,
    getOneBlog,
    createBlog,
    updateBlog,
    deleteBlog
}