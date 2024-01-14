"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"



export default function Component() {

  const [name , setName] = useState("");
const [email , setEmail] = useState("");
const [enabled , setEnabled] = useState(false);
const router = useRouter();

function validDetails(){
  if (name.length <=2)
  {
    // alert("Name should contains atleast 3 characters");
    return false;
  }
  for (let i=0;i<name.length ; i ++){
    if ((name[i]>='a'&& name[i]<='z') || (name[i]>='A'&& name[i]<='Z') || name[i]==" " )
      continue;
    else
    { 
        // alert("Name should only comprise of characters");
        return false ;
    }
  }
  var i =0;
  for ( ;i<email.length;i++){
    if(email[i]=="@")
    break;
  }
  if (i>=email.length-1){
    // alert("Enter a valid email address");
    return false;
  }
  return true;
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Sign In</h2>
        <form className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor="name">
              Name
            </Label>
            <Input className="w-full" id="name" onChange={(e)=>{setName(e.target.value) }} placeholder="Enter your name" required />
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor="email">
              Email
            </Label>
            <Input className="w-full" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" required type="email" />
          </div>
          <div>
          { validDetails() ? <Link className="w-full block"  href="/demo">
             <Button className="w-full"  >Sign In</Button>
          </Link> : <Button className="w-full"  >Sign In</Button> }
        </div>
        </form>
      </div>
    </div>
  )
}

