import { createBottomNavBar } from "../../components.mjs";
import { initializeLoginForm } from "../../forms/loginform.mjs";

async function loginPage() {
  await initializeLoginForm();
  await createBottomNavBar();
}

document.addEventListener("DOMContentLoaded", loginPage);
