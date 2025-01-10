import React, { useEffect } from 'react'
import ResultsDesc from '../ResultsDesc'

const ResultsDiv = (props) => {
// this runs as soon as the page is loaded and checks to see if the quiz taken was the color quiz and if it was then it sets the color of the title to whatever color the user got when they took the quiz
    useEffect(() => {
        if (props.type === "color") {
            let allH1 = document.querySelectorAll(".colorName")
            for (let i = 0; i < allH1.length; i++) {
                let value = allH1[i].innerHTML.toLowerCase()
                allH1[i].style.color = value
                allH1[i].style.border = `2px dotted ${value}`
            }
        }
    }, [])
// this shows the descriptions when they are clicked on..only the titles are originally displayed
    const showDesc = (e) => {
        let target = document.getElementById(`${e.target.innerHTML}`)
        target.toggleAttribute("hidden")
    }
    return (
        <>
            {props.subTitles ? <h1 className="text-center myersSubTitle">{props.subTitles}</h1> : ""}
            <h1 className={`text-center ${props.type}Name container`} onClick={e => showDesc(e)}>{props.name}</h1>
            <div className={`${props.type}DescDiv container`} hidden id={props.name}>
                {props.desc.map((desc, idx) => {
                    return <ResultsDesc
                        key={idx}
                        type={props.type}
                        title={desc.title}
                        description={desc.para}
                    />
                })}
            </div>
        </>
    )
}

export default ResultsDiv