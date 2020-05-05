import React, { Component } from 'react'
import { Container,  } from 'react-bootstrap'


export class Prevention extends Component {
    render() {
        return (
            <Container fluid style={{backgroundColor: 'white', boxShadow: '3px 3px 6px #c5c8cc, -3px -3px 6px #E8EBF0'}} className="border-none rounded p-3 my-2">
                <h5 id="title" className="mb-4">Prevention</h5>
                <p>Some tips for avoiding corona virus</p>
                <ul>
                    <li>Wash your hands properly</li>
                    <li>Use a mask</li>
                    <li>Maintain endurance</li>
                    <li>Do not go to an infected country</li>
                    <li>Take vitamin C</li>
                    <li>Avoid touching your eyes, nose and mouth with unwashed hands</li>
                    <li>Consumption of balanced nutrition, multiply vegetables and fruit</li>
                    <li>Diligent exercise and enough rest</li>
                    <li>Don't eat meat that is not cooked</li>
                </ul>
            </Container>
        )
    }
}

export default Prevention
