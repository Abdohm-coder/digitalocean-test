import React from "react";
import Link from "next/link";
import GooglePlay from "@/assets/images/googleplay.png";
// import AppShrefre from "@/assets/images/appshrefre.png";
import {
  BsEnvelopeFill,
  BsFacebook,
  BsInstagram,
  BsPinterest,
  BsTelephoneFill,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="pt-5 pb-3 bg-info text-light">
      <div className="container-lg">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold ps-3">INFORMATION</h5>
            <ul className="nav flex-column ">
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Concerts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Theater
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Venue
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  City
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold ps-3">hrefP EVENTS</h5>
            <ul className="nav flex-column ">
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  2024 Rose Parade
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  V - The Ultimate Variety Show
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Mrs. Doubtfire - The Musical
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Sugar Bowl - College Football Playoff Semifinal
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Rose Bowl - College Football Playoff Semifinal
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  NHL Winter Classic: Seattle Kraken vs. Vegas Golden Knights
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  PARKING: Rose Bowl - College Football Playoff Semifinal
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold ps-3"></h5>
            <ul className="nav flex-column ">
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Cothrefn Bowl
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Powerglove & Immortal Guardian
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Tchami
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  New Impressionz
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-light" href="#">
                  Matilda - The Musical
                </Link>
              </li>
              <li className="nav-item">
                <h5 className="fw-semibold ps-3">Get The App :</h5>
              </li>
              <li className="nav-item">
                <div className="d-flex gap-2 ps-3 mt-2">
                  <Image src={GooglePlay} alt="Google Play" height={40} />
                  {/* <Image src={AppShrefre} alt="App Shrefre" height={40} /> */}
                </div>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-5 mb-lg-0">
            <h5 className="fw-semibold">CONTACTS</h5>
            <p>Have a question or concern about your order ticketjewel.com?</p>
            <p>TicketJewel 8345 NW 66TH ST #3048 MIAMI FL 33166 USA</p>
            <p>
              <BsTelephoneFill /> Call us at: (844) 425-6941
            </p>
            <p>
              <BsEnvelopeFill /> care@ticketjewel.com
            </p>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <p className="m-0">
            Copyright © <span className="text-primary">TicketJewel</span> | All
            Rights Reserved
          </p>
          <div className="d-flex fs-2 gap-3">
            <a href="#" className="link-light">
              <BsFacebook />
            </a>
            <a href="#" className="link-light">
              <BsTwitter />
            </a>
            <a href="#" className="link-light">
              <BsPinterest />
            </a>
            <a href="#" className="link-light">
              <BsYoutube />
            </a>
            <a href="#" className="link-light">
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
