import express from 'express';
import * as dag4 from '@stardust-collective/dag4';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(dag4.dag4);
    dag4.dag4.account.loginSeedPhrase("");
    const address = dag4.dag4.account.address;
    console.log(address);

  return console.log(`Express is listening at http://localhost:${port}`);
});