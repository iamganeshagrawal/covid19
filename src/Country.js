import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import TextTag from './TextTag'
import {Pie} from 'react-chartjs-2'

export class Country extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data: null,
             countries: [],
             countryCode : 'IN',
             country: 'India',
             errMsg: null
        }
    }
    
    componentDidMount(){
        axios.get('https://covid19.mathdro.id/api/countries')
        .then(res => {
            let _countries = res.data.countries.filter(c => c.hasOwnProperty('iso2')).map(c => [c.name, c.iso2]);
            this.setState({countries: _countries || []})
        })
        .catch(err => {
            console.log(err)
        })
        axios.get('https://covid19.mathdro.id/api/countries/' + this.state.countryCode)
        .then(res => {
            this.setState({data: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }
    handleCountryChange = (event) => {
        const country = event.target.options[event.target.selectedIndex].text
        const countryCode = event.target.value
        if(this.state.countryCode !== countryCode){
            axios.get('https://covid19.mathdro.id/api/countries/' + countryCode)
            .then(res => {
                this.setState({data: res.data, errMsg: null})
            })
            .catch(err => {
                this.setState({data: null, errMsg: 'No Record Found for choosed location'})
            })
            this.setState({countryCode: countryCode, country: country})
        }
    }

    render() {
        if(this.state.data === null){
            return (
                <Container fluid style={{backgroundColor: 'white', boxShadow: '3px 3px 6px #c5c8cc, -3px -3px 6px #E8EBF0'}} className="border-none rounded p-3 my-2">
                    <h5 id="title" className="mb-4">Local Report</h5>
                    <Container>
                        {
                            this.state.errMsg ? this.state.errMsg : 'Loading...' 
                        }
                    </Container>
                </Container>
            )
        }
        const { data, countries, countryCode } = this.state
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
                <h5 id="title" className="mb-4">Report of {this.state.country} <img src={`https://www.countryflags.io/${this.state.countryCode.toLowerCase()}/flat/32.png`} alt={this.state.country} /></h5>
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
                <Container fluid>
                    <Form.Group controlId="changecountry">
                        <Form.Label>Change Location</Form.Label>
                        <Form.Control as="select" onChange={this.handleCountryChange} value={countryCode}>
                            {
                                countries.length > 0 ? countries.map((c,i) => {
                                        return <option value={c[1]} key={i}>{c[0]}</option>
                                }) : <option value="loading" key="loading" disabled>Loading...</option>
                            }
                        </Form.Control>
                    </Form.Group>
                </Container>
            </Container>
        )
    }
}

export default Country
