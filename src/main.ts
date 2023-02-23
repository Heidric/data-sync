import axios from 'axios';
import { DataSyncService } from './services/data-sync.service';
import config from './config';
import { CarData } from './db';

async function start(): Promise<void> {
  await CarData.sync();

  console.log('Current DB status: ', await DataSyncService.getDbStatus());
  let newData;

  try {
    newData = await axios.get(config.dataUrl);
  } catch (e) {
    console.log('Failed to fetch new data: ', e);
    process.exit(1);
  }

  try {
    console.log(await DataSyncService.processData(newData));
  } catch (e) {
    console.log('Failed to process data: ', e);
    process.exit(1);
  }

  process.exit(0);
}

start();
