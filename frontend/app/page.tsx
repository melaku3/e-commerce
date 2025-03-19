import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  return (
    <div>
      <Link href={'/'} >
        <Image src="/logo.png" alt="Next.js Logo" width={200} height={200} />
      </Link>
    </div>
  )
}
