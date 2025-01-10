import React from 'react'
import { Navbar, Nav, Tooltip, OverlayTrigger, NavDropdown } from 'react-bootstrap'
import LogIn from '../LogIn'
import LogOut from '../LogOut'
import Logo from '../Logo'
// this is the navbar that displays at the top of each page..the tooltips only work when hovered over (does not work in mobile view)
const NavBar = (props) => {
    // all 7 of these functions are the tool tips for when you hover over the link for the quizzes in the navbar
    const renderTooltipLove = (props) => (
        <Tooltip id="love" {...props}>
            See what love language you are.
        </Tooltip>
    );
    const renderTooltipColor = (props) => (
        <Tooltip id="color" {...props}>
            See what color best describes you.
        </Tooltip>
    );
    const renderTooltipFruit = (props) => (
        <Tooltip id="fruit" {...props}>
            See what fruit represents you.
        </Tooltip>
    );
    const renderTooltipAnimal = (props) => (
        <Tooltip id="animal" {...props}>
            See what animal describes you.
        </Tooltip>
    );
    const renderTooltipAttached = (props) => (
        <Tooltip id="attached" {...props}>
            What is your attachment style in a relationship.
        </Tooltip>
    );
    const renderTooltipMeyers = (props) => (
        <Tooltip id="Meyers" {...props}>
            Find out what MBTI Personality type you are.
        </Tooltip>
    );
    const renderTooltipIntelligence = (props) => (
        <Tooltip id="Intelligence" {...props}>
            Find out what type of intelligence you have.
        </Tooltip>
    );

    return (
        <>
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Brand href='/'><Logo /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-dark" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <div className="menu">
                            <NavDropdown title="Quizzes">
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipLove}
                                >
                                    <Nav.Link href="/love">Love</Nav.Link>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipFruit}
                                >
                                    <Nav.Link href="/fruit">Fruit</Nav.Link>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipColor}
                                >
                                    <Nav.Link href="/color">Color</Nav.Link>
                                </OverlayTrigger>


                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipAnimal}
                                >
                                    <Nav.Link href="/animal" >Animal</Nav.Link>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipAttached}
                                >
                                    <Nav.Link href="/attached">Attached</Nav.Link>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipIntelligence}
                                >
                                    <Nav.Link href="/intelligence">Intelligence</Nav.Link>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipMeyers}
                                >
                                    <Nav.Link href="/Myers-Briggs">Myers-Briggs</Nav.Link>
                                </OverlayTrigger>

                            </NavDropdown>

                            <Nav.Link href="/numerology">Numerology</Nav.Link>
                            <Nav.Link href="/astrology">Astrology</Nav.Link>

                            <NavDropdown title="About">
                                <Nav.Link href="/aboutAstrology">Astrology</Nav.Link>
                                <Nav.Link href="/aboutPersonality">Personality</Nav.Link>
                                <Nav.Link href="/aboutNumerology">Numerology</Nav.Link>
                            </NavDropdown>
                            {props.admin ? <Nav.Link href="/admin">Admin</Nav.Link> : ""}
                            
                        </div>
                        {props.status ?
                            <div className="entireLogOutNav">
                                <div className="logOutDiv">
                                    <LogOut changeStatus={props.changeStatus} />
                                    <Navbar.Text>
                                        {props.user ? <div><img src={props.user.image} className="navProfilePic me-3" alt="profile picture"/>   Signed in as: <a href="/accountInfo" className="accountLink">{props.user.fName}</a></div> : ""}
                                    </Navbar.Text>
                                </div>
                            </div>
                            : <div>
                                <LogIn changeStatus={props.changeStatus} convertPicture={props.convertPicture} image={props.image} />
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar