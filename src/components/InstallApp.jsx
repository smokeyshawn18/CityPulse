import React, { useState, useEffect } from 'react';
import Logo from '../../public/logo.png'

const InstallPopup = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
 
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Show the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(true);
      }, 3000); // 3 seconds delay
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setShowPopup(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Trigger the install prompt manually
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA installation');
      } else {
        console.log('User dismissed the PWA installation');
      }

      // Reset the prompt and hide the popup
      setDeferredPrompt(null);
      setShowPopup(false);
    } catch (error) {
      console.error('Error during the installation prompt', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!isInstallable || !showPopup) return null;

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-sky-900 p-6 text-white rounded-lg shadow-lg w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[50vw] h-[50vh] sm:h-[40vh] md:h-[40vh] lg:h-[50vh] max-w-md flex flex-col justify-between">
    <div className="flex flex-col justify-between h-full">
      <p className="text-xl font-semibold mb-4 text-center">Install our app for a better experience!</p>
      <img src={Logo} alt="Khushi Gakuin" className="w-32 h-30 mx-auto p-2 border-2 mb-4" />
      <div className="flex flex-col items-center justify-end gap-4 mt-auto">
        <button
          className="bg-white text-black font-bold px-6 py-3 rounded hover:bg-blue-50 transition-colors w-full"
          onClick={handleInstallClick}
        >
          Install
        </button>
        <button
          className="text-white hover:text-blue-100 transition-colors w-full"
          onClick={handleClosePopup}
        >
          Close
        </button>
      </div>
    </div>
  </div>
  
  
  );
};

export default InstallPopup;
