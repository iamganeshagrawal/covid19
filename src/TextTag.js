import React from 'react'
import './texttag.css'

function TextTag(props) {
    const {number, text, color} = props
    return (
        <div id="tag">
            <span id="number" style={{color: color}}>{number}</span>
            <p style={{backgroundColor: color}}><b>{text}</b></p>
        </div>
    )
}

export default TextTag
