import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptazia",
  description: "Discover and Share AI prompts",
};
const RootLayout = ({ children }) => {
  return (
    <Provider>
      <html lang="en">
        <body>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <div className="app">
            <Nav />
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
