import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;

  @OneToOne(() => ArtistEntity, (artist) => artist)
  @JoinColumn()
  artist: ArtistEntity[];

  toResponse() {
    const { id, name, year, artistId } = this;
    return { id, name, year, artistId };
  }
}
