"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonStore {
  person: string;
  setPerson: (person: string) => void;
}

export const usePersonStore = create<PersonStore>()(
  persist(
    (set) => ({
      person: "",
      setPerson: (person) => set({ person }),
    }),
    { name: "person-storage" }
  )
);
