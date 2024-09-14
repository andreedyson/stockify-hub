import { landingPageNavbarLinks } from "@/constants";
import { Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#2B2C2F] p-6 md:px-20 lg:px-24 lg:py-10 xl:px-36">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        {/* Footer Logo & Links */}
        <div>
          <div>
            <Link href={"#"}>
              <Image
                src={"/assets/stockify-logo.svg"}
                width={200}
                height={80}
                alt="Stockify Logo"
                className="w-[150px]"
              />
            </Link>
            <p className="mt-3 max-w-[360px] text-justify text-sm text-desc">
              StockifyHub is a powerful, user-friendly inventory stock tracker
              web app designed to simplify inventory management for businesses
              of all sizes. Easily add and manage multiple inventories, product
              categories, and individual products in one seamless platform.
            </p>
            <p className="mt-8 font-medium text-desc">© 2024 StockifyHub</p>
          </div>
        </div>

        <div className="flex gap-12 lg:gap-36">
          {/* Footer Menu */}
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold">Menu</h5>
            </div>
            <div className="flex flex-col gap-2">
              {landingPageNavbarLinks.map((link) => (
                <Link
                  href={link.path}
                  key={link.path}
                  className="w-fit text-desc hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Social */}
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold">Socials</h5>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={"https://github.com/andreedyson"}
                target="_blank"
                className="duration-200 hover:-translate-y-1"
              >
                <Image
                  src={"/assets/github.svg"}
                  width={32}
                  height={32}
                  alt="GitHub"
                />
              </Link>
              <Link
                href={"https://instagram.com/andreedyson"}
                target="_blank"
                className="duration-200 hover:-translate-y-1"
              >
                <Image
                  src={"/assets/instagram.svg"}
                  width={32}
                  height={32}
                  alt="GitHub"
                />
              </Link>
              <Link
                href={"mailto:andreedyson31@gmail.com"}
                className="duration-200 hover:-translate-y-1"
              >
                <Mail size={32} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
