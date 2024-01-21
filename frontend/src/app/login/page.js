'use client'
import React from 'react'
import { Input,Button , Divider,Modal, ModalContent, ModalHeader,  ModalFooter, useDisclosure} from '@nextui-org/react'
import { useState } from 'react';
import Link from "next/link";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Register from './registermodal'

const page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login =()=>{
    //login details here
  }
 
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <form className='border-1 p-20 rounded-2xl backdrop-blur-md'>
          <Input
            isRequired
            className="max-w-xs mb-4"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-xs mb-4"
              endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
          />
          <div>
          <Button onClick={login}>Log in</Button>
          <Link href='' className='ml-4 '>Forget passowrd</Link>
          </div>
          <Divider className='m-3 mt-5 bg-white'/>
          <Register/>
        </form>
    </div>
  )
}

export default page
