'use-client'
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react';
import { NavbarButton } from './ui/resizable-navbar';

function ThemeButton() {

    const { theme , setTheme } = useTheme() ; 

    const toggleTheme = ()=>{
        setTheme(theme === 'dark' ? 'light' : 'dark') ; 
        console.log(theme) ; 
    }
  return (
    <NavbarButton className='p-2 rounded-full dark:bg-[#181414] dark:text-white  '  onClick={toggleTheme} >
        {theme == 'dark' ? (
            <Moon className='w-4 h-4 md:w-5 md:h-5' />
        ) : (
            <Sun className='w-4 h-4 md:w-5 md:h-5'/>
        )}
    </NavbarButton>
  )
}

export default ThemeButton