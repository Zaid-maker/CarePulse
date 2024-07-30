"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }

    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    if (user) {
      return parseStringify(user);
    } else {
      console.warn(`User not found for userId: ${userId}`);
      return null; // Explicitly handle cases where user is not found
    }
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    throw error; // Optionally rethrow to handle further up the stack
  }
};

// TODO: registerPatient
export const registerPatient = async (userId: string) => {};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    if (patients.documents.length > 0) {
      return parseStringify(patients.documents[0]);
    } else {
      console.warn("No patient found for the given userId:", userId);
      return null;
    }
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    throw error; // Optionally rethrow the error to handle it at a higher level
  }
};
