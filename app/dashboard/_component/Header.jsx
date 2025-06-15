"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
    const path = usePathname();
    const { isLoaded, user } = useUser(); // Hook to access user information

    useEffect(() => {
        // console.log(path);
    }, []);

    return (
        <div>
            <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
                <img src={"/logo.svg"} width={40} height={70} />
                <ul className="hidden md:flex gap-6 ">
                    <li>
                        <Link href="/" className={`hover:text-purple-600 transition-all cursor-pointer ${path === "/home" && "text-purple-600 font-bold"}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className={`hover:text-purple-600 transition-all cursor-pointer ${path === "/dashboard" && "text-purple-600 font-bold"}`}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/questions" className={`hover:text-purple-600 transition-all cursor-pointer ${path === "/questions" && "text-purple-600 font-bold"}`}>
                            Questions
                        </Link>
                    </li>
                    <li>
                        <Link href="/how-it-works" className={`hover:text-purple-600 transition-all cursor-pointer ${path === "/how-it-works" && "text-purple-600 font-bold"}`}>
                            How it works?
                        </Link>
                    </li>
                </ul>


                {/* Conditional Rendering */}
                {isLoaded && user ? (
                    <UserButton />
                ) : (
                    <img src="/placeholder.png" alt="Placeholder" width={40} height={40} />
                )}
            </div>
        </div>
    );
}

export default Header;
