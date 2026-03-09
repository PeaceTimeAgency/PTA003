"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Logic to capture the 'code' from TikTok and send to your Vercel Backend
    const code = searchParams.get('code');
    
    if (code) {
      // Forward the code to your serverless function
      fetch('/api/tiktok-exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      }).then(() => {
        router.push('/dashboard?success=true');
      }).catch((err) => {
        console.error('Error exchanging TikTok code:', err);
      });
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9fbfc] font-inter m-0">
      <div className="w-full max-w-[400px] bg-white p-10 text-center rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
        <div className="mx-auto my-5 h-10 w-10 animate-spin rounded-full border-4 border-[#f3f3f3] border-t-[#3182ce]" />
        <h1 className="mb-2 text-[#1a365d] text-2xl font-bold">Syncing your Roster Profile</h1>
        <p className="text-[#718096] text-sm">
          Please wait while we securely connect Peace Time Agency to your TikTok data...
        </p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f9fbfc]">
        <div className="mx-auto my-5 h-10 w-10 animate-spin rounded-full border-4 border-[#f3f3f3] border-t-[#3182ce]" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
