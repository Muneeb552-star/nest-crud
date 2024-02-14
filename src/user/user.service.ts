import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  //Inject User repository
  constructor(@InjectRepository(User)  private readonly userRepository : Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user : User = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const userToUpdate = await this.userRepository.findOne({ where: { id: id } });
    if (!userToUpdate) {
      return undefined; // Return undefined if user with given id is not found
    }
    // Update user properties
    userToUpdate.firstName = updateUserDto.firstName;
    userToUpdate.lastName = updateUserDto.lastName;
    userToUpdate.age = updateUserDto.age;
    
    return await this.userRepository.save(userToUpdate);
  }
  

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
