export const useAdminMenu = () => {
  const items = [
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      key: 'dash',
      to: '/admin/dashboard',
    },
    {
      label: 'Master Data',
      icon: 'i-lucide-database',
      key: 'master',
      children: [
        {
          label: 'Users',
          icon: 'i-lucide-users',
          key: 'users',
          to: '/admin/users',
        },
        {
          label: 'Roles',
          icon: 'i-lucide-shield',
          key: 'roles',
          to: '/admin/roles',
        },
      ],
    },
    { separator: true },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      key: 'set',
      to: '/admin/settings',
    },
  ];

  return {
    items,
  };
};
