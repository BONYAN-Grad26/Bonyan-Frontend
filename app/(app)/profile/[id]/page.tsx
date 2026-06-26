import EditProfileForm from "@/components/profile/EditProfileForm";
import { getUserProfile } from "@/serverActions/profile";

interface EditHealthProfileProps {
    params:Promise<{id:string}>
}

export default async function EditHealthProfile({params}:EditHealthProfileProps) {
    const {id} = await params ;
    const user = await getUserProfile();
    if(!user) {
      throw new Error('user is not found');
    }
    






  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-10 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit Health Profile Matrix</h2>
      
      <EditProfileForm id={id} user={user} />


    </div>
  );
}