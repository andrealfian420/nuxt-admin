import { defineEventHandler, getQuery } from 'h3';

// 1. Dummy Data Roles
const dbRoles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full access to manage users and system settings.',
    userCount: 4,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Can create, update, and publish content.',
    userCount: 8,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Read-only access to published content.',
    userCount: 12,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Super Admin',
    description: 'Unrestricted access to all system modules and logs.',
    userCount: 1,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Contributor',
    description: 'Can draft content but requires approval to publish.',
    userCount: 5,
    status: 'Inactive',
  },
  {
    id: 6,
    name: 'Moderator',
    description: 'Can review user comments and manage community content.',
    userCount: 3,
    status: 'Active',
  },
  {
    id: 7,
    name: 'Guest',
    description: 'Limited access for unregistered users.',
    userCount: 0,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Billing Manager',
    description: 'Access to invoices and payment settings only.',
    userCount: 2,
    status: 'Active',
  },
];

export default defineEventHandler((event) => {
  // get query params from url
  const query = getQuery(event);

  // parse params from string to int
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;

  const search = (query.search || '').toLowerCase();

  // filtering logic
  let filteredData = dbRoles.filter((role) => {
    return (
      role.name.toLowerCase().includes(search) ||
      role.description.toLowerCase().includes(search)
    );
  });

  // pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    total: filteredData.length,
    data: paginatedData,
    page: page,
    limit: limit,
  };
});
