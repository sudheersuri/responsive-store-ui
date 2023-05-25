'use client';

import "./globals.css";
import GlobalContext from "../GlobalContext";
import { useState } from "react";
import SideBar from "../components/SideBar";
import CartDrawer from "../components/CartDrawer";
import Link from "next/link";


export default function RootLayout({ children }) {
  const [globals,setGlobals] = useState({openCartDrawer:false,openSideBar:false,cartItems:[]});
  
  return (
    <html lang="en">
      <GlobalContext.Provider value={{globals,setGlobals}} >
      <body className="bg-white">
      <SideBar />
        <header aria-label="Site Header" className="border-b border-gray-100">
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button type="button" className="p-2 lg:hidden" onClick={()=>{setGlobals({...globals,openSideBar:true,openCartDrawer:false})}}>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <a href="#" className="flex">
                <span className="sr-only">Logo</span>
                <span className="text-lg">S T O R E</span>
              </a>
            </div>

            <div className="flex flex-1 items-center justify-end gap-8">
              <nav
                aria-label="Site Nav"
                className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
              >
                <a
                  href="/about"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-gray-700"
                >
                  About
                </a>

                <a
                  href="/news"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-gray-700"
                >
                  News
                </a>
                <Link href="/products"
                   className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-gray-700"
                >Products</Link>
                <a
                  href="/contact"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-gray-700"
                >
                  Contact
                </a>
              </nav>

              <div className="flex items-center">
                <div className="flex items-center border-x border-gray-100">
                <span className="border-e border-e-gray-100">
  <a
    onClick={() => setGlobals({ ...globals,openCartDrawer: true })}
    href={() => false}
    className="relative hover:cursor-pointer grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-gray-700"
  >
    <div>
    <svg
      className="relative h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
    <span className="p-1 bg-gray-700 text-white rounded-full h-6 w-6 text-center text-xs leading-4 absolute top-3 right-1">
      {globals.cartItems.length}
    </span>
    </div>
    <span className="sr-only">Cart</span>
  </a>
</span>

                  <span className="border-e border-e-gray-100">
                    <a
                      href="/account"
                      className="grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-gray-700"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>

                      <span className="sr-only"> Account </span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <CartDrawer />
         
        </header>
         <div>
          {children}
         </div>
      </body>
      </GlobalContext.Provider>
    </html>
  );
}
