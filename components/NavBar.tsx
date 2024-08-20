import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const NavBar = () => {
  return (
    <nav className='md:px-[45px] md:py-[30px] px-[20px] py-[10px] flex items-center justify-between'>
        <div className='flex items-center gap-[20px]'>
            <Image src='/Profile.png' width={58} height={58} alt='Profile Picture' />
            <a className='text-white text-[24px]' href="/">Home</a>
        </div>
        <div className='flex gap-[20px] items-center'>
            <Button className='text-[24px] gap-[6px] py-[8px] px-[14px] bg-[#d9d9d923] font-light hover:bg-[#0E0E10]'> <Image src='/Invite.png' width={34} height={34} alt='Icon' /> Invite</Button>
            <Image src='/Settings.png' width={42} height={42} alt='Profile Picture' />
        </div>
    </nav>
  )
}

export default NavBar