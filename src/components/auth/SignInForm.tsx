import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../../utils/APIURL";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/user/auth/login`,
        {
          nim: nim,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      if (res.status === 200 && data.token) {
        const token = data.token;
        Cookies.set("token", token, { expires: isChecked ? 7 : undefined });

        const verifyRes = await axios.get(`${API_URL}/user/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const role = verifyRes.data?.data; // "admin" atau "user"
        Cookies.set("role", role);


        if (role === "admin") {
          window.location.replace("/semester");
        } else {
          window.location.replace("/semester-user");
        }
        return;
      } else if (data.message) {
        const msg = data.message.toLowerCase();
        if (msg.includes("password")) {
          setError("Password salah");
        } else if (msg.includes("nim") || msg.includes("user")) {
          setError("Nim atau Password salah");
        } else {
          setError(data.message || "Login gagal");
        }
      } else {
        setError("Login gagal");
      }
    } catch (err: any) {
      //const msg = err.response?.data?.message?.toLowerCase() || "";
      setError(err);
      console.error(err);
      // if (msg.includes("password")) {
      //   setError("Password salah");
      // } else if (msg.includes("nim") || msg.includes("user")) {
      //   setError("User tidak ditemukan");
      // } else {
      //   setError("Terjadi kesalahan");
      // }
    }

    setLoading(false);
  };

  return (
    <div
      className="flex flex-col flex-1 min-h-screen justify-center items-center relative
        bg-left bg-no-repeat bg-cover
        bg-[url('/images/background/klh.png')]
        dark:bg-[url('/images/background/klhn.png')]"
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/30 z-0" />
      <div className="w-full max-w-md pt-10 mx-auto relative z-10">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto bg-white dark:bg-gray-900 px-6 py-10 rounded-lg shadow-lg mt-6">
          <Link
            to="/"
            className="inline-flex items-center mb-4 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="size-5" />
            Kembali ke dashboard
          </Link>

          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Masuk Admin
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Masukkan NIM dan kata sandi untuk masuk!
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    NIM <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="241011xxxx"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Kata Sandi <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Tetap masuk
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>

                {error && <div className="text-error-500 text-sm">{error}</div>}

                <div>
                  <Button className="w-full" size="sm" disabled={loading}>
                    {loading ? "Loading..." : "Masuk"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Hubungi admin untuk daftar
              </p>
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  to="https://github.com/NandaCoba"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Ananda Lukman
                </Link>
              </p>
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  to="https://github.com/triioade"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Trio Ade
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
