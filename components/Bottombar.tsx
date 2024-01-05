import React from 'react';

const Bottombar: React.FC = () => {
  return (
    <div className="absolute z-10 bottom-0 -left-0 w-full bg-brand-bg border rounded-sm border-brand-border border-opacity-50 flex flex-row items-center justify-between p-4">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="flex flex-row items-center justify-center gap-8 border-r border-r-brand-border pr-6 pl-2 h-full">
          <button>
            <img
              src="/images/bottombar/sun.svg"
              alt="sun"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
          <button>
            <img
              src="/images/bottombar/moon.svg"
              alt="moon"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-8 border-r border-r-brand-border pr-6 pl-2 h-full">
          <button>
            <img
              src="/images/bottombar/keychain.svg"
              alt="keychain"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 pr-4 h-full border-r border-r-brand-border">
          <button className="bg-[#3330FA] p-1">
            <img
              src="/images/bottombar/sun.svg"
              alt="sun"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
          <button className="bg-[#1F2028] p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out ]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        {/* List of ... */}
      </div>

      <div className="flex flex-row items-center justify-start gap-4">
        <div className="flex flex-row items-center justify-center gap-8 pl-6 pr-2 border-l border-l-brand-border">
          <button>
            <img
              src="/images/bottombar/mail.svg"
              alt="sun"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-8 border-l border-l-brand-border pl-6 pr-2">
          <button>
            <img
              src="/images/bottombar/at.svg"
              alt="sun"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
          <button>
            <img
              src="/images/bottombar/info.svg"
              alt="sun"
              className="w-6 h-6 hover:opacity-40 transition-all duration-300 ease-in-out"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
