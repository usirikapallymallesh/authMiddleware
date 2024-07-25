
const listPosts =async (req,res,next)=> {

    // Fetch posts from database
    // Return posts
    res.status(200).json({
        status:'posts page loaded',
    });
};

const createPost = (req, res) => {
    // Add validation here
    // Add post to database
    // Return created post
    res.status(201).json({
        status:'post created successfully',
    });
};

const postController ={
    listPosts,
    createPost,
}

module.exports = postController;