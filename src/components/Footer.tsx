import Link from "next/link";
import {
  BsFacebook,
  BsInstagram,
  BsPinterest,
  BsTelephoneFill,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import {
  fetchHighSalesPerformers,
  siteSettings,
} from "@/settings/site.settings";
import useSWR from "swr";
import { removeDuplicatedElements } from "@/utils/remove-duplicated";
import { convertTitleToPath } from "@/utils/title-to-pathname";

const Footer: React.FC = () => {
  const { data: events } = useSWR(
    "high-sales",
    async () => {
      const response = await fetchHighSalesPerformers({
        numReturned: 12,
      });
      return response || [];
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000 * 24, // Refresh every 24 hour
    }
  );

  return (
    <footer className="pt-5 pb-3 bg-info text-light">
      <div className="container-lg">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold ps-3">INFORMATION</h5>
            <ul className="nav flex-column ">
              <li className="nav-item">
                <Link className="nav-link link-light" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="/concerts-tickets">
                  Concerts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="/sports-tickets">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="/theatre-tickets">
                  Theatre
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link link-light"
                  href="/terms"
                  target="_blank"
                  rel="noreferrer">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold ps-3">HIGH SALES</h5>
            <ul className="nav flex-column ">
              {Array.isArray(events) &&
                removeDuplicatedElements(events, "Description")
                  .slice(0, 6)
                  .map(({ ID, Description }) => (
                    <li key={ID} className="nav-item">
                      <Link
                        className="nav-link link-light"
                        href={`/performers/${convertTitleToPath(Description)}`}>
                        {Description}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold ps-3"></h5>
            <ul className="nav flex-column ">
              {Array.isArray(events) &&
                removeDuplicatedElements(events, "Description")
                  .slice(6, 12)
                  .map(({ ID, Description }) => (
                    <li key={ID} className="nav-item">
                      <Link
                        className="nav-link link-light"
                        href={`/performers/${convertTitleToPath(Description)}`}>
                        {Description}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold">CONTACTS</h5>
            <p>
              Have a question or concern about your order{" "}
              {siteSettings.site_name}?
            </p>
            <p>TicketJewel 8345 NW 66TH ST #3048 MIAMI FL 33166 USA</p>
            <a
              style={{ textDecoration: "none" }}
              className="text-white d-flex gap-2"
              href={`tel:${siteSettings.phone_number}`}>
              <div>
                <BsTelephoneFill />
              </div>{" "}
              <p> {siteSettings.phone_number}</p>
            </a>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <p className="m-0">
            Copyright © <span className="text-primary">TicketJewel</span> | All
            Rights Reserved
          </p>
          <div className="d-flex fs-4 gap-3">
            <a
              target="_blank"
              rel="noreferrer"
              href={siteSettings.social_media_links.facebook}
              className="link-light">
              <BsFacebook />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteSettings.social_media_links.twitter}
              className="link-light">
              <BsTwitter />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteSettings.social_media_links.pinterest}
              className="link-light">
              <BsPinterest />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteSettings.social_media_links.youtube}
              className="link-light">
              <BsYoutube />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteSettings.social_media_links.instagram}
              className="link-light">
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
