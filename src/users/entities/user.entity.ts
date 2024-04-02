import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Prop()
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @Prop()
  sex: string;

  @Prop()
  birth: string;

  @Prop()
  role: string;

  @Prop()
  otp: string;

  @Prop()
  emailVerifed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);