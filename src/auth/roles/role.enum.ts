export const Role = {
    Patient: 'patient',
    Admin: 'admin',
    Doctor: 'doctor',
  } as const;
  
  export type UserTypes = (typeof Role)[keyof typeof Role];
  