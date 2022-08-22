import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    //InjectRepository tells the DI system that it needs to inject the generic Repository<User> instance
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string){
        //CREATES THE INSTANCE
        const user = this.repo.create({email, password});

        //PERSISTS THE INSTANCE TO THE DB
        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOne({where: { id }});
    }

    find(email:string) {
        return this.repo.find({where: { email }});
    }

    /** 
     * Partial is a type helper from Typescript that says the type has part of the attributes from the Users class
     * EX: you can pass {email: 'asdf@asdf.com'} with no password or the password and no email or both or none.
     **/
    
    async update(id: number, attrs: Partial<User>) {
        //NOTE: Finding a user from the DB is async operation
        //STEP 1: Find the user you want to update in the DB
        const user = await this.findOne(id);

        //STEP 2: Check if the user you looked for exists, if not throw an error
        if (!user) throw new NotFoundException('user not found');

        //STEP 3: copy the changed attributes to the user instance
        Object.assign(user, attrs);

        //STEP 4: Save your changes to the DB
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user) throw new NotFoundException('user not found');
        return this.repo.remove(user);
    }
}
