"use client";
import Typewriter from "typewriter-effect";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h3 className="text-4xl text-[#adadad]">To do App</h3>
      <div className="gradient-text text-6xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(`Let's be organized!!!`)
              .pauseFor(2500)
              .start();
          }}
        />
      </div>
      <button
        type="button"
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-10"
        onClick={() => router.push("/signup")}
      >
        Get Started
      </button>
    </main>
  );
}
