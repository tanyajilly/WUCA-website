import Profile from "../ui/profile";
import { getCurrentUserData } from "../lib/data";
import { User } from "../lib/definitions";

export default async function ProfilePage() {
    const userData: User = await getCurrentUserData();
    
    return (
        <Profile userData={userData} />
    )
}