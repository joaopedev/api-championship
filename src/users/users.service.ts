import { BadRequestException, Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, email, cpf, password, sex, birth } = createUserDto;

    try {
      const cpfExists = await this.userModel.findOne({ cpf }).exec();
      const emailExists = await this.userModel.findOne({ email }).exec();
      const userNameExists = await this.userModel.findOne({ username }).exec();

      if (cpfExists || emailExists || userNameExists) {
        throw new BadRequestException(
          `O username: ${username} e/ou email: ${email} e/ou cpf: ${cpf} já existe no banco de dados.`,
        );
      }

      let hashedPassword = encodePassword(createUserDto.password);
      hashedPassword = password;
      await this.userModel.create({
        name,
        username,
        email,
        password,
        cpf,
        sex,
        birth
      })

      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      console.error(error.message);
    }
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  findUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userId = await this.userModel.findOne({ id }).exec();

      if (!userId) {
        throw new ForbiddenException('Usuário não encontrado.');
      }
      return this.userModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...updateUserDto,
        },
        {
          new: true,
        },
      );
      
    } catch (error) {
      console.error(error)
    } 
  }
}
