import React from 'react'
import "./BasicLayout.scss";
import { Container, Row, Col} from 'react-bootstrap';
import LeftMenu  from '../../components/LeftMenu';

export default function BasicLayout(props) {
    const {className, setRefreshCheckLogin, children} = props;

    return (
        <Container className={`basic-layout${className}`}>
            <Row>
                <Col xs={3} className="basic-layout-menu">
                    <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin}></LeftMenu>
                </Col>
                <Col xs={9} className="basic-layout-content">
                    {children}
                </Col>
            </Row>
        </Container>
    );
}
