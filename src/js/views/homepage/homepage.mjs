import { createBottomNavBar } from "../../components.mjs";

async function homepage() {
  await createBottomNavBar();
}

document.addEventListener("DOMContentLoaded", homepage);
