const path = require("path");
const fs = require("fs").promises;
const express = require("express");

const router = express.Router();
const blogPostsFolder = path.join(__dirname, "allPosts");

fs.mkdir(blogPostsFolder, { recursive: true })
    .catch((err) => console.error("Error creating blog_posts folder:", err));

router.get("/addPost", (req,res,next) => {
    res.sendFile(path.join(__dirname, "../","views", "addPost.html"));
})

router.post("/addPost", async (req, res, next) => {
    try {
        const {title, author, content} = req.body;

        const timestamp = new Date().toString();

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const filename = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}.json`;

        //const filename = `${timestamp.replace(/[:.]/g,'-')}.json`;

        const filepath = path.join (blogPostsFolder, filename);

        const blogPost = {
            title,
            author,
            content,
            timestamp
        };

        await fs.writeFile(filepath, JSON.stringify(blogPost, null, 2));
         console.log("Blog post save : ", filepath);

         res.redirect("/home");
        
    } catch (error) {
        console.error("Error saving blog post: ", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;