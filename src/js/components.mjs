export function createButton(text, onClickHandler) {
  const button = document.createElement("button");
  button.className =
    "flex flex-col items-center justify-center text-blue-600 hover:text-blue-500 focus:outline-none";

  button.setAttribute("aria-label", `Go to ${text} page`);

  const label = document.createElement("span");
  label.textContent = text;
  label.className = "text-sm";
  button.appendChild(label);

  button.addEventListener("click", onClickHandler);

  return button;
}

export function createInputField({ type, placeholder, validationFn }) {
  const container = document.createElement("div");
  container.classList.add("input-container", "mb-4");

  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.classList.add(
    "w-full",
    "p-2",
    "border",
    "rounded",
    "focus:outline-none",
    "focus:ring",
    "focus:border-blue-300",
    "transition"
  );

  const error = document.createElement("div");
  error.classList.add("error", "text-red-500", "text-sm");

  function validate() {
    const isValid = validationFn(input.value);
    if (isValid) {
      input.classList.remove("border-red-500");
      error.textContent = "";
    } else {
      input.classList.add("border-red-500");
      error.textContent = `Invalid ${placeholder}`;
    }
  }

  input.addEventListener("keyup", validate);
  input.addEventListener("blur", validate);

  container.appendChild(input);
  container.appendChild(error);

  return container;
}
// DO I NEED ARGUMENTS? OR IS LOGIN FUNCTION ENOUGH.....
//   function createNavButton(text, onClickHandler, handlerArgs = []) {
// Do I need to add arguments for my log in? or is the function called enough?
//    button.addEventListener("click", () => onClickHandler(...handlerArgs));

// }
//   function login(userData) {
//     console.log("Login function called with data:", userData);
//   }
//   // Create button with user data
//   const loginButton = createButton("Login", login, [{ username: "user", password: "pass" }]);

export function createNavButton(text, iconClass) {
  const button = document.createElement("button");
  button.className =
    "flex flex-col items-center justify-center text-blue-600 hover:text-blue-500 focus:outline-none";

  button.setAttribute("aria-label", `Go to ${text} page`);

  const icon = document.createElement("span");
  icon.className = `${iconClass} text-2xl`;
  button.appendChild(icon);

  return button;
}

export function createBottomNavBar() {
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
