"use strict";
// const mintPublicKey = "6AmxLvScpqqgCfdQQ92Cc1gLxKbPzeyCsc5sztCp2HGU"
// import {
//     createMint,
//     getOrCreateAssociatedTokenAccount,
//     mintTo,
//     TOKEN_2022_PROGRAM_ID
//   } from "@solana/spl-token";
//   import { Connection, Keypair, PublicKey } from "@solana/web3.js";
// export const mintTokens = async(fromAddress:string , toAddress : string , sol : string ) => {
//     const connection = new Connection("https://api.mainnet-beta.solana.com");
//     // You'll need to create a Keypair for the fee payer
//     const feePayer = Keypair.generate(); // Replace with actual keypair
//     const tokenAccount = await getOrCreateAssociatedTokenAccount(
//         connection,
//         feePayer, // The fee payer (must be a Keypair)
//         new PublicKey("6AmxLvScpqqgCfdQQ92Cc1gLxKbPzeyCsc5sztCp2HGU"), // Your mint address
//         new PublicKey(toAddress), // The recipient's public key
//         true,
//         "finalized",
//         undefined,
//         TOKEN_2022_PROGRAM_ID,
//       );
// }
