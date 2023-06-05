import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDb } from '../db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: InMemoryDb) {}

  getAll() {
    return this.db.albums;
  }

  getOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  create(dto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...dto,
    };

    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);
    if (albumIdx === -1) {
      throw new NotFoundException('Album not found');
    }
    this.db.albums[albumIdx] = {
      ...this.db.albums[albumIdx],
      ...dto,
    };

    return this.db.albums[albumIdx];
  }

  delete(id: string) {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);
    if (albumIdx === -1) {
      throw new NotFoundException('Album not found');
    }

    return this.db.albums.splice(albumIdx, 1);
  }
}
