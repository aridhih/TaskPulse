import React from 'react';
import { FaInbox } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { IoHome } from 'react-icons/io5';
import { TfiAnnouncement, TfiCup } from 'react-icons/tfi';

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
            name: "Announcements",
            icon: <TfiAnnouncement /> ,
            path: "/Announcements"
        },
    ]
    
    return (
        <div className="h-[calc(100vh-48px)] w-[100px] bg-gray-800 text-white flex flex-col justify-between">
            <div className="flex flex-col gap-1 justify-center items-center">
                {navLinks.map((link) => (
                    <div key={link.name} className='p-2 flex justify-center items-center'>
                        <a href={link.path} key={link.name} className="flex flex-col justify-center items-center">
                            <div className='w-8 h-8 flex rounded-lg justify-center items-center hover:bg-[#d3d3d351]'>{link.icon}</div> <p className='text-[12px]'>{link.name}</p>
                        </a>
                    </div>
                ))}
            </div>


            <footer className="p-4 bg-gray-900 border-t border-gray-700">
                <p className="text-sm text-gray-400">© 2024 TaskPulse</p>
            </footer>
        </div>
    );
};

export default SideBar;
