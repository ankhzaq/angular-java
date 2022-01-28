import { sessionName } from './constants';

// SESSION
export const addPropertySession = (property, newValue) => {
  const session = getSession();
  session[property] = newValue;
  sessionStorage.setItem(sessionName, JSON.stringify(session));
};
export const getPropertySession = (property) => {
  return getSession()[property];
};
export const getSession = () => JSON.parse(sessionStorage.getItem(sessionName) || '{}');
export const initializeSession = () => {
  if (!sessionStorage.getItem(sessionName)) {
    sessionStorage.setItem(sessionName, JSON.stringify({}));
  }
};
