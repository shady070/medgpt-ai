'use client';
import { useState, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import axios from 'axios';

const ChatPage = () => {
  const [docName, setDocName] = useState('');
  const [date, setDate] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('name');
    if (name) {
      setDocName(name);
    }
    const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    setDate(currentDate);
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2',
        { inputs: inputValue },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`, // Replace with your Hugging Face API key
            'Content-Type': 'application/json',
          },
        }
      );

      const aiMessage = { sender: 'ai', text: response.data[0]?.generated_text || 'No response from AI' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = { sender: 'ai', text: 'Error fetching AI response. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className='px-[45px] py-[30px] min-h-screen flex flex-col'>
      <div>
        <div className="h-[68px] w-[293px] rounded-md bg-[#29292A] text-white flex items-center justify-between px-[20px] mb-[10px]">
          <h1 className="text-[20px]">New Chat</h1>
          <IoMdAdd className="text-white" />
        </div>
        <div className="h-[68px] w-[293px] rounded-md bg-[#29292A] text-white flex items-center justify-between px-[20px] mb-[10px]">
          <div>
            <h1 className="text-[20px]">{docName || 'Untitled Document'}</h1>
            <p className="text-[15px]">{date}</p>
          </div>
          <div className="text-white">
            <BsThreeDots />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="align-baseline w-full flex items-end">
        <Input
          className="w-full bg-[#29292A] ml-[10px] mr-[10px]"
          type="text"
          placeholder="What do you want to know?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="button" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
