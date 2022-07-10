import { inject, injectable } from 'tsyringe';
import { Brand } from '../../../Brands/domain/Brand';
import { BrandRepository } from '../../../Brands/domain/BrandRepository';
import { BrandId } from '../valueobjects/BrandId';

@injectable()
export class BrandFinder {
  constructor(
    @inject('BrandRepository')
    private brandRepository: BrandRepository
  ) {}

  async execute(id: BrandId): Promise<Brand> {
    return await this.brandRepository.find(id);
  }
}
