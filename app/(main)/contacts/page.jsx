"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { PlusCircle, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { CreateGroupModal } from './_components/create-group-modal';

const ContactsPage = () => {
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const {data,isLoading} = useConvexQuery(api.contacts.getAllContacts);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(()=>{
      const createGroupParam = searchParams.get("createGroup");

      if(createGroupParam==="true"){
        setIsCreateGroupModalOpen(true);

        const url = new URL(window.location.href);
        url.searchParams.delete("createGroup");

        router.replace(url.pathname + url.search);
      }
    },[searchParams,router]);

    if(isLoading){
        return(
            <div className='container max-auto py-12'>
                <BarLoader width={"100%"} color="#38BDF8"/>
            </div>
        );
    }

    const {users,groups} = data || {users:[],groups:[]};

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-5xl gradient-title'>Contacts</h1>
        <Button onClick={()=>setIsCreateGroupModalOpen(true)} className=" bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <PlusCircle className='h-4 w-4'/>
            Create Group
        </Button>
      </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <h2 className='text-xl font-bold mb-4 flex items-center'>
                    <User className='mr-2 h-5 w-5'/>
                    People
                </h2>

                {users.length===0 ? (
                    <Card>
                        <CardContent className="py-6 text-center text-muted-foreground">
                            No contacts yet. Add an expense with someone to see them here.
                        </CardContent>
                    </Card>
                ):(
                    <div className="flex flex-col gap-4">
              {users.map((user) => (
                <Link key={user.id} href={`/person/${user.id}`}>
                  <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback>
                              {user?.name?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
                )}
            </div>
             {/* Groups */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Groups
          </h2>
          {groups.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground">
                No groups yet. Create a group to start tracking shared expenses.
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {groups.map((group) => (
                <Link key={group.id} href={`/groups/${group.id}`}>
                  <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{group.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {group.memberCount} members
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateGroupModal
        isOpen = {isCreateGroupModalOpen}
        onClose={()=>setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => router.push(`/groups/${groupId}`)}
      />

    </div>
  )
};

export default ContactsPage;
