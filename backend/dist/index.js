"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = __importDefault(require("dotenv"));
var bs58 = require('bs58');
const spl_token_1 = require("@solana/spl-token");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const clusterApiUrl = process.env.VITE_DEVNET_URL;
// --- CONFIG ---
const connection = new web3_js_1.Connection(clusterApiUrl);
// Your mint account (already created with SPL)
const LST_MINT = new web3_js_1.PublicKey(process.env.YOUR_LST_MINT_ADDRESS);
// Your vault (where SOL is deposited)
const VAULT_ADDRESS = process.env.YOUR_VAULT_ADDRESS;
// Backend authority keypair (this account can mint your LST tokens)
const secret = bs58.decode(process.env.secret);
const authority = web3_js_1.Keypair.fromSecretKey(secret);
// Select correct token program (classic vs Token-2022)
const tokenProgramId = spl_token_1.TOKEN_2022_PROGRAM_ID;
// app.post("/transaction", async (req, res) => {
//   try {
//     const txData = req.body[0]; // Assuming array like in your example
//     // Extract fields
//     const sender = txData.nativeTransfers[0].fromUserAccount;
//     const receiver = txData.nativeTransfers[0].toUserAccount;
//     const amountLamports = txData.nativeTransfers[0].amount;
//     console.log("sender", sender);
//     console.log("receiver", receiver);
//     if (receiver !== VAULT_ADDRESS) {
//       return res.status(400).json({ error: "Not sent to our vault" });
//     }
//     const solAmount = amountLamports / 1_000_000_000; // lamports → SOL
//     const lstAmount = solAmount * 0.8; // Exchange rate
//     // Mint LST to sender
//     const senderPubkey = new PublicKey(sender);
//     // Get or create ATA (Associated Token Account) for sender
//     const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
//       connection,
//       authority,          // payer
//       LST_MINT,           // mint
//       senderPubkey,       // owner
//       false,              // allowOwnerOffCurve
//       "confirmed",        // commitment
//       undefined,          // includeAncillaryAccounts
//       tokenProgramId      // token program id (classic or 2022)
//     );
//     console.log("senderTokenAccount", senderTokenAccount);
//     // Mint tokens
//     const sig = await mintTo(
//       connection,
//       authority,
//       LST_MINT,
//       senderTokenAccount.address,
//       authority,
//       Math.floor(lstAmount * 1e9), // LST decimals (assuming 9)
//       [],
//       { commitment: "confirmed" },
//       tokenProgramId
//     );
//     return res.json({
//       message: "LST minted successfully",
//       sender,
//       solDeposited: solAmount,
//       lstMinted: lstAmount,
//       signature: sig,
//     });
//   } catch (err) {
//     console.error(err);
//     //@ts-ignore
//     return res.status(500).json({ error: err.message, "message": "this is error from catch" });
//   }
// });
app.post("/txn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const txn = req.body[0];
        const description = txn.description;
        const values = description.split(" ");
        const from = values[0];
        const to = values[5];
        const amount = values[2];
        const unit = values[3];
        const event = values[1];
        if (event !== 'transferred') {
            return res.status(400).json({ message: `it is not transfered event ${event} transactionbody looks like : ${txn.body}` });
        }
        if (unit == 'SOL') {
            //stack the sol to drift sol ;
            if (to !== VAULT_ADDRESS + ".") {
                return res.status(400).json({ error: "not send to our vault" });
            }
            const lstAmount = amount * 0.8;
            const fromPubicKey = new web3_js_1.PublicKey(from);
            const fromTokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, authority, LST_MINT, fromPubicKey, false, 'confirmed', undefined, tokenProgramId);
            console.log("ata address", fromTokenAccount);
            const sig = yield (0, spl_token_1.mintTo)(connection, authority, LST_MINT, fromTokenAccount.address, authority, Math.floor(lstAmount * 1e9), [], { commitment: "confirmed" }, tokenProgramId);
            return res.json({
                message: "driftSol mint successfully",
                from,
                solDeposited: amount,
                lstMinted: lstAmount,
                sig
            });
        }
        else if (unit == '6AmxLvScpqqgCfdQQ92Cc1gLxKbPzeyCsc5sztCp2HGU') {
            //unstack the driftsol to sol ; 
            if (to !== VAULT_ADDRESS + ".") {
                return res.status(400).json({ error: "not send to our vault" });
            }
            console.log("after vault address");
            const sendAmount = amount * 1.25;
            const transferTxn = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                fromPubkey: authority.publicKey,
                toPubkey: new web3_js_1.PublicKey(from),
                lamports: Math.floor(sendAmount * 1e9)
            }));
            console.log("after txn");
            console.log(authority);
            const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transferTxn, [authority]);
            console.log("after signature");
            return res.status(200).json({ signature });
        }
        else {
            return res.status(400).json({ message: `wrong token transferred ${unit}` });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}));
app.get('/', (req, res) => {
    res.send("hello world");
});
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
