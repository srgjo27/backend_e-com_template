import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products/v1/')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
    ){}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto){
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    findAllProduct(){
        return this.productService.findAllProduct();
    }

    @Get(':id')
    findProductById(@Param('id') id: number){
        return this.productService.findProductById(id);
    }

    @Patch(':id')
    updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto){
        return this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    removeProduct(@Param('id') id: number){
        return this.productService.removeProduct(id);
    }

    @Post('categories')
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
      return this.productService.createCategory(createCategoryDto);
    }

    @Get('categories/all')
    findAllCategory(){
        return this.productService.findAllCategories();
    }

    @Get('categories/:id')
    findCategoryById(@Param('id') id: number){
        return this.productService.findCategoryById(id);
    }

    @Patch('categories/:id')
    updateCategory(@Param('id') id:number, @Body() updateCategory: UpdateCategoryDto){
        return this.productService.updateCategory(id, updateCategory);
    }

    @Delete('categories/:id')
    removeCategory(@Param('id') id: number){
        return this.productService.removeCategory(id);
    }

    @Get('search')
    searchProducts(@Query('query') query: string){
        return this.productService.searchProducts(query)
    }

    @Get('filter')
    filterProducts(
        @Query('categoryId') categoryId?: number,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('minRating') minRating?: number
    ){
        return this.productService.filterProducts(categoryId, minPrice, maxPrice, minRating);
    }
}
