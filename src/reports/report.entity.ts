import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    // make: string;

    // model: string;

    // year: number;

    // mileage: number;

    // longtitude: string;

    // latitude: string;

    @Column()
    price: number;
}