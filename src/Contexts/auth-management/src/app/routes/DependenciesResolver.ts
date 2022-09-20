import { Router } from 'express';

// @registry([
//   { token: 'BrandRepository', useClass: PostgreSQLBrandRepository },
//   { token: 'ProductRepository', useClass: PostgreSQLProductRepository },
// ])
export class DependenciesResolver {
  public static run(router: Router) {
    router.use('/signup');
    router.use('/login');
    // router.use('/brand', container.resolve(BrandController).routes());
    // router.use('/product', container.resolve(ProductController).routes());
  }
}
