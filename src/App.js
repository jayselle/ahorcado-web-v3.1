import React, { Component } from 'react';
import { Card, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import LetraInput from './LetraInput';
import PalabraInput from './PalabraInput';
import axios from 'axios';
import { API } from './constants';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ahorcado: null
        }
    }
    
    componentDidMount = () => {
        this.handleStartGame();
    }

    handleStartGame = (palabra) => {
        const rq = {
            params: {
                palabra: palabra
            }
        };

        axios.get(API.PROD_URL+'/newGame', rq)
            .then(response => {
                const ahorcado = response.data;
                this.setState({ ahorcado });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSubmit = (ahorcado) => {
        this.setState({ ahorcado });
    }

    render() {
        if (this.state.ahorcado == null)
            return <div className="d-flex flex-row justify-content-center mt-5"><Spinner animation="border" /></div>;

        const letrasIngresadas = this.state.ahorcado.letrasIngresadas ?? '';

        const disableForm = this.state.ahorcado.win || this.state.ahorcado.gameOver;

        return (
            <Card>
                <Card.Header style={{ fontSize: 50 }} id="title" className="text-center font-weight-bold">
                    ¡AHORCADO!
                </Card.Header>
                <Card.Body>
                    <Card.Title style={{ fontSize: 40 }} className="text-center font-weight-bold">
                        {this.state.ahorcado.modelo}
                    </Card.Title>
                    <div className="my-5">
                        <LetraInput onSubmit={this.handleSubmit} disableForm={disableForm} />
                        <PalabraInput onSubmit={this.handleSubmit} disableForm={disableForm} />
                    </div>
                    <Row>
                        <Col></Col>
                        <Col md={6}>
                            {this.state.ahorcado.win &&
                                <div id="winMessage" className="alert alert-success" role="alert">
                                    ¡Ganaste!
                                </div>}
                            {this.state.ahorcado.gameOver &&
                                <div id="gameOverMessage" className="alert alert-danger" role="alert">
                                    ¡Perdiste!
                                </div>}
                            {this.state.ahorcado.error &&
                                <div id="errorMessage" className="alert alert-danger" role="alert">
                                    {this.state.ahorcado.errorMessage}
                                </div>}
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col md={3}>
                            <Form.Label>Intentos</Form.Label>
                            <Form.Control id="txtIntentos" type="text" placeholder="Intentos" value={this.state.ahorcado.intentos} disabled />
                        </Col>
                        <Col md={3}>
                            <Form.Label>Letras Ingresadas</Form.Label>
                            <Form.Control id="txtLetrasIngresadas" type="text" placeholder="Letras Ingresadas" value={letrasIngresadas} disabled />
                        </Col>
                        <Col></Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Button id="btnTest" onClick={() => this.handleStartGame('testing')}>Testing</Button>
                    <Button id="btnReset" className="btn-secondary float-right" onClick={() => this.handleStartGame()}>Reset</Button>
                </Card.Footer>
            </Card>
        )};
}

export default App;
