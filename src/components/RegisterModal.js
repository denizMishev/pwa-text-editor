import React from "react";
import TypingAnimation from "./TypingAnimation";

export function RegisterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="" action="">
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
                <label className=" clr-accent" htmlFor="email-input">
                  Email
                </label>
                <input
                  id="email-input"
                  className="clr-accent | user-font"
                  type="email"
                />
              </div>
              <div className="auth-form-input-ctr">
                <label className=" clr-accent" htmlFor="username-input">
                  Username
                </label>
                <input
                  id="username-input"
                  className="clr-accent | user-font"
                  type="text"
                />
              </div>
              <div className="auth-form-input-ctr">
                <label className=" clr-accent" htmlFor="password-input">
                  Password
                </label>
                <input
                  id="password-input"
                  className="clr-accent | user-font"
                  type="password"
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
