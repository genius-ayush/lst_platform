'use client'
import { Wind } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import ThemeButton from '../ThemeButton'
import { useRouter } from 'next/navigation'
import { WalletButton } from './ConnectWallet'
function Header() {
  const router = useRouter() ; 
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={()=>router.push('/')}>
              <Wind className="h-8 w-8 text-primary" />
              <span className="text-2xl font-semibold text-foreground">Drift</span>
            </div>
            <div className="flex space-x-4">
              
                <ThemeButton/>
                <WalletButton/>
            </div>
          </nav>
        </div>
      </header>
  )
}

export default Header