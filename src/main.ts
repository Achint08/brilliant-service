import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  /*
  * Default logger set to console.
  */
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  /*
  * Global Middlewares to secure the applications
  * # Helmet
  * Helmet can help protect your app from some well-known web
  * vulnerabilities by setting HTTP headers appropriately.
  * Generally, Helmet is just a collection of 12 smaller
  * middleware functions that set security-related HTTP headers.
  * Read More: https://github.com/helmetjs/helmet#how-it-works
  */
  app.use(helmet());
  /*
  * Cross-origin resource sharing (CORS) is a mechanism that
  * allows resources to be requested from another domain.
  * Read More: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  */
  app.enableCors();
  /*
  * Basic rate-limiting middleware for Express. Use to limit
  * repeated requests to public APIs and/or endpoints such as password reset.
  * Read More: https://github.com/nfriedly/express-rate-limit
  */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(3000);
}
bootstrap();
