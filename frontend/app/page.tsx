"use client";
import { useAppContext } from '@/context/AppContext';

export default function Page() {
  const { theme } = useAppContext();

  return (
    <div>
      <p>{theme}</p>
    </div>
  )
}
