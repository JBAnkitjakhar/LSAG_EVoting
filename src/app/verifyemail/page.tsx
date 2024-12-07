//src/app/verifyemail/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SparklesCore } from '@/components/ui/sparkles';
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { GlareCard } from "@/components/ui/glare-card";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type: 'verification' }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setSuccess(data.success);
      setError('');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to send verification code');
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type: 'verify', verificationCode }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (data.verified) {
        setSuccess(true);
        setLoading(false);
        router.push('/dashboard');
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to verify code');
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center rounded-lg p-4 shadow-2xl">
    <div className="flex justify-center">
      <GlareCard className="flex flex-col items-center justify-center w-full max-w-md mt-4 mb-6 mr-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 text-transparent bg-clip-text mb-9">Verify your Email</h1>
        <div> 
        {!success ? (
           <form onSubmit={handleSubmit} className="space-y-6  ">
            <div className="space-y-6">
              {/* <label htmlFor="email" className="block text-white">
                Email
              </label> */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <HoverBorderGradient
              containerClassName="w-full rounded-full"
              as="button"
            
              className="w-full bg-black text-white py-2 flex items-center justify-center"
            >
              <span>{loading ? 'Sending...' : 'Send Verification Code'}</span>
            </HoverBorderGradient>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="mt-6 space-y-6  ">
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="block text-white">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <HoverBorderGradient
              containerClassName="w-full rounded-full"
              as="button"
            
              className="w-full bg-black text-white py-2 flex items-center justify-center"
            >
              <span>{loading ? 'Verifying...' : 'Verify'}</span>
            </HoverBorderGradient>
          </form>
        )}

{error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              {error}
            </div>
        )}
        </div>
      </GlareCard>
    </div>
    </div>
  );
}