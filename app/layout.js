import CartProvider from "@/Providers/CartProvider";
import MenuProvider from "@/Providers/MenuProvider";
import ClientThemeProvider from "@/Providers/ClientThemeProvider";
import HeaderAndMenu from "@/components/HeaderAndMenu/HeaderAndMenu";

import styles from "./layout.module.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <MenuProvider>
            <ClientThemeProvider>
              <HeaderAndMenu />
              <main className={styles.main}>{children}</main>
            </ClientThemeProvider>
          </MenuProvider>
        </CartProvider>
      </body>
    </html>
  );
}
