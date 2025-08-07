"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { loggedInUserAtom } from "@/app/store/user";
import { Mail, Lock, User, Shield } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const setLoggedInUser = useSetAtom(loggedInUserAtom);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    role: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors({
        name: touched.name && name.length === 0 ? "Name is required" : "",
        email:
          touched.email && email.length === 0
            ? "Email is required"
            : touched.email && !isValidEmail(email)
            ? "Invalid email format"
            : "",
        password:
          touched.password && password.length === 0
            ? "Password is required"
            : touched.password && password.length < 6
            ? "Password must be at least 6 characters"
            : touched.password && password.includes(" ")
            ? "Password should not contain spaces"
            : "",
        role: touched.role && role.length === 0 ? "Role is required" : "",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [name, email, password, role, touched]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    setLoading(true);

    console.log({ name, email, password, role });

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful 🎉");
        setLoggedInUser(data.user);
        router.push(`/${data.user.id}/${data.user.role}/dashboard`);
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-[26rem] mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>

      {/* Name */}
      <div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            className="w-full outline-none bg-transparent text-gray-600"
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            className="w-full outline-none bg-transparent text-gray-600"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Lock className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            className="w-full outline-none bg-transparent text-gray-600"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Shield className="w-5 h-5 text-gray-500 mr-2" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, role: true }))}
            className="w-full outline-none bg-transparent text-gray-600">
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
