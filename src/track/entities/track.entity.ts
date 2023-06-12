import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => ArtistEntity, (artist) => artist)
  @JoinColumn()
  artist: ArtistEntity[];

  @OneToOne(() => AlbumEntity, (album) => album)
  @JoinColumn()
  album: AlbumEntity[];

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;

  toResponse() {
    const { id, name, artistId, albumId, duration } = this;
    return { id, name, artistId, albumId, duration };
  }
}
