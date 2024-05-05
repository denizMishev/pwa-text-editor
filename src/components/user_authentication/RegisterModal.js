import React, { useState } from "react";

import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import TypingAnimation from "./TypingAnimation";

import * as errorParameters from "../../error_handling/errorParameters";

export function RegisterModal({ isOpen, onClose }) {
  const [registerFormValues, setRegisterFormValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [focusedField, setFocusedField] = useState({
    emailFocus: false,
    usernameFocus: false,
    passwordFocus: false,
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.name;

    setRegisterFormValues((state) => ({
      ...state,
      [target]: value,
    }));
  };

  const onBlurHandler = (e) => {
    const target = e.target.name + "Focus";

    setFocusedField((state) => ({
      ...state,
      [target]: true,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, username, password } = registerFormValues;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
    } catch (error) {
      console.error(
        "Error creating user or setting display name:",
        error.message
      );
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmitHandler}>
          <div className="auth-form | bg-primary-100">
            <header className="auth-form-header">
              <div className="auth-form-topbar | bg-clr-accent">
                <div className="auth-form-topbar-text">
                  <TypingAnimation text="Create account" />
                </div>
                <div className="close-icon-auth | close-icon" onClick={onClose}>
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
            </header>
            <div className="auth-form-input-area">
              <div className="auth-form-input-ctr">
                <label className="clr-accent" htmlFor="email-input">
                  Email
                </label>
                <input
                  className="clr-accent user-font"
                  type="email"
                  name="email"
                  id="email-input"
                  required
                  pattern={errorParameters.regexEmail}
                  value={registerFormValues.email}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  focused={focusedField.emailFocus.toString()}
                />
                <div class="error-tooltip">
                  <div class="error-message">Invalid email address</div>
                </div>
              </div>
              <div className="auth-form-input-ctr">
                <label className=" clr-accent" htmlFor="username-input">
                  Username
                </label>
                <input
                  className="clr-accent user-font"
                  type="text"
                  name="username"
                  id="username-input"
                  required
                  pattern={errorParameters.regexUsername}
                  value={registerFormValues.username}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  focused={focusedField.usernameFocus.toString()}
                />
              </div>
              <div className="auth-form-input-ctr">
                <label className=" clr-accent" htmlFor="password-input">
                  Password
                </label>
                <input
                  id="password-input"
                  className="clr-accent user-font"
                  type="password"
                  name="password"
                  required
                  pattern={errorParameters.regexPassword}
                  value={registerFormValues.password}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  focused={focusedField.passwordFocus.toString()}
                />
              </div>
            </div>
            <div className="auth-form-btn-ctr">
              <button className="neon-btn">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
