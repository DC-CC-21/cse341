const itemsRoute = require("express").Router();
const itemController = require("../controllers/itemController");
const { HandleError } = require("../utilities");
const {
  addItemRules,
  checkItemData,
} = require("../validate/validateItem");
const { requiresAuth } = require("express-openid-connect");

itemsRoute.get(
  "/",
  // #swagger.tags = ['Item']
  HandleError(itemController.GetAllItems)
);

itemsRoute.get(
  "/:id",
  /* 
    #swagger.tags = ['Item']
	#swagger.responses[200] = { 
	  schema: { 
	    "$ref": "#/definitions/Item"
	  },
      description: "item found successfully."
	}
    #swagger.responses[404] = { 
      description: "Could not find item"
    }
    #swagger.responses[400] = { 
      description: "Invalid item id"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  HandleError(itemController.GetItemById)
);

itemsRoute.post(
  "/",
  /*
	#swagger.tags = ['Item']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'item object',
		required: true,
		schema: { $ref: "#/definitions/Item" }
	}
	#swagger.responses[200] = { 
	  schema: { 
	    $_id: "string",
	  },
      description: "The id of the created item."
	}
  #swagger.responses[401] = { 
    description: "Unauthorized"
  }
  #swagger.responses[500] = { 
    description: "Database error"
  }
  */
  requiresAuth(),
  addItemRules,
  checkItemData,
  HandleError(itemController.CreateItem)
);

itemsRoute.put(
  "/:id",
  /*
	#swagger.tags = ['Item']
	#swagger.parameters['body'] = {
		in: 'body',
		description: 'item object',
		required: true,
		schema: { $ref: "#/definitions/Item" }
	}
    #swagger.responses[204] = { 
      description: "OK"
    }
    #swagger.responses[401] = { 
      description: "Unauthorized"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  requiresAuth(),
  addItemRules,
  checkItemData,
  HandleError(itemController.UpdateItem)
);

itemsRoute.delete(
  "/:id",
  //#swagger.tags = ['Item']
  /*
    #swagger.responses[204] = { 
      description: "OK"
    }
    #swagger.responses[404] = { 
      description: "item not found"
    }
    #swagger.responses[400] = { 
      description: "Invalid item id"
    }
    #swagger.responses[401] = { 
      description: "Unauthorized"
    }
    #swagger.responses[500] = { 
      description: "Database error"
    }
  */
  requiresAuth(),
  HandleError(itemController.DeleteItem)
);

module.exports = itemsRoute;
