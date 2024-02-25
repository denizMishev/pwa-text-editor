import { useState } from "react";
import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";

export function Header() {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <header id="header">
      <div className="header-btns-ctr">
        <button>
          <i className="fa-solid fa-bold"></i>
        </button>
        <button>
          <i className="fa-solid fa-italic"></i>
        </button>
        <button>
          <i className="fa-solid fa-underline"></i>
        </button>
        <button>
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button>
          <i className="fa-solid fa-align-justify"></i>
        </button>
        <button>
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button>
          <i class="fa-solid fa-floppy-disk"></i>
        </button>
        <button>
          <i class="fa-solid fa-file"></i>
        </button>
      </div>
      <div className="header-auth-ctr | clr-accent">
        <button className="register-btn" onClick={() => setRegisterOpen(true)}>
          REGISTER
        </button>
        <button className="login-btn" onClick={() => setLoginOpen(true)}>
          LOGIN
        </button>
      </div>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
