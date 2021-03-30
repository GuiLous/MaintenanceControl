import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    return response.json(users);
  }

  public async showOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usersRepository = getRepository(User);
    const { id } = request.params;

    const room = await usersRepository.findOne({
      where: { id },
    });
    return response.json(room);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // user.password = '';

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User);

    const { id } = request.params;
    const { name, email, password } = request.body;

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(400).json({ Error: 'User not found.' });
    }

    const findUserWithSameEmail = await usersRepository.findOne({
      where: { email },
    });

    if (findUserWithSameEmail && findUserWithSameEmail.id !== id) {
      return response
        .status(400)
        .json({ Error: 'Email address is already been used.' });
    }

    const hashedPassword = await hash(password, 8);

    const updatedUser = {
      id: user.id,
      name,
      email,
      password: hashedPassword,
      created_at: user.created_at,
    };

    await usersRepository.update(id, updatedUser);

    return response.json(updatedUser);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const { id } = request.params;

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(400).json({ Error: 'User not found.' });
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('id = :id', { id })
      .execute();

    return response.status(204).send();
  }
}
