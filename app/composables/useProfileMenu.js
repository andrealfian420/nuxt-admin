export const useProfileMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    // temporary logout logic
    router.push('/admin');
  };

  const profileItems = [
    [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
        to: '/admin/profile',
      },
    ],
    [
      {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        onSelect: handleLogout,
      },
    ],
  ];

  return {
    profileItems,
  };
};
