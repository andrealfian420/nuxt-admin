import { defineEventHandler, getQuery } from 'h3';

// Dummy Data
const dbUsers = [
  {
    id: 1,
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: 3,
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: 4,
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    role: 'Admin',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=5',
  },
  {
    id: 6,
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=6',
  },
  {
    id: 7,
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=7',
  },
  {
    id: 8,
    name: 'Kristin Watson',
    email: 'kristin.watson@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=8',
  },
  {
    id: 9,
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=9',
  },
  {
    id: 10,
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=10',
  },
  {
    id: 11,
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=11',
  },
  {
    id: 12,
    name: 'Guy Hawkins',
    email: 'guy.hawkins@example.com',
    role: 'Editor',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=12',
  },
  {
    id: 13,
    name: 'Robert Fox',
    email: 'robert.fox@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=13',
  },
  {
    id: 14,
    name: 'Jacob Jones',
    email: 'jacob.jones@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=14',
  },
  {
    id: 15,
    name: 'Darlene Robertson',
    email: 'darlene.robertson@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=15',
  },
  {
    id: 16,
    name: 'Theresa Webb',
    email: 'theresa.webb@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=16',
  },
  {
    id: 17,
    name: 'Kathryn Murphy',
    email: 'kathryn.murphy@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=17',
  },
  {
    id: 18,
    name: 'Gregory Lane',
    email: 'gregory.lane@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=18',
  },
  {
    id: 19,
    name: 'Savannah Nguyen',
    email: 'savannah.nguyen@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=19',
  },
  {
    id: 20,
    name: 'Marvin McKinney',
    email: 'marvin.mckinney@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=20',
  },
  {
    id: 21,
    name: 'Bessie Cooper',
    email: 'bessie.cooper@example.com',
    role: 'Editor',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=21',
  },
  {
    id: 22,
    name: 'Cameron Williamson',
    email: 'cameron.williamson@example.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=22',
  },
  {
    id: 23,
    name: 'Brooklyn Simmons',
    email: 'brooklyn.simmons@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=23',
  },
  {
    id: 24,
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=24',
  },
  {
    id: 25,
    name: 'Eleanor Pena',
    email: 'eleanor.pena@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/150?u=25',
  },
];

export default defineEventHandler((event) => {
  // get query params from url
  const query = getQuery(event);

  // parse params from string to int
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;

  const search = (query.q || '').toLowerCase();

  // filtering logic
  let filteredData = dbUsers.filter((user) => {
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
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
