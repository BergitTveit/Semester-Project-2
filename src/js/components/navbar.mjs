function createNavButton(text, iconClass) {
  const button = document.createElement("button");
  button.className =
    "flex flex-col items-center justify-center text-red-600 hover:text-blue-500 focus:outline-none";

  const icon = document.createElement("span");
  icon.className = `${iconClass} text-2xl`;
  button.appendChild(icon);

  const label = document.createElement("span");
  label.textContent = text;
  label.className = "text-xs mt-1";
  button.appendChild(label);

  return button;
}

function createBottomNavBar() {
  const navBar = document.createElement("nav");
  navBar.className =
    "fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around items-center h-16"; // Tailwind classes for styling

  const homeButton = createNavButton("Home", "fas fa-home");
  const categoryButton = createNavButton("Categories", "fas fa-list");
  const addButton = createNavButton("Add Listing", "fas fa-plus-circle");
  const bidsButton = createNavButton("Bids", "fas fa-gavel");
  const profileButton = createNavButton("Profile", "fas fa-user");

  navBar.appendChild(homeButton);
  navBar.appendChild(categoryButton);
  navBar.appendChild(addButton);
  navBar.appendChild(bidsButton);
  navBar.appendChild(profileButton);

  const bottomNavBarContainer = document.getElementById("bottomNavBar");
  bottomNavBarContainer.innerHTML = "";
  bottomNavBarContainer.appendChild(navBar);
}

document.addEventListener("DOMContentLoaded", createBottomNavBar);

export { createBottomNavBar };
