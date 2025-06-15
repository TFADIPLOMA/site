import { Link, Outlet, useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import { useStores } from "../provider/MobxProvider";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Container, Nav, Navbar } from "react-bootstrap";


const AppLayout = () => {


    const { authStore } = useStores()
    const navigate = useNavigate()


    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!authStore.isAuth) {
            navigate('/login')
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [])

    return (
        loading ? <div className="loader"><Spin size="large" /></div>
            :
            <>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Two Factor Auth</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                {
                                    authStore.isAuth ? 
                                    <>
                                    <Nav.Link>{authStore.user?.firstName + ' ' + authStore.user?.lastName}</Nav.Link>
                                        <Nav.Link onClick={()=>{
                                            authStore.logout()
                                        }}>Выйти</Nav.Link>
                                    </>
                                    :<Nav.Link as={Link} to="/login">Войти</Nav.Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="py-4">
                    <Outlet />
                </Container>
            </>
    );
};

export default observer(AppLayout);