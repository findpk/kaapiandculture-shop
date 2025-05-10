const BaseHelper = require("./base-helper"),
  UserRoutes = require("./routes/user-routes"),
  OrderRoutes = require("./routes/order-routes"),
  ProductRoutes = require("./routes/product-routes");
class Routes extends BaseHelper {
  constructor(dependencies, configs, context) {
    super(dependencies, configs, context);
    this.userRoutes = new UserRoutes(dependencies, configs, context);
    this.productRoutes = new ProductRoutes(dependencies, configs, context);
    this.orderRoutes = new OrderRoutes(dependencies, configs, context);
  }

  async registerRoutes() {
    const me = this;
    me.dependencies.app.use(this.userRoutes.registerUserRoutes());
    me.dependencies.app.use(this.productRoutes.registerProductRoutes());
    me.dependencies.app.use(this.orderRoutes.registerOrderRoutes());
  }
}

module.exports = Routes;
