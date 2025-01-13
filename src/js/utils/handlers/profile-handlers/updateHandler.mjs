import { updateProfile } from '../../../api/profile/updateProfile.mjs';
import { save } from '../../storage/save.mjs';

export async function handleUpdateButtonClick(event) {
    event.preventDefault();

    const form = document.getElementById('settingsForm');
    const nameInput = form.querySelector('input[placeholder="Name"]');
    const bioInput = form.querySelector('textarea[placeholder="Bio"]');
    const avatarInput = form.querySelector('input[placeholder="Avatar Image URL"]');

    const profileData = {
        name: nameInput.value,
        bio: bioInput.value,
        avatar: avatarInput.value ? { url: avatarInput.value, alt: 'User Avatar' } : undefined,
    };

    try {
        const updatedProfile = await updateProfile(profileData);
        save('profile', updatedProfile.data);
        alert('Profile updated successfully!');

        window.location.href = `/pages/profile/index.html?name=${updatedProfile.name}`;
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
}
