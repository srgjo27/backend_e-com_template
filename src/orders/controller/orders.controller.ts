import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }

    @Get('all')
    findAllOrders(){
        return this.ordersService.findAllOrders();
    }

    @Get(':id')
    findOrderById(@Param('id') id: number){
        return this.ordersService.findOrderById(id);
    }

    @Patch(':id/status')
    updateOrderStatus(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto){
        return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
    }

    @Delete(':id')
    deleteOrder(@Param('id') id: number){
        return this.ordersService.removeOrder(id);
    }
}
