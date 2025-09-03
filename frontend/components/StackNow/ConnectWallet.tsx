'use client'
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";

function shortenAddress(addr: string, chars = 4) {
    if (!addr) return "";
    return `${addr.slice(0, chars)}…${addr.slice(-chars)}`;
}

export function WalletButton() {
    const { connected, publicKey, disconnect } = useWallet();
    const { setVisible } = useWalletModal();

    const short = useMemo(
        () => (publicKey ? shortenAddress(publicKey.toBase58(), 4) : ""),
        [publicKey]
    );

    if (!connected) {
        return (
            <Button
                onClick={() => setVisible(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
            </Button>
        );
    }

    return (
        <Button
            onClick={() => disconnect()}
            variant="secondary"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            title={publicKey?.toBase58()}
        >
            <LogOut className="mr-2 h-4 w-4 " />
            {short} • Disconnect
        </Button>
    );
}