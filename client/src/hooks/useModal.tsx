import { useState } from 'react'

export const useModal = () => {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return {
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal
  }
}
