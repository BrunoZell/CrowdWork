import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { SLIP10Node, BIP44CoinTypeNode, getBIP44AddressKeyDeriver } from '@metamask/key-tree';
// import * as dag4 from '../dag/dag4';
// import {DagAccount} from "../dag/dag4-wallet/dag-account"
const secp = require("@noble/secp256k1");
import * as jsSha256 from "js-sha256";
import * as bs58 from 'bs58';
import {Buffer} from 'buffer';
// import dag4 from '../dag4';
// import dagWrapper from "../../dag-account/dist/app"

const CONSTANTS = {
  PKCS_PREFIX: '3056301006072a8648ce3d020106052b8104000a034200' //Removed last 2 digits. 04 is part of Public Key.
}

var getPublicKeyFromPrivate = function (privateKey: string, compact = false) {
    return Buffer.from(secp.getPublicKey(privateKey, compact)).toString('hex');
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

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  
  const dagNode : any = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      path: ["m", "44'", "1137'"],
      curve: "secp256k1"
      // coinType: 1137, // = $DAG. from https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    },
  });

  console.log(dagNode);

  
  // Next, we'll create an instance of a SLIP-10 node for the Dogecoin node.
  const dagSlip10Node = await SLIP10Node.fromJSON(dagNode);

  // m / 44' / 3' / 0'
  const dagAccount = await dagSlip10Node.derive(["bip32:0'"]);


  // Creates a function that takes an index and returns an extended private key for m/44'/3'/0'/0/address_index
  // The second parameter to getBIP44AddressKeyDeriver is not passed. This sets account and change to 0
  // const deriveDagAddress = await getBIP44AddressKeyDeriver(dagNode);

  // Derive the second DAG address, which has index 0
  // const dagAccount : any = await deriveDagAddress(0);
  // {"depth":5,"parentFingerprint":1325694261,"index":0,"privateKey":"0xd76f211a053ca6d6fff20524392f72d34b4a5ffe4db676c2633d57e541f1ee5a","publicKey":"0x044ecb168ba757aa47c87976c9a71a7f0f1ef4d4d078f00704db47937e0da3fba5543771eb905edc13d87b67aa75aeafe03d15a416dd5ac9c531851db771d512b1","chainCode":"0x710d590aef36d9998beed11cbec5f80cc00c945c9255e4c31eeab4a564d04432"}!

  // console.log(dagAccount);
  //"depth":3,"masterFingerprint":3084211258,"parentFingerprint":3994117561,"index":2147483648,"curve":"secp256k1","privateKey":"0x315281e1a6a0b65b16ac425276d6d0062ccdab1d2cbe3125f20c9ac793539be0","publicKey":"0x0462442af7a613f6f1aeec74ea22ada9778c05a77521610193c3069b99b4c58a7fda46f650022079a097d4473f7b6fd10599156cb8e5f6146a47981f4d52cd2965","chainCode":"0x69b43484447ebd7379b7e7bbc3b7201b5bd4b732bf3ca420f02da6933aed2376"}!
  
  const publicKeyHexString = getPublicKeyFromPrivate(dagAccount.privateKey.substring(2), true);
  const address = getDagAddressFromPublicKey(publicKeyHexString);
  // const address = getDagAddressFromPublicKey(dagAccount.publicKey);

  switch (request.method) {
    case 'publish':
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([
            text(`Hello, **${JSON.stringify(address)}**!`),
            text('Ready to publish your project?'),
            text('Here we go!'),
          ]),
        },
      });
    case 'accept':
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([
            text(`Hello, **${JSON.stringify(address)}**!`),
            text('Onboard this builder?'),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
