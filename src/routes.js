import Dashboard from './pages/Dashboard'
import Zone from './pages/Zone'

const routes = [
  {
    path: '/',
    component: Dashboard,
    name: 'dashboard'
  },
  {
    path: '/zones/:id',
    component: Zone,
    name: 'zone'
  }
]

export default routes
