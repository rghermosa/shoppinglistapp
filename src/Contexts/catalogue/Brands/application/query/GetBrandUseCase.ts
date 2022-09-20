import { delay, inject, injectable } from 'tsyringe';
import { BrandFinder } from '../../domain/BrandFinder';
import { BrandId } from '../../domain/valueobjects/BrandId';
import { Brand } from '../../domain/Brand';

@injectable()
export class GetBrandUseCase {
  constructor(
    @inject(delay(() => BrandFinder))
    public brandFinder: BrandFinder
  ) {
    this.brandFinder = brandFinder;
  }

  execute(id: string): Promise<Brand> {
    return new Promise((resolve, reject) => {
      const brandId: BrandId = new BrandId(id);
      resolve(this.brandFinder.execute(brandId));
    });
  }
}
