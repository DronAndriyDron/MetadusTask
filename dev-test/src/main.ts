import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import {ValidationPipe} from '@nestjs/common';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
const FastifyAdapterParams = {logger: true}
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(FastifyAdapterParams));
    app.useGlobalPipes(new ValidationPipe());

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000,'0.0.0.0');
}

bootstrap();
