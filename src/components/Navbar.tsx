import React, { useEffect, useMemo, useState } from "react";

import {
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
  BsTelephoneFill,
} from "react-icons/bs";
// import { useDataContext } from "../context/data.context";
import { fetchSearchEvents, siteSettings } from "../settings/site.settings";
import Link from "next/link";
import Image from "next/image";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDebounce } from "use-debounce";
import { SearchEventsProps } from "@/types/data-types";
import { useDataContext } from "@/context/data.context";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";

const Navbar: React.FC<{
  searchNavbarRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ searchNavbarRef }) => {
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [debouncedFilter] = useDebounce(search, 500);
  const [events, setEvents] = useState<SearchEventsProps[]>([]);

  const { venues } = useDataContext();

  const searchVenues = useMemo(
    () =>
      search.trim().length > 0 && Array.isArray(venues)
        ? venues.filter(({ Name }) =>
            Name.toLowerCase().includes(search.toLowerCase())
          )
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedFilter, venues]
  );

  useEffect(() => {
    if (search.trim().length > 0) {
      const fetchEvents = async () => {
        try {
          const response = await fetchSearchEvents({
            searchTerms: search,
          });
          setEvents(response || []);
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchEvents();
    } else {
      setEvents([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

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
          {
            siteSettings.main_categories[selectedMenu].sub_category[
              selectedSubMenu
            ].title
          }
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
          {siteSettings.main_categories[selectedMenu].title}
        </div>
      );
    }
    return <span>TicketJwewel</span>;
  };

  const MobileMenu = () => {
    if (mobileMenuView === 2) {
      return siteSettings.main_categories[selectedMenu].sub_category[
        selectedSubMenu
      ].performers.map(({ title }, i) => {
        const lastItem =
          siteSettings.main_categories[selectedMenu].sub_category[
            selectedSubMenu
          ].performers.length - 1;
        return (
          <li
            key={i}
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
            className={`list-group-item list-group-item-action`}>
            <Link
              className={`nav-link active ${
                i === lastItem ? "view-all" : "item"
              }`}
              aria-current="page"
              href={
                lastItem === i
                  ? `/category/${siteSettings.main_categories[selectedMenu].sub_category[selectedSubMenu].title}`
                  : `/performers/${convertTitleToPath(title)}`
              }>
              {title}
            </Link>
          </li>
        );
      });
    }
    if (mobileMenuView === 1) {
      return siteSettings.main_categories[selectedMenu].sub_category.map(
        ({ title }, i) => (
          <li
            key={`${i}: ${title}`}
            className="list-group-item list-group-item-action"
            onClick={() => {
              setSelectedSubMenu(i);
              setMobileMenuView(2);
            }}>
            <Link
              className="nav-link active"
              aria-current="page"
              href={`/category/${convertTitleToPath(title)}`}>
              {title}
              <BsChevronRight className="float-end" />
            </Link>
          </li>
        )
      );
    }
    return (
      <>
        {siteSettings.main_categories.map(({ title }, i) => (
          <li
            key={`${i}: ${title}`}
            className="list-group-item list-group-item-action"
            onClick={() => {
              setSelectedMenu(i);
              setMobileMenuView(1);
            }}>
            <Link
              className="nav-link active"
              aria-current="page"
              href={`/${convertTitleToPath(title)}`}>
              {title} <BsChevronRight className="float-end" />
            </Link>
          </li>
        ))}
        <a
          className="btn btn-sm w-50 btn-primary text-white rounded-pill px-1 ms-2 mt-4 text-nowrap"
          href={`tel:${siteSettings.phone_number}`}>
          <BsTelephoneFill /> CALL US
        </a>
      </>
    );
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
          <div
            ref={searchNavbarRef}
            className="position-relative row w-100 mt-3 mt-lg-0">
            <div className="col-12 col-xl-10 col-xxl-8">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white">
                  <BsSearch />
                </span>
                <input
                  type="search"
                  className="form-control border-start-0"
                  placeholder="Search by team, artist, event or venue"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
            <div
              style={{ zIndex: 9999, marginTop: "3.5rem" }}
              className="position-absolute bg-white text-dark rounded-2 d-flex flex-column justify-content-center container-fluid">
              {/* {performers.length > 0 && (
            <>
              <div className="search-result-title">Performers</div>
              {removeDuplicatedElements(performers, "Description").map(
                ({ ID, Description }) => (
                  <div key={ID}>
                    <Link
                      href={`/performers/${convertTitleToPath(Description)}`}
                      className="search-result-item">
                      {Description}
                    </Link>
                  </div>
                )
              )}
            </>
          )} */}
              {events.length > 0 && (
                <>
                  <div className="search-result-title">Events</div>
                  {removeDuplicatedElements(events, "Name")
                    .slice(0, 6)
                    .map(({ ID, Name }) => (
                      <div onClick={() => setSearch("")} key={ID}>
                        <a
                          href={`/tickets/${ID}`}
                          className="search-result-item">
                          {Name}
                        </a>
                      </div>
                    ))}
                  {removeDuplicatedElements(events, "Name").length > 6 && (
                    <div
                      onClick={() => {
                        setSearch("");
                      }}>
                      <Link
                        style={{ color: "#3683fc" }}
                        href={`/events/${convertTitleToPath(search)}`}
                        className="search-result-item pe-2">
                        View All
                      </Link>
                    </div>
                  )}
                </>
              )}
              {searchVenues.length > 0 && (
                <>
                  <div className="search-result-title">Venues</div>
                  {searchVenues.map(({ ID, Name }) => (
                    <div onClick={() => setSearch("")} key={ID}>
                      <Link
                        href={`/performers/${convertTitleToPath(Name)}`}
                        className="search-result-item">
                        {Name}
                      </Link>
                    </div>
                  ))}
                </>
              )}
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
              {siteSettings.main_categories.map(({ title, link }, i) => (
                <li
                  key={`${i}: ${title}`}
                  className={`nav-item position-relative rounded-top ${
                    i === selectedMenu && show && "bg-primary bg-opacity-50"
                  }`}
                  onMouseEnter={() => {
                    setShow(true);
                    setSelectedMenu(i);
                    setSelectedSubMenu(0);
                  }}>
                  <Link
                    href={link}
                    className={`nav-link  ${
                      i === selectedMenu && show && "active"
                    }`}>
                    {title}
                  </Link>
                </li>
              ))}
              {show && (
                <div
                  className="position-absolute top-100 row bg-white shadow p-3 rounded"
                  style={{
                    zIndex: 9999,
                    width: "max-content",
                    maxWidth: "700px",
                  }}>
                  <div
                    className="col-3 overflow-auto"
                    style={{ maxHeight: "70vh" }}>
                    <ul className="list-group list-group-flush">
                      {siteSettings.main_categories[
                        selectedMenu
                      ].sub_category.map(({ title }, si) => (
                        <Link
                          className={`list-group-item list-none ${
                            si === selectedSubMenu && "bg-primary bg-opacity-10"
                          }`}
                          key={`${si}: ${title}`}
                          href={`/category/${convertTitleToPath(title)}`}>
                          <li
                            role={"button"}
                            onMouseEnter={() => setSelectedSubMenu(si)}>
                            {title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="col-9 overflow-auto"
                    style={{ maxHeight: "70vh" }}>
                    <ul className="nav">
                      {siteSettings.main_categories[selectedMenu].sub_category[
                        selectedSubMenu
                      ].performers.map(({ title }, i) => {
                        const lastItem =
                          siteSettings.main_categories[selectedMenu]
                            .sub_category[selectedSubMenu].performers.length -
                          1;
                        const isSportList =
                          siteSettings.main_categories[selectedMenu].link ===
                          "/sports-tickets";

                        return (
                          <li
                            key={`${i}: ${title}`}
                            className={`${
                              isSportList ? "col-4" : "col-6"
                            } nav-item`}>
                            <Link
                              href={
                                lastItem === i
                                  ? `/category/${convertTitleToPath(
                                      siteSettings.main_categories[selectedMenu]
                                        .sub_category[selectedSubMenu].title
                                    )}`
                                  : `/performers/${convertTitleToPath(title)}`
                              }
                              className={`nav-link fw-semibold ${
                                i === lastItem ? "view-all" : "item"
                              }`}>
                              {title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </ul>
            <a
              className="btn btn-sm btn-primary text-white rounded-pill px-3 ms-4 text-nowrap"
              href={`tel:${siteSettings.phone_number}`}>
              <BsTelephoneFill /> CALL US
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
