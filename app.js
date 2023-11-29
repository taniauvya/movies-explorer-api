const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const { MONGO_URL } = require('./config');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(rateLimiter);
app.use(requestLogger);
app.use(cors);
app.use(helmet());

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(require('./middlewares/error'));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  /* eslint-disable no-console */
  console.log(`App listening on port ${PORT}`);
  /* eslint-allow no-console */
});
