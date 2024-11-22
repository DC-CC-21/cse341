const postsRoute = require("express").Router();
const postController = require("../controllers/postsController");
const { HandleError } = require("../utilities");
const {
  addPostRules,
  checkPostData,
} = require("../validate/validatePost");

postsRoute.get(
  "/",
  // #swagger.tags = ['Posts']
  HandleError(postController.GetAllPosts)
);

postsRoute.get(
  "/:id",
  /* 
    #swagger.tags = ['Posts']
    #swagger.responses[200] = { 
      schema: { 
        "$ref": "#/definitions/Post"
      },
        description: "User found successfully."
    }
    #swagger.responses[404] = { 
      description: "Could not find post"
    }
    #swagger.responses[400] = { 
      description: "Invalid post id"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  HandleError(postController.GetPostsById)
);

postsRoute.post(
  "/",
  /*
	#swagger.tags = ['Posts']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'Post object',
		required: true,
		schema: { $ref: "#/definitions/Post" }
	}
	#swagger.responses[200] = { 
	  schema: { 
	    $_id: "string",
	  },
      description: "The id of the created post."
	}
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  addPostRules,
  checkPostData,
  HandleError(postController.CreatePost)
);

postsRoute.put(
  "/:id",
  /*
	#swagger.tags = ['Posts']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'Post object',
		required: true,
		schema: { $ref: "#/definitions/Post" }
	}
    #swagger.responses[204] = { 
      description: "OK"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  addPostRules,
  checkPostData,
  HandleError(postController.UpdatePost)
);

postsRoute.delete(
  "/:id",
  //#swagger.tags = ['Posts']
  /*
    #swagger.responses[204] = { 
      description: "OK"
    }
    #swagger.responses[404] = { 
      description: "Post not found"
    }
    #swagger.responses[400] = { 
      description: "Invalid post id"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  HandleError(postController.DeletePost)
);

module.exports = postsRoute;
