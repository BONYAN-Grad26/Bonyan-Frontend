import EditProfileForm from "@/components/profile/EditProfileForm";
import { profile } from "@/lib/constants";
import { getUserProfile } from "@/serverActions/profile";

interface EditHealthProfileProps {
    params: Promise<{ id: string }>
}

export default async function EditHealthProfile({ params }: EditHealthProfileProps) {
    const { id } = await params;
    const user = profile;
    if (!user) {
      throw new Error('user is not found');
    }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card border border-sky-500/5 rounded-2xl shadow-xs my-10 text-foreground antialiased">
      <h2 className="text-2xl font-bold mb-6 text-foreground/90 text-center tracking-tight">
        Edit Health Profile Matrix
      </h2>
      
      <EditProfileForm id={id} user={user} />
    </div>
  );
}