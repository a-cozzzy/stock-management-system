import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

type Props = {
    type:string;
    name:string;
    placeholder?:string;
    label:string;
    defaultValue?:string;
}

const FormInput = ({ name, type, placeholder, label , defaultValue}: Props) => {
  return (
    <div>
          <Label htmlFor="name" className='mb-3 text-sm font-medium text-gray-700'>
            {label}
          </Label>
          <Input className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300' 
          type={type} 
          name={name} 
          placeholder={placeholder} 
          defaultValue={defaultValue}/>
    </div>
  )
}

export default FormInput