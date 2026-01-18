export const useSidebar = () => {
  // global state
  const isOpen = useState('sidebar-open', () => true);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const close = () => {
    isOpen.value = false;
  };

  const checkScreenSize = () => {
    if (import.meta.client) {
      if (window.innerWidth < 1024) {
        isOpen.value = false;
      } else {
        isOpen.value = true;
      }
    }
  };

  const checkMobileClose = () => {
    if (window.innerWidth < 1024) {
      showSidebar.value = false;
    }
  };

  return {
    isOpen,
    toggle,
    close,
    checkScreenSize,
    checkMobileClose,
  };
};
