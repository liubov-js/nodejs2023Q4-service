import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  toResponse() {
    const { id, name, grammy } = this;
    return { id, name, grammy };
  }
}
