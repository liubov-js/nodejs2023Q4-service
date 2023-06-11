import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    const albums = await this.albumRepository.find();
    return albums.map((album) => album.toResponse());
  }

  async getOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create(dto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...dto,
    };

    const createAlbum = this.albumRepository.create(newAlbum);

    return (await this.albumRepository.save(createAlbum)).toResponse();
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const updatedAlbum = await this.albumRepository.findOne({ where: { id } });

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return this.albumRepository.save(Object.assign(updatedAlbum, dto));
  }

  async delete(id: string) {
    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }
  }
}
