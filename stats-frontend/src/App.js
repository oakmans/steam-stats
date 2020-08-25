import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Container, Row, Col, Button } from "react-bootstrap";
import {REACT_APP_API_URL} from "./keys";
import {InfoModal} from "./components/InfoModal";

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: '',
                name: '',
                pic: ''
            },
            loggedIn: false,
            button: this.getButton(false),
            show: false,
            bodyText: ''
        }
    }

    handleLogin = () => {
        const popupWindow = window.open(
            REACT_APP_API_URL + "/auth/steam",
            "_blank",
            "width=800, height=600",
        );
        if (window.focus) popupWindow.focus();
    };

    handleLogout = () => {
        localStorage.clear()
        this.setState({
            user: {
                id: '',
                name: '',
                pic: ''
            },
            loggedIn: false,
            button: this.getButton(false),
            show: true,
            bodyText: 'Successfully Logged Out!'
        })
    }

    componentDidMount() {
        window.addEventListener("message", event => {
            if (event.origin !== REACT_APP_API_URL) return;

            const { token, id, name, pic, ok } = event.data;
            if (ok) {
                localStorage.setItem("jwtToken", token)
                this.setState({
                    user: {
                        id: id, name: name, pic: pic
                    },
                    loggedIn: true,
                    button: this.getButton(true)
                })
                console.log(this.state.user)
            }
        })
    }

    hideModal() {
        this.setState({
            show: false,
            bodyText: ''
        })
    }

    getButton(loggedIn) {
        if(!loggedIn) {
            return (
                <img
                    onClick={this.handleLogin}
                    src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_large_noborder.png"
                    alt="Login with Steam"
                />
            )
        } else {
            return (
                <Button variant="warning" onClick={this.handleLogout}>Logout</Button>
            )
        }
    }

    render() {
        return (
            <Container fluid>
                <InfoModal show={this.state.show} bodyText={this.state.bodyText} hideModal={this.hideModal.bind(this)}/>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand>Steam Stats</Navbar.Brand>
                            <Navbar.Collapse className="justify-content-start">
                                <Nav.Link style = {{color: 'orange', textDecoration: 'none'}}>Stats</Nav.Link>
                                <Nav.Link style = {{color: 'orange', textDecoration: 'none'}}>News</Nav.Link>
                            </Navbar.Collapse>
                            <Navbar.Collapse className="justify-content-end">
                                {this.state.button}
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default App;
