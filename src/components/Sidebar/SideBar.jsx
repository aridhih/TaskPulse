import React, { useState } from 'react';
import { BsQuestionOctagon } from 'react-icons/bs';
import { FaInbox } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { IoHome, IoVideocamOutline } from 'react-icons/io5';
import { MdCastConnected } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import { TfiCup } from 'react-icons/tfi';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
    const [showHelp, setShowHelp] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const navLinks = [
        {
            name: "Home",
            icon: <IoHome />,
            path: "/home"
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
            icon: <MdCastConnected />,
            path: "/pulse"
        },
        {
            name: "Clips",
            icon: <IoVideocamOutline />,
            path: "/clips"
        },
        {
            name: "Timesheets",
            icon: <RiTimerLine />,
            path: "/timesheets"
        },
    ];

    return (
        <div className="h-[calc(100vh-48px)] w-[100px] bg-gradient-to-b from-background via-blue-500 to-purple-500  text-textPrimary flex flex-col">
            <div className="flex flex-col gap-1 justify-evenly items-center">
                {navLinks.map((link) => (
                    <div key={link.name} className='p-2 flex justify-center items-center'>
                        <a
                            href={link.path}
                            key={link.name}
                            className={`flex flex-col justify-center items-center ${currentPath === link.path ? 'text-accent' : 'hover:text-accent'}`}
                        >
                            <div className={`w-8 h-8 flex rounded-lg justify-center items-center ${currentPath === link.path ? 'bg-button text-surface' : 'hover:bg-[#f9fafb50]'} transform transition-transform duration-300 ${currentPath === link.path ? 'scale-100' : 'hover:scale-110'}`}>
                                {link.icon}
                            </div>
                            <p className={`text-[12px] ${currentPath === link.path && 'text-white'}`}>{link.name}</p>
                        </a>
                    </div>
                ))}
            </div>
            <div className='relative flex rounded-lg justify-center mt-5 items-center' >
                <BsQuestionOctagon
                    className='cursor-pointer '
                    onMouseEnter={() => setShowHelp(true)}
                    onMouseLeave={() => setShowHelp(false)}
                    
                />
                {showHelp && (
                    <div className="absolute z-50 bottom-[-9px] left-[68px] w-28 p-2  bg-white border text-surface border-gray-200 rounded-md shadow-lg text-center text-xs flex items-center">
                        <div className="border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-200 absolute left-[-10px]"></div>
                        Need any help?
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBar;