import { Module } from '@nestjs/common';
import { InMemoryDb } from './db.service';

@Module({
  providers: [InMemoryDb],
  exports: [InMemoryDb],
})
export class DbModule {}
