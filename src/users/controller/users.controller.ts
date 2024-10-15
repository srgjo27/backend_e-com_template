import { Controller, Post, Body, Get, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RequestWithUser } from '../entity/user.interface';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('all_user')
  @ApiResponse({ status: 200, description: 'Data get has been successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async getAll() {
    return this.usersService.findAll();
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Register has been successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login has been successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
})
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    await this.usersService.update(user.id, updateUserDto);
    return this.usersService.findOneByEmail(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteProfile(@Req() req: RequestWithUser) {
    const user = req.user;
    await this.usersService.remove(user.id);
  }
}