const express=require('express');
const postController=require('../controllers/Posts');
const userValid=require('../middleware/Auth');
const roleMiddlware=require('../middleware/RoleMiddleware');
const routes=express.Router();

routes.get('/posts',roleMiddlware("admin"), postController.listPosts);
routes.post('/posts',userValid,postController.createPost);

module.exports = routes;