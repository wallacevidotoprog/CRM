'use client';
import { useEffect, useState } from "react";
import { FaBars, FaCog, FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter,usePathname  } from "next/navigation";
import { me } from "@/api/service/authService.service";
import logo from "./../../public/image/crm.png";
import Image from "next/image";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await me();
        if (response) {
          setIsAuthenticated(true);
        } else {
          if (pathname === '/auth/register') {
            setIsAuthenticated(false);
            return;
          }
          router.push('/auth');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null; 
  }
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">

        <Link href="/" >
        <Image src={logo} alt="Logo" width={50} height={50} className="d-inline-block align-text-top me-2" />
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>


        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link" onClick={() => setExpanded(false)}>
                <FaHome className="me-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/client" className="nav-link" onClick={() => setExpanded(false)}>
                <FaUser className="me-2" />
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/settings" className="nav-link" onClick={() => setExpanded(false)}>
                <FaCog className="me-2" />
                Configurações
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}