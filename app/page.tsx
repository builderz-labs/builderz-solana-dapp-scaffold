import Image from "next/image";
import Modal from '../components/Modal';
import Link from 'next/link';

const Index: React.FC = async () => {

  return (
    <div className='w-full h-screen flex justify-center items-center '>
      {/* Intro Content */}
      <div className="max-w-md bg-transparent  text-black dark:text-white rounded-lg shadow-lg border border-0.5 border-gray-300 dark:border-gray-800 p-[1.25rem]">
        <div className="flex flex-col justify-center p-4 bg-inherit gap-10">
          <div className='flex flex-row items-center justify-center gap-8'>
            <a
              href="https://builderz.build"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                src="/images/builderz-symbol.svg"
                height={60}
                width={50}
                style={{
                  objectFit: "contain",
                }}
                alt="builderz"
              />
            </a>
            <Image
              width={75}
              height={75}
              src="/sol.png"
              className=''
              alt="sol"
            />
          </div>
          <h1 className="text-black dark:text-white">Hello Solana, meet Builderz.dev 👋</h1>
          <p className={` text-black dark:text-white`}>
            Explore what you can do with Builderz&rsquo; brand new{" "}
            <b>Builderz Solana dApp Scaffold</b>
          </p>
          <div className="flex flex-row items-start justify-start gap-4 ">
            <Link href='https://builderz.dev' target='_blank' className="tooltip  flex items-center justify-center" data-tip="Website">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </Link>
            <Link href='https://twitter.com/builderz__' target='_blank' className="tooltip  flex items-center justify-center" data-tip="Twitter">
              <Image src="/images/twitter.svg" alt="" width={20} height={20} className='w-6 h-6' />
            </Link>
            <Link href='https://www.linkedin.com/company/86956078/admin/feed/posts/' target='_blank' className="tooltip flex items-center justify-center" data-tip="LinkedIn">
              <Image src="/images/linkedin.svg" alt="" width={24} height={24} className='w-6 h-6' />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-start  items-center py-4">
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
