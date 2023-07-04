import { InfoModal } from './NavModelContent/InfoModal';
import { AuthModal } from './NavModelContent/AuthModal';
import { useUser } from '../../hooks/userHooks';

export default function NavModal({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  onOpen,
}) {
  const isLoggedIn = useUser().isLoggedIn;
  return (
    <>
      {isLoggedIn ? (
        <InfoModal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : (
        <AuthModal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
