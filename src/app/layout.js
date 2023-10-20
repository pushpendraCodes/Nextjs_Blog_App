import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/Provider/ThemeProvider";
import Footer from "@/component/footer/Footer";
import Navbar from "@/component/navbar/Navbar";
import AuthProvider from "@/Provider/AuthProvider";

import ReduxProvider from "@/Provider/ReduxProvider";
import AlertProvider from "@/Provider/AlertProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <ReduxProvider>
                <AlertProvider>
                  <div className="container">
                    <div className="wrapper">
                      <Navbar />
                      {children}
                      <Footer />
                    </div>
                  </div>
                </AlertProvider>
              </ReduxProvider>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
