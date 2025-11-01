import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // ✅ thêm dòng này

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EV Care - Hệ thống quản lý bảo dưỡng xe điện",
  description:
    "Hệ thống quản lý bảo dưỡng xe điện chuyên nghiệp và đáng tin cậy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased text-gray-900 leading-relaxed`}
      >
        {children}
        {/* ✅ Toaster hiển thị toast trên mọi trang */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#fff" }, // màu emerald
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" }, // màu đỏ lỗi
            },
          }}
        />
      </body>
    </html>
  );
}
