import React from "react";
import { SiGoogledocs } from "react-icons/si";
import { FaDownload } from "react-icons/fa";

const DocsPage = () => {
  return (
    <div className="h-[calc(100vh-50px)] w-full border border-gray-200 rounded-lg bg-surface">
      <div className="h-[54px] w-full border-b text-textPrimary border-gray-200 bg-navbar p-2 justify-between rounded-t-lg flex items-center">
        <div className="flex items-center gap-1 ml-1 text-textPrimary">
          <SiGoogledocs />
          <p className="text-[13px] cursor-default font-[cursive]">Docs</p>
        </div>

        <div className="flex items-center relative p-2 gap-2">
          <button className="bg-[#624ae8] hover:bg-[#5a44d4] rounded h-8 py-1 px-2 text-white">
            New Doc
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-115px)] w-full p-4 flex flex-col gap-4 bg-surface overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-2 gap-3 my-3">
          {/* Dummy Docs */}
          {["Doc1", "Doc2", "Doc3", "Doc4"].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded bg-white shadow">
              <div className="flex items-center gap-2">
                <SiGoogledocs className="text-blue-500" />
                <p className="text-[13px] cursor-default font-[cursive]">{doc}</p>
              </div>
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                <FaDownload />
                <span className="text-[12px]">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
