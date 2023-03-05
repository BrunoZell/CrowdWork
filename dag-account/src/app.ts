import express from 'express';
import * as dag4 from '@stardust-collective/dag4';
const secp = require("@noble/secp256k1");
import {Buffer} from 'buffer';
import * as jsSha256 from "js-sha256";
import * as bs58 from 'bs58';

const CONSTANTS = {
  PKCS_PREFIX: '3056301006072a8648ce3d020106052b8104000a034200' //Removed last 2 digits. 04 is part of Public Key.
}

var getDagAddressFromPublicKey = function (publicKeyHex: string) {

  //PKCS standard requires a prefix '04' for an uncompressed Public Key
  // An uncompressed public key consists of a 64-byte number; 2 bytes per number in HEX is 128
  // Check to see if prefix is missing
  if (publicKeyHex.length === 128) {
    publicKeyHex = '04' + publicKeyHex;
  }

  publicKeyHex = CONSTANTS.PKCS_PREFIX + publicKeyHex;

  const sha256Str = jsSha256.sha256(Buffer.from(publicKeyHex, 'hex'));

  const bytes = Buffer.from(sha256Str, 'hex');
  const hash = bs58.encode(bytes);

  let end = hash.slice(hash.length - 36, hash.length);
  let sum = end.split('').reduce((val: number, char: any) => (isNaN(char) ? val : val + (+char)), 0);
  let par = sum % 9;

  return ('DAG' + par + end);
}


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(dag4.dag4);

    // dag4.dag4.account.loginSeedPhrase("");
    // const address = dag4.dag4.account.address;
    const pubKey = Buffer.from(secp.getPublicKey("d76f211a053ca6d6fff20524392f72d34b4a5ffe4db676c2633d57e541f1ee5a", false));
    const pubKeyHexString = pubKey.toString('hex');
    const address = getDagAddressFromPublicKey(pubKeyHexString);
    console.log(address);

  return console.log(`Express is listening at http://localhost:${port}`);
});