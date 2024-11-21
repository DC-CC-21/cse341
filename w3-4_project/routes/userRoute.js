const usersRoute = require("express").Router();
const userController = require("../controllers/userController");
const { HandleError } = require("../utilities");
const {
  addUserRules,
  checkUserData,
} = require("../validate/validateUser");

usersRoute.get(
  "/",
  // #swagger.tags = ['Users']
  HandleError(userController.GetAllUsers)
);

usersRoute.get(
  "/:id",
  /* 
    #swagger.tags = ['Users']
	#swagger.responses[200] = { 
	  schema: { 
	    "$ref": "#/definitions/User"
	  },
      description: "User found successfully."
	}
    #swagger.responses[404] = { 
      description: "Could not find user"
    }
    #swagger.responses[400] = { 
      description: "Invalid user id"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  HandleError(userController.GetUserById)
);

usersRoute.post(
  "/",
  /*
	#swagger.tags = ['Users']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'User object',
		required: true,
		schema: { $ref: "#/definitions/User" }
	}
	#swagger.responses[200] = { 
	  schema: { 
	    $_id: "string",
	  },
      description: "The id of the created user."
	}
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  addUserRules,
  checkUserData,
  HandleError(userController.CreateUser)
);

usersRoute.put(
  "/:id",
  /*
	#swagger.tags = ['Users']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'User object',
		required: true,
		schema: { $ref: "#/definitions/User" }
	}
    #swagger.responses[204] = { 
      description: "OK"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  addUserRules,
  checkUserData,
  HandleError(userController.UpdateUser)
);

usersRoute.delete(
  "/:id",
  //#swagger.tags = ['Users']
  /*
    #swagger.responses[204] = { 
      description: "OK"
    }
    #swagger.responses[404] = { 
      description: "User not found"
    }
    #swagger.responses[400] = { 
      description: "Invalid user id"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  HandleError(userController.DeleteUser)
);

module.exports = usersRoute;
