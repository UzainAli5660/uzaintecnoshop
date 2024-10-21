import { Link } from "react-router-dom";
import { Image } from "antd";
function Footer() {
    return (
        <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link to={"/"}>
            <Image
              height={100}
              width={200}
              preview={false}
              src="/logo.png"
              alt="Logo"
            />
          </Link>
          <p className="text-sm font-serif text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 Techno Shop —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-600 font-serif ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @uzainali
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
 
          </span>
        </div>
      </footer>
      
    );
  }
  
  export default Footer;