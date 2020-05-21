import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    TicketsModule,
    MongooseModule.forRoot('mongodb://localhost/tickets', {
      useNewUrlParser: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
