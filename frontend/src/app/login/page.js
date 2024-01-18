'use client'
import React from 'react'
import { Input,Button , Divider,Modal, ModalContent, ModalHeader,  ModalFooter, useDisclosure} from '@nextui-org/react'
import { useState } from 'react';
import Register from './register'
import Link from "next/link";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const RegisterForm=()=>{
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return(
        <>
        <Button className='ml-9' onPress={onOpen}>Create new user</Button>
        <Modal className='text-black 'size='xl' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>

            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 items-center">Create new User</ModalHeader>
                
              <Register/>
                
               
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Sign up
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
    
  }


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
          <RegisterForm/>
        </form>
    </div>
  )
}

export default page
