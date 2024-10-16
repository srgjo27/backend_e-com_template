import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
    @ApiResponse({ status: 200, description: 'Product created has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createProduct(@Body() createProductDto: CreateProductDto){
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Product get has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    findAllProduct(){
        return this.productService.findAllProduct();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Product get has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    findProductById(@Param('id') id: number){
        return this.productService.findProductById(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Product updated has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto){
        return this.productService.updateProduct(id, updateProductDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Product deleted has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    removeProduct(@Param('id') id: number){
        return this.removeProduct(id);
    }

    @Post('categories')
    @ApiResponse({ status: 200, description: 'Category created has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
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
    @ApiResponse({ status: 200, description: 'Category get has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    findCategoryById(@Param('id') id: number){
        return this.productService.findCategoryById(id);
    }

    @Patch('categories/:id')
    @ApiResponse({ status: 200, description: 'Category updated has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateCategory(@Param('id') id:number, @Body() updateCategory: UpdateCategoryDto){
        return this.productService.updateCategory(id, updateCategory);
    }

    @Delete('categories/:id')
    @ApiResponse({ status: 200, description: 'Category deleted has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    removeCategory(@Param('id') id: number){
        return this.productService.removeCategory(id);
    }

    @Get('search')
    @ApiResponse({ status: 200, description: 'Product search has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    searchProducts(@Query('query') query: string){
        return this.productService.searchProducts(query)
    }

    @Get('filter')
    @ApiResponse({ status: 200, description: 'Product filter has been successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    filterProducts(
        @Query('categoryId') categoryId?: number,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('minRating') minRating?: number
    ){
        return this.productService.filterProducts(categoryId, minPrice, maxPrice, minRating);
    }
}
