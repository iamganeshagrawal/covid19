import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './global.css'
import axios from 'axios'
import TextTag from './TextTag'
import {Pie} from 'react-chartjs-2'

export class Global extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data: null
        }
    }
    
    componentDidMount(){
        axios.get('https://covid19.mathdro.id/api')
        .then(res => {
            // console.log(res.data)
            this.setState({data: res.data})
        })
        .catch(err => {
            console.log(err)
            alert("Server Timeout")
        })
    }
    render() {
        if(this.state.data === null){
            return (
                <Container fluid style={{backgroundColor: 'white', boxShadow: '3px 3px 6px #c5c8cc, -3px -3px 6px #E8EBF0'}} className="border-none rounded p-3 my-2">
                    <h5 id="title" className="mb-4">Global Report</h5>
                    <Container>
                        Loading...
                    </Container>
                </Container>
            )
        }
        const { data } = this.state
        const lastUpdate = (data.lastUpdate ? new Date(data.lastUpdate) : new Date());
        const chartData = {
            labels: [
                'Total Cases',
                'Recovered',
                'Deaths'
            ],
            datasets: [{
                data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                backgroundColor: [
                '#ffae42',
                '#0c9463',
                '#AF111C'
                ],
                hoverBackgroundColor: [
                '#2d334a',
                '#2d334a',
                '#2d334a'
                ]
            }],
        }
        return (
            <Container fluid style={{backgroundColor: 'white', boxShadow: '3px 3px 6px #c5c8cc, -3px -3px 6px #E8EBF0'}} className="border-none rounded p-3 my-2">
                <h5 id="title" className="mb-4">Global Report</h5>
                <p id="datetime" title={lastUpdate.toString()}>Last Updated: {lastUpdate.toGMTString()}</p>
                <Container>
                    <Pie data={chartData} legend={{display: false}} height={150}  redraw={true} />
                </Container>
                <Container fluid className="mt-4">
                    <Row>
                        <Col md={4} style={{padding: '0 5px'}}>
                            <TextTag number={data.confirmed.value} color='#ffae42' text="Total Cases" />
                        </Col>
                        <Col md={4} style={{padding: '0 5px'}}>
                            <TextTag number={data.deaths.value} color='#AF111C' text="Deaths" />
                        </Col>
                        <Col md={4} style={{padding: '0 5px'}}>
                            <TextTag number={data.recovered.value} color='#0c9463' text="Recovered" />
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default Global
