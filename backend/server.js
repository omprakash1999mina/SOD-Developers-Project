// "use strict";
import express from 'express';
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middleware/errorHandler';
const app = express();
import routes from './routes';
import mongoose from 'mongoose';
import PrometheusMetricsController from './Services/Prometheus';
import cors from "cors";

app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "DELETE", "PUT"]
}));

//Database connection
try {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const client = mongoose.connection
  client.on('error', console.error.bind(console, 'connection error:'));
  client.once('open', () => {
    console.log('DB connected...');
  });
} catch (err) {
  console.log('DB connection failed');
}

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandler);
app.set('view engine', 'ejs');

// Route for Metrics data export
app.get('/metrics',PrometheusMetricsController.generate);

//The 404 Route (ALWAYS Keep this as the last route)
app.all('*', (req, res) => {
  res.render('NotFound')
})

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}. `));