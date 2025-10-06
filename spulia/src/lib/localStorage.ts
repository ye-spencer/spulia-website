import { useState, useEffect } from "react";

export function getLocalStorage<T>(key: string, defaultValue: T): T 
{
    if (typeof window === "undefined") return defaultValue; // SSR-safe

    try
    {
        const stored = localStorage.getItem(key);
        return stored ? (JSON.parse(stored) as T) : defaultValue;
    } 
    catch (err)
    {
        console.error(`Error reading localStorage key “${key}”:`, err);
        return defaultValue;
    }
  }
  
export function setLocalStorage<T>(key: string, value: T): void
  {
    if (typeof window === "undefined") return;

    try
    {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (err)
    {
        console.error(`Error setting localStorage key “${key}”:`, err);
    }
}



export function useLocalStorage<T>(key: string, defaultValue: T)
{
    const [value, setValue] = useState<T>(() => getLocalStorage(key, defaultValue));

    useEffect(() => {
        setLocalStorage(key, value);
    }, [key, value]);

    return [value, setValue] as const;
}