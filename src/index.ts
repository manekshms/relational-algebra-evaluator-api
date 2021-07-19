import Container from 'typedi';
import app from './app';
import { ConfigService } from './libs/ConfigService';

const config = Container.get(ConfigService);
const port = config.get('PORT');
const { log } = console;
app.listen(port, () => log(`App running on port ${port}`));
