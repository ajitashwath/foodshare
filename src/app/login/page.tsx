"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Demo credentials
const DEMO_CREDENTIALS = {
  ngo: {
    username: "ngo@demo.com",
    password: "ngo123",
    userData: {
      name: "Community Food Bank",
      email: "ngo@demo.com",
      phone: "(555) 123-4567",
      address: "123 Community St, Philadelphia, PA"
    }
  },
  admin: {
    username: "admin@demo.com",
    password: "admin123",
    userData: {
      name: "Food Share Admin",
      email: "admin@demo.com",
      phone: "(555) 987-6543",
      address: "456 Admin Plaza, Philadelphia, PA"
    }
  },
  cafe: {
    username: "cafe@demo.com",
    password: "cafe123",
    userData: {
      name: "Downtown Bistro",
      email: "cafe@demo.com",
      phone: "(555) 246-8135",
      address: "789 Main St, Philadelphia, PA"
    }
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    const credential = Object.entries(DEMO_CREDENTIALS).find(([_, cred]) => 
      cred.username === formData.username && cred.password === formData.password
    );

    if (credential) {
      const [userType, credData] = credential;
      
      // Store user data in localStorage for the dashboard
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify(credData.userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      setError("Invalid username or password. Please try the demo credentials below.");
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (userType: keyof typeof DEMO_CREDENTIALS) => {
    const cred = DEMO_CREDENTIALS[userType];
    setFormData({
      username: cred.username,
      password: cred.password
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <img
              src="/images/logo.png"
              alt="Food Share Logo"
              className="w-12 h-12"
            />
            <div className="text-3xl font-bold text-green-600">Food Share</div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username or Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">New to Food Share?</p>
            <Link
              href="/signup"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Create an account
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* User Type Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Join Our Community
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">NGO</h4>
              <p className="text-sm text-gray-600">Receive food donations</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Admin</h4>
              <p className="text-sm text-gray-600">Manage operations</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Cafe</h4>
              <p className="text-sm text-gray-600">Donate surplus food</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}