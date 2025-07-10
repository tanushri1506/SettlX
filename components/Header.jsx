"use client";

import { useStoreUser } from '@/hooks/use-store-user';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Unauthenticated, Authenticated } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import {BarLoader} from "react-spinners";
import { Button } from './ui/button';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {

  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logos/logo.png"}
              alt='SettlX logo'
              width={200}
              height={60}
              className='h-11 w-auto object-contain'
            />
          </Link>

          {path === "/" && (
            <div className='hidden md:flex items-center gap-6'>
              <Link 
                href="#features"
                className='text-sm font-medium hover:text-blue-600 transition'
              >
                Features
              </Link>
              <Link 
                href="#how-it-works"
                className='text-sm font-medium hover:text-blue-600 transition'
              >
                How It Works
              </Link>
            </div>
          )}

          <div className="flex items-center gap-4">

            <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 hover:text-blue-600 hover:border-blue-600 transition cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            <UserButton
            />
          </Authenticated>


            <Unauthenticated>
            <SignInButton>
              <Button className="cursor-pointer" variant={"ghost"}>Sign In</Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-blue-600 hover:bg-blue-700 border-none cursor-pointer">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
          </div>



      </nav>

          {isLoading && <BarLoader width={"100%"} color="#38BDF8" />}
    </header>
  )
}

export default Header
