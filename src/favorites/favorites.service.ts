import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDb } from '../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: InMemoryDb) {}

  getAll() {
    const { artists, albums, tracks } = this.db.favorites;

    const artistsRes = artists.map((id) =>
      this.db.artists.find((artist) => artist.id === id),
    );
    const albumsRes = albums.map((id) =>
      this.db.albums.find((album) => album.id === id),
    );
    const tracksRes = tracks.map((id) =>
      this.db.tracks.find((track) => track.id === id),
    );

    return { artists: artistsRes, albums: albumsRes, tracks: tracksRes };
  }

  addAlbum(id: string) {
    const album = this.db.favorites.albums.find((album) => album === id);

    if (!album)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.db.favorites.albums.push(id);
  }

  addTrack(id: string) {
    const album = this.db.favorites.tracks.find((album) => album === id);

    if (!album)
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.db.favorites.tracks.push(id);
  }

  addArtist(id: string) {
    const album = this.db.favorites.artists.find((album) => album === id);

    if (!album)
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.db.favorites.artists.push(id);
  }

  removeAlbum(id: string) {
    const albumIdx = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIdx === -1) {
      throw new NotFoundException('Album not found');
    } else {
      this.db.favorites.albums.splice(albumIdx, 1);
    }
  }

  removeTrack(id: string) {
    const trackIdx = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIdx === -1) {
      throw new NotFoundException('Track not found');
    } else {
      this.db.favorites.tracks.splice(trackIdx, 1);
    }
  }

  removeArtist(id: string) {
    const artistIdx = this.db.favorites.artists.findIndex(
      (albumId) => albumId === id,
    );

    if (artistIdx === -1) {
      throw new NotFoundException('Artist not found');
    } else {
      this.db.favorites.artists.splice(artistIdx, 1);
    }
  }
}
