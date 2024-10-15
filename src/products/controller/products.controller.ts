import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
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
        return this.removeProduct(id);
    }

    @Post('categories')
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
      return this.productService.createCategory(createCategoryDto);
    }

    @Get('categories/all')
    @ApiResponse({ status: 200, description: 'Category get has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
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
}
