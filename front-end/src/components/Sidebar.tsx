"use client";
import { useState } from "react";
import { FaBars, FaCog, FaHome, FaUser } from "react-icons/fa";
import "../styles/sidebar.css";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        <FaBars />
      </div>

      <ul className="menu">
        <li>
        <Link  href="/dashborard" className="link">
          <FaHome />
          {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>         
          <Link  href="/client" className="link">
          <FaUser />
          {!collapsed && <span>Clientes</span>}
          </Link>
        </li>
        <li>
        <Link  href="/client" className="link">
          <FaCog />
          {!collapsed && <span>Configurações</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}
