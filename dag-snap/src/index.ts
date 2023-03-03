import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { BIP44CoinTypeNode, getBIP44AddressKeyDeriver } from '@metamask/key-tree';
// import * as dag4 from '@stardust-collective/dag4';
// import dag4 from '@stardust-collective/dag4';
// import dagWrapper from "../../dag-account/dist/app"

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
  
  // Get the Dogecoin node, corresponding to the path m/44'/3'
  const dagNode : any = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 1137, // = $DAG. from https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    },
  });

  console.log(dagNode);

  // Creates a function that takes an index and returns an extended private key for m/44'/3'/0'/0/address_index
  // The second parameter to getBIP44AddressKeyDeriver is not passed. This sets account and change to 0
  const deriveDagAddress = await getBIP44AddressKeyDeriver(dagNode);

  // Derive the second DAG address, which has index 0
  const dagAccount : any = await deriveDagAddress(0);
  // {"depth":5,"parentFingerprint":1325694261,"index":0,"privateKey":"0xd76f211a053ca6d6fff20524392f72d34b4a5ffe4db676c2633d57e541f1ee5a","publicKey":"0x044ecb168ba757aa47c87976c9a71a7f0f1ef4d4d078f00704db47937e0da3fba5543771eb905edc13d87b67aa75aeafe03d15a416dd5ac9c531851db771d512b1","chainCode":"0x710d590aef36d9998beed11cbec5f80cc00c945c9255e4c31eeab4a564d04432"}!

  console.log(dagAccount);

  // dag4.account.loginPrivateKey(dagAccount.privateKey);
  // const address = dag4.account.address;

  switch (request.method) {
    case 'publish':
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([
            // text(`Hello, **${JSON.stringify(dagWrapper)}**!`),
            text('Ready to publish your project?'),
            text('Here we go!'),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
