import { serverHttp } from './http';

import './websocket';

serverHttp.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
