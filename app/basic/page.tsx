import Image from "next/image";
import Modal from '../../components/Modal';

const Index: React.FC = async () => {

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {/* Intro Content */}
      <div className="max-w-md  text-black dark:text-white rounded-lg shadow-lg border border-0.5 border-gray-300 dark:border-gray-800 p-[1.25rem]">
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
          <div className="flex flex-col md:flex-row justify-start  items-center py-4">
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
