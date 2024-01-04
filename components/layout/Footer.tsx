import Image from "next/image";

export default function Footer() {

  return (
    <>
      <footer className='w-full flex flex-row items-center justify-center gap-8 absolute z-50 bottom-0 left-1/2 -translate-x-1/2 bg-black text-white shadow-xl  border-t border-t-0.5 border-t-gray-300 '>
        <div className="max-w-md w-full flex flex-row items-center justify-center gap-4">
          <div className="">Scaffold</div>
          <div className="divider">powered by</div>
          <div className="">
            <a
              href="https://builderz.dev"
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-row items-center justify-center gap-2 text-[4px) font-semibold]'
            >
              <Image
                src="/images/builderz-white.svg"
                height={20}
                width={80}
                style={{
                  objectFit: "contain",
                }}
                alt="builderz"
              />

            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
