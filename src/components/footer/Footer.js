import { Link } from "react-router-dom";

import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-items">
          <div className="ms-5">
            <div>
              <i className="bi bi-person-badge fs-1"></i>
            </div>
            24/7 CUSTOMER CARE
          </div>
          <div>
            <div>
              <i className="bi bi-film fs-1"></i>
            </div>
            <div>RESEND BOOKING CONFIRMATION</div>
          </div>
          <div className="me-5">
            <div>
              <i className="bi bi-film fs-1"></i>
            </div>
            SUBSCRIBE TO NEWS-LETTER
          </div>
        </div>
        <div className="footer-icons">
          <h3 className="contact">Contact</h3>
          <div className="d-flex justify-content-center">
            <Link className="text-decoration-none ps-2">
              <i className="bi bi-facebook ms-2"></i>
            </Link>
            <Link>
              <i className="bi bi-pinterest ms-2"></i>
            </Link>
            <Link className="text-decoration-none ps-2">
              <i className="bi bi-instagram ms-2"></i>
            </Link>
            <Link>
              <i className="bi bi-twitter ms-2"></i>
            </Link>
          </div>
        </div>
        <div className="py-4">
          <h6>Movie's Ticket App</h6>
          <p> Movie;s Ticket App 2022, &copy; All Right Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
