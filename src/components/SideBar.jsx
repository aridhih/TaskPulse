import React from 'react';
import { BsQuestionOctagon } from 'react-icons/bs';
import { FaInbox } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { IoHome, IoVideocamOutline } from 'react-icons/io5';
import { MdCastConnected } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import {  TfiCup } from 'react-icons/tfi';

const SideBar = () => {
    const navLinks = [
        {
            name: "Home",
            icon: <IoHome />,
            path: "/"
        },
        {
            name: "Inbox",
            icon: <FaInbox />,
            path: "/inbox"
        },
        {
            name: "Docs",
            icon: <GrResources />,
            path: "/docs"
        },
        {
            name: "Goals",
            icon: <TfiCup />,
            path: "/goals"
        },
        {
            name: "Pulse",
            icon: <MdCastConnected /> ,
            path: "/pulse"
        },
        {
            name: "Clips",
            icon: <IoVideocamOutline /> ,
            path: "/clips"
        },
        {
            name: "Timesheets",
            icon: <RiTimerLine /> ,
            path: "/clips"
        },
        
    ]
    
    return (
        <div className="h-[calc(100vh-48px)] w-[100px]  bg-background text-textPrimary flex flex-col">
            <div className="flex flex-col gap-1 justify-evenly items-center">
                {navLinks.map((link) => (
                    <div key={link.name} className='p-2 flex justify-center items-center'>
                        <a href={link.path} key={link.name} className="flex flex-col justify-center items-center  hover:text-accent">
                            <div className='w-8 h-8 flex rounded-lg justify-center items-center hover:bg-surface '>{link.icon}</div> <p className='text-[12px] '>{link.name}</p>
                        </a>
                    </div>
                ))}
            </div>
            <a className=' flex rounded-lg justify-center mt-5 items-center '><BsQuestionOctagon className='transition-transform transform hover:scale-110 cursor-pointer duration-300 ease-in-out' /> </a>

        </div>
    );
};

export default SideBar;
