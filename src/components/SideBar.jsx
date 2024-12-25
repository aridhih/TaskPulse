import React from 'react';
import { FaInbox } from 'react-icons/fa';
import { GrResources } from 'react-icons/gr';
import { IoHome } from 'react-icons/io5';
import { TfiCup } from 'react-icons/tfi';

const SideBar = () => {

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
    ]


    return (
        <div className="h-[calc(100vh-48px)] w-[100px] bg-gray-800 text-white flex flex-col  justify-between">
            <div>
                {navLinks.map((link) => (
                <div key={link.name} className='flex hover:bg-[#d3d3d328]  rounded-lg min-w-[100px] py-4 justify-center items-center'>
                    <a href={link.path} key={link.name}
                        className="flex gap-2 justify-center items-center"
                    >{link.icon}  <h3>{link.name}</h3></a>
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
