import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

type Props = {

    type:string;
    placeholder:string;
    label:string;
}

const FormInput = ({ type, placeholder, label }: Props) => {
  return (
    <div>
          <Label htmlFor="name" className='mb-2 text-sm font-medium text-gray-700'>
            {label}
          </Label>
          <Input className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300' 
          type={type} placeholder={placeholder} />
    </div>
  )
}

export default FormInput