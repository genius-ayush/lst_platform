import express from "express";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv'
var bs58 = require('bs58')


import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";

const app = express();
app.use(express.json());
dotenv.config() ; 
const clusterApiUrl = process.env.VITE_DEVNET_URL

// --- CONFIG ---
const connection = new Connection(clusterApiUrl!)


// Your mint account (already created with SPL)
const LST_MINT = new PublicKey(process.env.YOUR_LST_MINT_ADDRESS!);

// Your vault (where SOL is deposited)
const VAULT_ADDRESS = process.env.YOUR_VAULT_ADDRESS!;

// Backend authority keypair (this account can mint your LST tokens)
const secret = bs58.decode(process.env.secret!);
const authority = Keypair.fromSecretKey(secret);
console.log("authority" , authority)
// Select correct token program (classic vs Token-2022)
const tokenProgramId =  TOKEN_2022_PROGRAM_ID 

app.post("/transaction", async (req, res) => {
  try {
    const txData = req.body[0]; // Assuming array like in your example
    
    // Extract fields
    const sender = txData.nativeTransfers[0].fromUserAccount;
    const receiver = txData.nativeTransfers[0].toUserAccount;
    const amountLamports = txData.nativeTransfers[0].amount;
    console.log("sender" , sender) ;
    console.log("receiver" , receiver) ; 

    if (receiver !== VAULT_ADDRESS) {
      
      return res.status(400).json({ error: "Not sent to our vault" });
    }

    const solAmount = amountLamports / 1_000_000_000; // lamports → SOL
    const lstAmount = solAmount * 0.8; // Exchange rate

    // Mint LST to sender
    const senderPubkey = new PublicKey(sender);

    // Get or create ATA (Associated Token Account) for sender
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      authority,          // payer
      LST_MINT,           // mint
      senderPubkey,       // owner
      false,              // allowOwnerOffCurve
      "confirmed",        // commitment
      undefined,          // includeAncillaryAccounts
      tokenProgramId      // token program id (classic or 2022)
    );

    console.log("senderTokenAccount" , senderTokenAccount) ; 

    // Mint tokens
    const sig = await mintTo(
      connection,
      authority,
      LST_MINT,
      senderTokenAccount.address,
      authority,
      Math.floor(lstAmount * 1e9), // LST decimals (assuming 9)
      [],
      { commitment: "confirmed" },
      tokenProgramId
    );

    res.json({
      message: "LST minted successfully",
      sender,
      solDeposited: solAmount,
      lstMinted: lstAmount,
      signature: sig,
    });
  } catch (err) {
    console.error(err);

    
    //@ts-ignore
    res.status(500).json({ error: err.message , "message" :"this is error from catch" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
