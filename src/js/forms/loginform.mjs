import { createButton, createInputField } from "../components.mjs";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../validations/validators.mjs";

export function initializeLoginForm() {
  const form = document.getElementById("loginForm");

  form.appendChild(
    createInputField({
      type: "email",
      placeholder: "Email",
      validationFn: emailValidation,
    })
  );

  form.appendChild(
    createInputField({
      type: "password",
      placeholder: "Password",
      validationFn: passwordValidation,
    })
  );
  form.appendChild(
    createButton("Register", () => console.log("Register button clicked"))
  );
  form.appendChild(
    createButton("Login", () => console.log("Login button clicked"))
  );
}
