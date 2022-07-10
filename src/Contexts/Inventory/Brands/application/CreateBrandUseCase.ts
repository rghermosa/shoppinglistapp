import { delay, inject, injectable } from 'tsyringe';
import { Id } from '../../../shared/domain/valueObjects/Id';
import { Name } from '../../../shared/domain/valueObjects/Name';
import { BrandId } from '../../Shared/domain/valueobjects/BrandId';
import { BrandName } from '../../Shared/domain/valueobjects/BrandName';
import { BrandRepository } from '../domain/BrandRepository';
import { BrandCategory } from '../domain/valueobjects/BrandCategory';

@injectable()
export class CreateBrandUseCase {
  constructor(
    @inject('BrandRepository')
    private brandRepository: BrandRepository
  ) {
    this.brandRepository = brandRepository;
  }

  async execute(name: string, category: string) {
    const brandId: BrandId = new BrandId();
    const brandName: BrandName = new BrandName(name);
    const brandCategory: BrandCategory =
      BrandCategory[BrandCategory.parse(category)];

    await this.brandRepository.create(brandId, brandName, brandCategory);
  }
}
