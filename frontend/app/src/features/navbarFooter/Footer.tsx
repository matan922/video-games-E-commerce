import React from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import "../../css/App.css";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-middle">
        <Container>
          <Row>
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6">
              <h4>My Github</h4>
              <ul className="list-">
                <a href="https://github.com/matan922" style={{textDecoration: "none"}}>Git</a>
              </ul>
            </div>
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6">
              <h4>My Linkedin</h4>
              <ul className="list-unstyled">
                <a href="https://www.linkedin.com/in/matan-tenenbaum-66ab11260/" style={{textDecoration: "none"}}>Linkedin</a>
              </ul>
            </div>
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6">
              <h4>Email</h4>
              <ul className="list-unstyled">
                <li>matanten@gmail.com</li>
              </ul>
            </div>
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6">
              <h4>Name</h4>
              <ul className="list-unstyled">
                <li>Matan Tenenbaum</li>
              </ul>
            </div>
          </Row>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Video Game Store App - All Rights
              Reserved
            </p>
          </div>
        </Container>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  .footer-middle {
    background: var(--mainDark);
    padding-top: 3rem;
    color: var(--mainWhite);
  }

  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
`;
