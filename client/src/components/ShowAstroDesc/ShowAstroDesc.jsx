import React from 'react'
// this component shows the astrology descriptions..this is called to the astrology page
const showAstroDesc = (props) => {
    return (
        <>
            {props.desc ? props.desc.map((oneDesc, idx) => {
                return <p key={idx} className="astroDescDiv">{oneDesc}</p>
            }) : ""}
        </>
    )
}

export default showAstroDesc