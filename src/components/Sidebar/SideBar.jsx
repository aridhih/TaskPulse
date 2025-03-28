import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaInbox } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { IoHome, IoVideocamOutline } from 'react-icons/io5';
import { MdCastConnected } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
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
            <div className='border-t pt-7 mt-4  border-gray-200 items-center justify-center flex'>
                <div className='flex justify-center items-center w-fit'>
                    <a
                        href='/teams'
                        key='Team'
                        className={`flex flex-col justify-center items-center`}
                    >
                        <div className={`w-8 h-8 flex rounded-lg text-button justify-center items-center bg-surface ${currentPath === '/teams' ? 'scale-110' : 'hover:scale-110'} transform transition-transform duration-300`}>
                            <AiOutlineTeam />
                        </div>
                        <p className={`text-[12px] font-semibold ${currentPath === '/teams' && 'text-white'}`}>Teams</p>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default SideBar;