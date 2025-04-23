import React from "react";
import { Link } from "react-router-dom";
import Payment from "../components/payment/payment";
import Footer from "../layout/footer";
import logo from '../../public/favicon/f8f539a0-6734-42b3-aabe-c35eb4378771.png'


export default function PaymentPage() {
  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-3">
        <div className="col-md-6">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Logo" width="300" height="90" className="me-2" />
          </Link>
        </div>
        <div className="col-md-6 text-end">
          <img src="data:image/png;base64,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" alt="security-ssl"
            style={{ maxHeight: "50px" }}
            className="me-2"
          />|
          Güvenli Ödeme
        </div>
      </div>

      <div className="mb-3">
        <Payment />
      </div>

      <Footer />
    </div>
  );
}
