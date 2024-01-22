'use client'
import React, { useState } from 'react'
import { Input,Button ,Modal, ModalContent, ModalHeader,  ModalFooter, useDisclosure} from '@nextui-org/react' 
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'


const page = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter()

    const registerUser = async (values) => {

            const res = await fetch('http://localhost:4000/api/auth/createuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const data =await res.json()
            alert(data.msg);
            if (res.status === 200) return router.push('/login')
        
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], "Passwords didn't match"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            console.log("form submitted")
            console.log(JSON.stringify(values, null, 2))
            registerUser(values)
        },
    });

    return (
        <div >
            <Button className='ml-9' onPress={onOpen}>Create new user</Button>
            <Modal className='text-black ' size='xl' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="flex flex-col justify-center items-center  text-black">
                            <ModalHeader className="flex flex-col gap-1 items-center">Create new User</ModalHeader>
                            <form  >
                                <Input
                                    autoFocus
                                    isRequired
                                    name='name'
                                    className="max-w-xs mb-4 "
                                    type="name"
                                    label="Name"
                                    placeholder="Enter your Full name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                {formik.errors.name && formik.touched.name ? (
                                    <div >{formik.errors.name}</div>
                                ) : null}
                                <Input
                                    isRequired
                                    name='email'
                                    className="max-w-xs mb-4"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                                <Input
                                    isRequired
                                    name='password'
                                    label="Password"
                                    placeholder="Enter your password"
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
                                    className="max-w-xs mb-4"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}
                                <Input
                                    isRequired
                                    name='confirmPassword'
                                    label="Confirm Password"
                                    placeholder="Re-enter your password"
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
                                    className="max-w-xs mb-4"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                    <div>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </form>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onOpenChange}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={formik.handleSubmit} >
                                    Sign up
                                </Button>
                            </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default page

