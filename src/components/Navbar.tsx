import React, { useState } from "react";
import Menus from "../menu.json";

import {
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
  BsTelephoneFill,
} from "react-icons/bs";
// import { useDataContext } from "../context/data.context";
import { siteSettings } from "../settings/site.settings";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState<number>(0);

  const [mobileMenuView, setMobileMenuView] = useState(0);
  // const { categories } = useDataContext();

  const MenuTitle = () => {
    if (mobileMenuView === 2) {
      return (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm p-1"
            onClick={() => {
              setSelectedSubMenu(0);
              setMobileMenuView(1);
            }}>
            <BsChevronLeft className="mb-1 fs-5" />
          </button>
          {Menus[selectedMenu].subMenus[selectedSubMenu].title}
        </div>
      );
    }
    if (mobileMenuView === 1) {
      return (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm p-1"
            onClick={() => {
              setSelectedMenu(0);
              setSelectedSubMenu(0);
              setMobileMenuView(0);
            }}>
            <BsChevronLeft className="mb-1 fs-5" />
          </button>
          {Menus[selectedMenu].title}
        </div>
      );
    }
    return <span>TicketJwewel</span>;
  };

  const MobileMenu = () => {
    if (mobileMenuView === 2) {
      return Menus[selectedMenu].subMenus[selectedSubMenu].children.map(
        (m, i) => (
          <li key={i} className="list-group-item list-group-item-action">
            <a className="nav-link active" aria-current="page" href="#">
              {m.title}
            </a>
          </li>
        )
      );
    }
    if (mobileMenuView === 1) {
      return Menus[selectedMenu].subMenus.map((m, i) => (
        <li
          key={i}
          className="list-group-item list-group-item-action"
          onClick={() => {
            setSelectedSubMenu(i);
            setMobileMenuView(2);
          }}>
          <a className="nav-link active" aria-current="page" href="#">
            {m.title} <BsChevronRight className="float-end" />
          </a>
        </li>
      ));
    }
    return Menus.map((m, i) => (
      <li
        key={i}
        className="list-group-item list-group-item-action"
        onClick={() => {
          setSelectedMenu(i);
          setMobileMenuView(1);
        }}>
        <a className="nav-link active" aria-current="page" href="#">
          {m.title} <BsChevronRight className="float-end" />
        </a>
      </li>
    ));
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-lg">
          <Link href={"/"} className="navbar-brand">
            <Image
              src={siteSettings.logo.src}
              alt={siteSettings.logo.alt}
              height={siteSettings.logo.height}
            />
          </Link>
          <button
            className="navbar-toggler rounded-pill"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="row w-100 mt-3 mt-lg-0">
            <div className="col-12 col-xl-10 col-xxl-8">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <BsSearch />
                </span>
                <input
                  type="search"
                  className="form-control border-start-0"
                  placeholder="Search by team, artist, event or venue"
                />
              </div>
            </div>
          </div>

          <div
            className="offcanvas offcanvas-end d-lg-none"
            tabIndex={-1}
            id="mobileMenu"
            aria-labelledby="mobileMenuLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="mobileMenuLabel">
                {MenuTitle()}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div className="offcanvas-body p-0">
              <ul className="list-group list-group-flush">{MobileMenu()}</ul>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="collapse navbar-collapse d-none d-lg-block">
            <ul
              className="navbar-nav align-items-center justify-content-end gap-3 ms-auto mb-2 mb-lg-0 position-relative"
              onMouseLeave={() => setShow(false)}>
              {Menus.map((menu, i) => (
                <li
                  key={i}
                  className={`nav-item position-relative rounded-top ${
                    i === selectedMenu && show && "bg-primary bg-opacity-50"
                  }`}
                  onMouseEnter={() => {
                    setShow(true);
                    setSelectedMenu(i);
                    setSelectedSubMenu(0);
                  }}>
                  <a
                    href="#"
                    className={`nav-link  ${
                      i === selectedMenu && show && "active"
                    }`}>
                    {menu.title}
                  </a>
                </li>
              ))}
              {show && (
                <div
                  className="position-absolute top-100 row bg-white shadow p-3 rounded"
                  style={{
                    zIndex: 99,
                    width: "70vw",
                    maxWidth: "700px",
                    right: "-10vw",
                  }}>
                  <div
                    className="col-4 overflow-auto"
                    style={{ maxHeight: "70vh" }}>
                    <ul className="list-group list-group-flush">
                      {Menus[selectedMenu].subMenus.map((sm, si) => (
                        <li
                          key={si}
                          role={"button"}
                          className={`list-group-item ${
                            si === selectedSubMenu && "bg-primary bg-opacity-10"
                          }`}
                          onMouseEnter={() => setSelectedSubMenu(si)}>
                          {sm.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="col-8 overflow-auto"
                    style={{ maxHeight: "70vh" }}>
                    <ul className="row list-unstyled nav">
                      {Menus[selectedMenu].subMenus[
                        selectedSubMenu
                      ].children.map((c) => (
                        <li key={c.title} className="col-6 nav-item">
                          <a
                            href="#"
                            className="nav-link link-info fw-semibold">
                            {c.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </ul>
            <a
              className="btn btn-sm btn-primary text-white rounded-pill px-3 ms-4 text-nowrap"
              href="#">
              <BsTelephoneFill /> CALL US
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
