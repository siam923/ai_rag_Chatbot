import { FooterText } from "@/components/footer";
import { Header } from "@/components/header";

export default function Layout({ children }) {
  return (
    <div className="">
      <Header />
      <main className="h-screen  mx-auto ">{children}</main>
      {/* <FooterText className="fixed bottom-0" /> */}
    </div>
  );
}
