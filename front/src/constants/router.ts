export const LOGIN_PATH = '/login'
export const MAIN_PATH = '/dashboard'
export const EXAMPLE_PATH = '/example'
export const PRIVATE_PATH = '/'
export const NOT_FOUND_PATH = '/404'
export const LOGIN_TREE: RouteTree = {
  ROOT: {
    path: LOGIN_PATH,
    metadata: {
      title: 'Login',
      description: 'User authentication page'
    }
  }
} 

export const DASHBOARD_TREE: RouteTree = {
  ROOT: {
    path: MAIN_PATH,
    metadata: {
      title: 'Dashboard',
      description: 'Main dashboard'
    }
  }
} 

export const EXAMPLE_TREE = {
  ROOT: {
    path: EXAMPLE_PATH,
    metadata: {
      title: 'Example',
      description: 'Example page'
    }
  }
} as const; 
