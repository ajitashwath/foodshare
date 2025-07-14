"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  Truck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserType = "ngo" | "admin" | "cafe";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function DashboardPage() {
  const [userType, setUserType] = useState<UserType>("ngo");
  const [userData, setUserData] = useState<UserData>({
    name: "Sample Organization",
    email: "sample@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Philadelphia, PA",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated');
      const storedUserType = localStorage.getItem('userType') as UserType;
      const storedUserData = localStorage.getItem('userData');

      if (auth === 'true' && storedUserType && storedUserData) {
        setIsAuthenticated(true);
        setUserType(storedUserType);
        setUserData(JSON.parse(storedUserData));
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    router.push('/login');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Mock data - in real app this would come from API
  const dashboardData = {
    ngo: {
      title: "NGO Dashboard",
      stats: [
        {
          label: "Food Received",
          value: "2,450 lbs",
          icon: Package,
          color: "bg-green-500",
        },
        {
          label: "Meals Provided",
          value: "1,225",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          label: "Active Donors",
          value: "12",
          icon: Truck,
          color: "bg-purple-500",
        },
        {
          label: "This Month",
          value: "15",
          icon: Calendar,
          color: "bg-orange-500",
        },
      ],
      recentActivity: [
        {
          type: "Received",
          item: "Fresh vegetables",
          amount: "500 lbs",
          time: "2 hours ago",
        },
        {
          type: "Distributed",
          item: "Bread and pastries",
          amount: "200 lbs",
          time: "1 day ago",
        },
        {
          type: "Received",
          item: "Canned goods",
          amount: "300 lbs",
          time: "2 days ago",
        },
      ],
    },
    admin: {
      title: "Admin Dashboard",
      stats: [
        {
          label: "Total Donations",
          value: "45,230 lbs",
          icon: Package,
          color: "bg-green-500",
        },
        {
          label: "Active Partners",
          value: "156",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          label: "Deliveries Today",
          value: "23",
          icon: Truck,
          color: "bg-purple-500",
        },
        {
          label: "Meals Provided",
          value: "22,615",
          icon: Calendar,
          color: "bg-orange-500",
        },
      ],
      recentActivity: [
        {
          type: "New Partner",
          item: "Downtown Cafe",
          amount: "Registered",
          time: "1 hour ago",
        },
        {
          type: "Delivery",
          item: "Fresh Market",
          amount: "1,200 lbs",
          time: "3 hours ago",
        },
        {
          type: "Distribution",
          item: "Community Center",
          amount: "800 lbs",
          time: "5 hours ago",
        },
      ],
    },
    cafe: {
      title: "Cafe Dashboard",
      stats: [
        {
          label: "Food Donated",
          value: "1,850 lbs",
          icon: Package,
          color: "bg-green-500",
        },
        {
          label: "Pickups This Month",
          value: "8",
          icon: Truck,
          color: "bg-blue-500",
        },
        {
          label: "Meals Provided",
          value: "925",
          icon: Users,
          color: "bg-purple-500",
        },
        {
          label: "Next Pickup",
          value: "Tomorrow",
          icon: Calendar,
          color: "bg-orange-500",
        },
      ],
      recentActivity: [
        {
          type: "Donated",
          item: "Surplus bread",
          amount: "50 lbs",
          time: "Yesterday",
        },
        {
          type: "Donated",
          item: "Fresh produce",
          amount: "75 lbs",
          time: "3 days ago",
        },
        {
          type: "Scheduled",
          item: "Pickup scheduled",
          amount: "Tomorrow",
          time: "2 hours ago",
        },
      ],
    },
  };

  const currentData = dashboardData[userType];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <img
                  src="/images/logo.png"
                  alt="Food Share Logo"
                  className="w-8 h-8"
                />
                <div className="text-xl font-bold text-green-600">
                  Food Share
                </div>
              </Link>
              <div className="text-gray-500">|</div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentData.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {userData.name}
              </h2>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.address}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Edit Profile
              </button>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium capitalize">
                {userType}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {currentData.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {currentData.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "Received" ||
                      activity.type === "Donated"
                        ? "bg-green-500"
                        : activity.type === "Distributed" ||
                          activity.type === "New Partner"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.type}: {activity.item}
                    </p>
                    <p className="text-sm text-gray-600">{activity.amount}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}