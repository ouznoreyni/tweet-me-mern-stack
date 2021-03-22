const bcrypt = require('bcrypt')

const users = [
  {
    firstName: 'Ousmane',
    lastName: 'DIOP',
    username: 'admin',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    firstName: 'Fallou',
    lastName: 'Tall',
    username: 'falloutall',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Astou',
    lastName: 'Seck',
    username: 'astouseck',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Fatou Bintou',
    lastName: 'Diallo',
    username: 'fatoudiallo',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Assane',
    lastName: 'Fall',
    username: 'assanefall',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Rama',
    lastName: 'Thiam',
    username: 'ramathiam',
    password: bcrypt.hashSync('password', 10),
  },

  {
    firstName: 'Paul',
    lastName: 'Ndiaye',
    username: 'paulndiaye',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Coura',
    lastName: 'Niang',
    username: 'couraniang',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Ablaye',
    lastName: 'Ngom',
    username: 'ablayengom',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Khadim',
    lastName: 'Ndiaye',
    username: 'khadimndiaye',
    password: bcrypt.hashSync('password', 10),
  },
]

module.exports = users
