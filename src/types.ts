// Define the Role enum
export enum Role {
  Administrator = 'administrator',
  User = 'user',
}

// Define the User type based on your API structure
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role; // Use the Role enum
}

// Define the Category type
export interface Category {
  id: string;
  name: string;
  // Add other fields if needed, such as description, createdAt, etc.
}

// Define the Produce type
export interface Produce {
  id: string;
  name: string;
  // Add other fields if needed, such as description, createdAt, etc.
}

// Define the Cutouts type
export interface Cutouts {
  id: string;
  name: string;
  // Add other fields if needed, such as description, createdAt, etc.
}