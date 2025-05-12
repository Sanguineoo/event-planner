'use client';

import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-[hsl(327,100%,97%)] flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: 'radial-gradient(hsl(214,91%,78%) 2px, transparent 2px)',
        backgroundSize: '30px 30px',
        backgroundPosition: '0 0',
      }}
    >
      {/* Logo - Top Left (Clickable) */}
      <Link
        href="/"
        className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center space-x-2 z-20 hover:opacity-90 transition-opacity"
      >
        <div className="w-12 h-12 bg-[hsl(214,100%,60%)] rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-2xl md:text-3xl font-bold text-[hsl(214,100%,60%)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Evently
        </span>
      </Link>

      {/* Auth Buttons - Top Right */}
      {/* <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center space-x-4 z-20">
        <Link href="#login">
          <Button variant="outline" className="border-[hsl(214,100%,60%)] text-[hsl(214,100%,60%)] hover:bg-[hsl(214,100%,60%)] hover:text-white transition-colors">
            Login
          </Button>
        </Link>
        <Link href="#signup">
          <Button className="bg-[hsl(214,100%,60%)] text-white hover:bg-blue-600 transition-colors">
            Sign up
          </Button>
        </Link>
      </div> */}
      
      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Schedule Events with <span className="text-[hsl(214,100%,60%)]">Ease</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Schedule meetings effortlessly with our intuitive booking platform
        </p>
        
        <Button 
          size="lg" 
          className="inline-flex items-center justify-center px-8 py-6 text-xl font-medium rounded-md text-white bg-[hsl(214,100%,60%)] shadow-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative overflow-hidden"
          style={{
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Link href="/dashboard"><span className="mr-2">Book Event</span></Link>
          <ChevronRight className="h-5 w-5" />
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
              transform: "rotate(30deg) translateX(-300%)",
              animation: "shine 3s infinite",
              content: "''",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%"
            }}
          />
        </Button>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { transform: rotate(30deg) translateX(-300%); }
          100% { transform: rotate(30deg) translateX(300%); }
        }
      `}</style>
    </motion.div>
  );
}
