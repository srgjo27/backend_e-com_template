import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        const { categoryId, ...rest } = createProductDto;
        const category = await this.categoriesRepository.findOne({where: { id: categoryId }});
        if (!category) {
            throw new NotFoundException('Kategori tidak ditemukan');
        }
        const product = this.productsRepository.create({...rest, category});
        return this.productsRepository.save(product);
    }

    async findAllProduct(): Promise<Product[]>{
        return this.productsRepository.find({relations: ['category']});
    }

    async findProductById(id: number): Promise<Product>{
        const product = await this.productsRepository.findOne({ where: { id }, relations: ['category'] });
        if (!product) {
            throw new NotFoundException('Produk tidak ditemukan');
        }
        return product;
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>{
        const product = await this.findProductById(id);
        const { categoryId, ...rest } = updateProductDto;
        if (categoryId) {
            const category = await this.categoriesRepository.findOne({where: {id: categoryId}});
            if (!category) {
                throw new NotFoundException('Kategori tidak ditemukan');
            }
            product.category = category;
        }
        Object.assign(product, rest);
        return this.productsRepository.save(product);
    }

    async removeProduct(id: number): Promise<void>{
        const product = await this.findProductById(id);
        await this.productsRepository.remove(product);
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoriesRepository.create(createCategoryDto);
        return this.categoriesRepository.save(category);
    }

    async findAllCategories(): Promise<Category[]>{
        return this.categoriesRepository.find({relations: ['products']});
    }

    async findCategoryById(id: number): Promise<Category>{
        const category = await this. categoriesRepository.findOne({where: {id}, relations: ['products']});
        if (!category) {
            throw new NotFoundException('Kategori tidak ditemukan');
        }
        return category;
    }

    async updateCategory(id: number, updateCategoryDto: UpdateProductDto): Promise<Category> {
        const category = await this.findCategoryById(id);
        Object.assign(category, updateCategoryDto);
        return this.categoriesRepository.save(category);
    }

    async removeCategory(id: number): Promise<void>{
        const category = await this.findCategoryById(id);
        await this.categoriesRepository.remove(category);
    }
}
