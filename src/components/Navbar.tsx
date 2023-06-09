import React, { useEffect, useState } from "react";

import {
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
  BsTelephoneFill,
} from "react-icons/bs";
// import { useDataContext } from "../context/data.context";
import { fetchSearchPerformers, siteSettings } from "../settings/site.settings";
import Link from "next/link";
import Image from "next/image";
import { convertTitleToPath } from "@/utils/title-to-pathname";
import { useDebounce } from "use-debounce";
import { SearchPerformersProps } from "@/types/data-types";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";
import { useRouter } from "next/navigation";

const Navbar: React.FC<{
  searchNavbarRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ searchNavbarRef }) => {
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [debouncedFilter] = useDebounce(search, 500);
  const [performers, setPerformers] = useState<SearchPerformersProps[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (search.trim().length > 0) {
      const fetchPerformers = async () => {
        setLoading(true);
        try {
          const response = await fetchSearchPerformers({
            searchTerms: search,
          });
          setPerformers(response || []);
        } catch (error) {
          setPerformers([]);
          console.error("Error:", error);
        }
        setLoading(false);
      };
      fetchPerformers();
    } else {
      setPerformers([]);
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
    return (
      <Link href={"/"} className="navbar-brand">
        <Image
          loading="lazy"
          src={siteSettings.logo.src.dark}
          alt={siteSettings.logo.alt}
          height={70}
        />
      </Link>
    );
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
            onClick={() => {
              setMobileMenuView(0);
            }}
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    router.push(`/search?performer=${convertTitleToPath(search)}`);
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-lg">
          <Link href={"/"} className="navbar-brand">
            <Image
              loading="lazy"
              src={siteSettings.logo.src.white}
              alt={siteSettings.logo.alt}
              height={siteSettings.logo.height}
            />
          </Link>
          <button
            className="navbar-toggler rounded-pill"
            type="button"
            onClick={() => {
              setMobileMenuView(0);
            }}
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="position-relative row w-100 mt-3 mt-lg-0"
            ref={searchNavbarRef}>
            <div className="col-12 col-xl-10 col-xxl-8">
              <form
                onSubmit={handleSubmit}
                className="input-group input-group-sm">
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
              </form>
            </div>
            <div
              style={{ zIndex: 9999, marginTop: "2.5rem" }}
              className="position-absolute bg-white text-dark rounded-2 d-flex flex-column justify-content-center container-fluid">
              {loading && (
                <div
                  style={{ textAlign: "center", paddingBottom: "30px" }}
                  className="search-result-title">
                  Loading...
                </div>
              )}
              {performers.length > 0 && (
                <>
                  <div className="search-result-title">Performers</div>
                  {removeDuplicatedElements(performers, "Description")
                    .slice(0, 6)
                    .map(({ ID, Description }) => (
                      <div onClick={() => setSearch("")} key={ID}>
                        <Link
                          href={`/performers/${convertTitleToPath(
                            Description
                          )}`}
                          className="search-result-item">
                          {Description}
                        </Link>
                      </div>
                    ))}
                  {removeDuplicatedElements(performers, "Description").length >
                    6 && (
                    <div onClick={() => setSearch("")}>
                      <Link
                        style={{ color: "#3683fc" }}
                        href={`/search?performer=${convertTitleToPath(search)}`}
                        className="search-result-item pe-2">
                        View All
                      </Link>
                    </div>
                  )}
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
