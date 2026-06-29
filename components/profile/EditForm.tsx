'use client';
import { Button } from '../ui/button'
import { Edit2 } from 'lucide-react'
import Link from 'next/link';

interface EditProfileProps {
  id: number
}

export const EditForm = ({ id }: EditProfileProps) => {
  return (
    <Link href={`/profile/${id}`} passHref>
      <Button className="bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md shadow-sky-500/10 cursor-pointer active:scale-95 transition-all">
        <Edit2 className="w-5 h-5 mr-2 shrink-0" />
        Edit Profile
      </Button>
    </Link>
  )
}