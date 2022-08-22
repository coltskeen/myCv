import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    //Properties of the User --> will be stored in Db
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id:', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id:', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Removed User with id:', this.id);
    }
}