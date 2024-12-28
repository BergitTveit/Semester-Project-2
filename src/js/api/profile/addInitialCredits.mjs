import { updateProfile } from './updateProfile.mjs';

export async function addInitialCredits(name, amount = 1000) {
    return updateProfile({ name, credits: amount });
}
