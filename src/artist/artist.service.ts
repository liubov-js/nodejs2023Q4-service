import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDb } from '../db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: InMemoryDb) {}

  getAll() {
    return this.db.artists;
  }

  getOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  create(dto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...dto,
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto) {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIdx === -1) {
      throw new NotFoundException('Artist not found');
    }
    this.db.artists[artistIdx] = {
      ...this.db.artists[artistIdx],
      ...dto,
    };

    return this.db.artists[artistIdx];
  }

  delete(id: string) {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);
    if (artistIdx === -1) {
      throw new NotFoundException('Artist not found');
    }

    return this.db.artists.splice(artistIdx, 1);
  }
}
