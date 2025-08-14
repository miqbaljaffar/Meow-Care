import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user type to include your custom 'id' property.
   */
  interface Session {
    user: {
      id: string; // Add your custom property 'id'
    } & DefaultSession['user'];
  }

  /**
   * Extends the built-in user type.
   */
  interface User {
    id: string;
  }
}