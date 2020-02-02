//Si el user del estado tiene alguna propiedad es que ya se ha registrado
export function isUserAuth(user) {
  return (Object.entries(user).length !== 0);
}




