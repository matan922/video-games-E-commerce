import React from 'react'
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import '../../App.css'

const Footer = () => {
    return (
        <FooterContainer>
            <div className="footer-middle">
                <Container>
                    <Row>
                        {/* Column 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>lorem, ipsum</h4>
                            <ul className='list-unstyled'>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                            </ul>
                        </div>
                        {/* Column 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>lorem, ipsum</h4>
                            <ul className='list-unstyled'>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                            </ul>
                        </div>
                        {/* Column 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>lorem, ipsum</h4>
                            <ul className='list-unstyled'>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                            </ul>
                        </div>
                        {/* Column 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>lorem, ipsum</h4>
                            <ul className='list-unstyled'>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                                <li>Lorem, ipsum</li>
                            </ul>
                        </div>
                    </Row>
                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} Video Game Store App - All Rights Reserved
                        </p>
                    </div>
                </Container>
            </div>
        </FooterContainer>
    )
}

export default Footer


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