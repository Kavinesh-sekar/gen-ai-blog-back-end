const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { blogPosts, addBlog, deleteBlog ,updateBlog} = require('./blogPost');

dotenv.config();

let port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message || 'Something went wrong'
    });
});

// Fetch all blogs
app.get('/api/get_all_blog', (req, res, next) => {
    try {
        res.status(200).json({
            message: 'Fetch All blog',
            data: blogPosts
        });
    } catch (err) {
        next(err);
    }
});


app.get('/api/get_blog/:blog_id', (req, res, next) => {
    try {
        let blog_id = Number(req.params.blog_id);
        let blog = blogPosts.find(e => e.id === blog_id);

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found',
                data: null
            });
        }

        res.status(200).json({
            message: 'Fetch specific blog',
            data: blog
        });
    } catch (err) {
        next(err);
    }
});

// Create a new blog
app.post('/api/create_blog', (req, res, next) => {
    try {
        let newBlog = req.body;

        if (!newBlog || !newBlog.title || !newBlog.content) {
            return res.status(400).json({
                success: false,
                message: 'Invalid blog data'
            });
        }

        let addedBlog = addBlog(newBlog);

        res.status(201).json({
            message: 'Blog created successfully',
            data: addedBlog
        });
    } catch (err) {
        next(err);
    }
});

// Delete a blog by ID
app.delete('/api/delete_blog/:blog_id', (req, res, next) => {
    try {
        let blog_id = Number(req.params.blog_id);
        let deleted = deleteBlog(blog_id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Blog not found or already deleted'
            });
        }

        res.status(200).json({
            message: 'Blog deleted successfully',
            data: blogPosts
        });
    } catch (err) {
        next(err);
    }
});

app.put("/api/update_blogs/:blog_id", (req, res, next) => {
    try {
      const blog_id = parseInt(req.params.blog_id); 
      const updatedData = req.body;
  
      if (!updatedData || !updatedData.title || !updatedData.content) {
        return res.status(400).json({
          success: false,
          message: "Invalid blog data",
        });
      }
  
      const updatedBlog = updateBlog(blog_id, updatedData);
  
      if (!updatedBlog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (err) {
      next(err);
    }
  });
  

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
