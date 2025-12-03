
/*
  File Name: isAdmin.tsx

  Last Updated: Nov 23 2025

  Description: Exports helper function that returns true if a user is a superuser false if not
 */
export const isAdmin = (user: any) =>{
  if (user?.is_staff && user?.is_superuser){ // user model contains fields is_staff and is_superuser. Both must be true to be considered a superuser
    return true}
  else{return false}
}