export function getUser() {
  return JSON.parse(localStorage.getItem('token'));
}

export function addUser(storage) {
  // const savedUserInfo = getUser() !== null ? getUser() : [];
  // if (savedUserInfo.length === 0) {
  const newSavedUserInfo = storage;
  // console.log('cheguei aqui');
  localStorage.setItem('token', newSavedUserInfo);
  // }
}
