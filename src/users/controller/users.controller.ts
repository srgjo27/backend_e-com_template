import { Controller, Post, Body, Get, Delete, Req, HttpStatus, UseGuards, Patch, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
// import { UpdateUserDto } from '../dto/update-user.dto';
import { RequestWithUser } from '../entity/user.interface';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/permission/roles/roles.decorator.';
import { RolesGuard } from 'src/permission/roles/roles.guard';

@ApiTags('Users')
@Controller('users/v1/')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('do_register')
  @ApiBody({
    type: CreateUserDto,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      return({
        statusCode: HttpStatus.OK,
        message: 'Register success',
        data: user,
      });
    } catch (e) {
      return({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Register failed',
      });
    }
  }

  @Post('do_login')
  @ApiBody({
    type: CreateUserDto,
  })
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.login(body.email, body.password);

      return {
        statusCode: HttpStatus.OK,
        message: 'Login success',
        data: user,
      };
    } catch (e) {
      return({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Login failed',
      });
    }
  }

  @Get('all_user')
  async getAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: RequestWithUser) {
    const user = req.user;

    return ({
      statusCode: HttpStatus.OK,
      message: 'Profile data',
      data: {
        user,
      }
    });
  }

  @Patch('update/profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;

    await this.usersService.update(user.id, updateUserDto);

    return this.usersService.findOneByEmail(user.email);
  }

  @Delete('remove/profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteProfile(@Req() req: RequestWithUser) {
    const user = req.user;

    await this.usersService.remove(user.id);
  }

  @Delete('remove/user/:id')
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: number) {
    try {
      const user = await this.usersService.removeUser(id);

      return ({
        statusCode: HttpStatus.OK,
        message: 'User deleted',
        data: user,
      });
    } catch (e) {
      return ({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete user',
      });
    }
  }
}