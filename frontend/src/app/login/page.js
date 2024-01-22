'use client'
import React from 'react'
import { Input, Button, Divider, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useState } from 'react';
import Link from "next/link";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Register from './registermodal'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const loginUser = (values) => {

  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      console.log("form submitted")
      console.log(JSON.stringify(values, null, 2))
      loginUser(values)
    },
  });
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
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <Input
          isRequired
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={formik.handleChange}
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
        {formik.errors.password && formik.touched.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <div>
          <Button onClick={login}>Log in</Button>
          <Link href='' className='ml-4 '>Forget passowrd</Link>
        </div>
        <Divider className='m-3 mt-5 bg-white' />
        <Register />
      </form>
    </div>
  )
}

export default page
