const BaseHelper = require("./base-helper"),
  UserRoutes = require("./routes/user-routes"),
  ProductRoutes = require("./routes/product-routes");
class Routes extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
    this.userRoutes = new UserRoutes(dependencies, configs, context);
    this.productRoutes = new ProductRoutes(dependencies, configs, context);
  }

  async registerRoutes() {
    const me = this;
    me.dependencies.app.use(this.userRoutes.registerUserRoutes());
    me.dependencies.app.use(this.productRoutes.registerUserRoutes());
  }
}

module.exports = Routes;
