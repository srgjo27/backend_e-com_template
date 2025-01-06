import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Delete, 
  Req, 
  UseGuards, 
  Patch, 
  Param
} from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiBody, 
  ApiTags 
} from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { RequestWithUser } from '../entity/user.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthService } from 'src/auth/service/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/permission/roles/roles.guard';
import { Roles } from 'src/permission/roles/roles.decorator.';
import { Role } from 'src/enums/roles.enum';

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
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  @Post('do_login')
  @ApiBody({
    type: CreateUserDto,
  })
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.login(body.email, body.password);
    
    return user
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

    return this.usersService.findOneById(user.id);
  }

  @Patch('update/profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: RequestWithUser, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;

    await this.usersService.update(user.id, updateUserDto);

    return this.usersService.findOneByEmail(user.email);
  }

  @Patch('/update/role/:id')
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRole(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateRole(id, updateUserDto);
    
    return this.usersService.findOneById(id);
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
    const user = await this.usersService.removeUser(id);
    
    return user;
  }
}