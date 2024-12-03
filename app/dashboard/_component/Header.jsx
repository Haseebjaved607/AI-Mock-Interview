"use client"
import { UserButton, useUser } from '@clerk/nextjs'
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
                    <li
                        className={`hover:text-purple-600 transition-all cursor-pointer ${
                            path === "/dashboard" && "text-purple-600 font-bold"
                        }`}
                    >
                        Dashboard
                    </li>
                    <li className={`hover:text-purple-600 transition-all cursor-pointer ${
                            path === "/Questions" && "text-purple-600 font-bold"
                        }`}>
                       Questions
                    </li>
                    <li className={`hover:text-purple-600 transition-all cursor-pointer ${
                            path === "/Upgrade" && "text-purple-600 font-bold"
                        }`}>
                        Upgrade
                    </li>
                    <li className={`hover:text-purple-600 transition-all cursor-pointer ${
                            path === "/How it work?" && "text-purple-600 font-bold"
                        }`}>
                        How it work?
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
