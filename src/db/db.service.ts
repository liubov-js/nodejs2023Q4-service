import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { Track } from '../interfaces/track.interface';
import { Album } from '../interfaces/album.interface';
import { Artist } from '../interfaces/artist.interface';
import { Favorites } from '../interfaces/favorites.interface';

@Injectable()
export class InMemoryDb {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  users: User[] = [];
  favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
