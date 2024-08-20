'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' in the app directory
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';

const Hero = () => {
  const [docName, setDocName] = useState('');
  const router = useRouter();

  const handleSave = () => {
    if (docName.trim()) {
      // Navigate to the chat page with the document name as a query parameter
      router.push(`/chat?name=${encodeURIComponent(docName.trim())}`);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-[294px] h-[294px] bg-[#101012] rounded-full border-[16px] border-[#B2B2B2] flex flex-col gap-[1px] items-center justify-center text-white'>
        <p className='text-[20px]'>Hi! Hassan 👋</p>
        <Dialog>
          <DialogTrigger className='text-[36px]'>Tab to Chat</DialogTrigger>
          <DialogContent className='bg-[#0E0E10] text-white'>
            <DialogHeader>
              <div>
                <h1 className="text-[20px] font-[500] text-white">Document Name</h1>
                <div className="flex flex-col">
                  <input 
                    className="w-[300px] bg-[#29292A] px-[10px] py-[10px] rounded-md mt-[12px] text-white" 
                    type="text" 
                    placeholder="Enter Document Name Doc" 
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                  />
                  <Button 
                    className='text-[20px] gap-[6px] py-[8px] px-[14px] bg-[#d9d9d923] font-light hover:bg-[#B2B2B2] mt-[12px] w-[100px]'
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Hero;