// questo componente servirà a generare un FORM attraverso il quale un utente
// potrà prenotare un tavolo nel nostro ristorante

import { Component } from 'react'
// importiamo come sempre Component, che è il componente a classe principale della libreria
// react, dal quale erediteremo cose come state, render

import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
// questi invece sono import più specifici:
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

// al momento, visto che non sappiamo dividere i nostri componenti in "pagine",
// inseriremo questo nuovo form in App, nella sezione principale

// NB: ogni volta che dovrete inserire un FORM in un componente React, ci sarà bisogno
// di uno STATE -> il componente dovrà essere scritto in forma di CLASSE
// FORM <-> STATE <-> CLASS COMPONENT

// oggi lavoreremo con un endpoint nuovo: 'https://striveschool-api.herokuapp.com/api/reservation'
// come possiamo sapere che tipo di oggetto accetta questa API? lo sa solo il backender!
// il mio backender mi ha fornito lo "schema" (detto anche "modello") dell'oggetto da inviare:

// SCHEMA:
// name -> string
// phone -> string
// numberOfPeople -> string | number
// smoking -> boolean
// dateTime -> string
// specialRequests -> string (optional)

const reservationURL = 'https://striveschool-api.herokuapp.com/api/reservation'

const initialReservation = {
  // qui collezionerò i valori dei vari input
  // però prima di tutto devo pensare i valori iniziali del mio state
  name: '', // cerchiamo sempre di lavorare con STRINGHE
  phone: '',
  numberOfPeople: '1',
  smoking: false,
  dateTime: '',
  specialRequests: '',
}

class ReservationForm extends Component {
  state = {
    reservation: initialReservation,
  }

  // in React i campi input sono sempre "controllati" ("controlled")
  // un campo "controllato" possiede della logica che lo collega a dei dati (lo stato)
  // un campo "controllato" è collegato ai dati con un "2-way data binding"

  // devo avere un metodo "render"
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col className="text-center" xs={12} md={6}>
            <h3>Prenota un tavolo</h3>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                // CHIAMATA POST
                fetch(reservationURL, {
                  method: 'POST',
                  body: JSON.stringify(this.state.reservation),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then((response) => {
                    if (response.ok) {
                      alert('prenotazione salvata')
                      // svuotiamo il form
                      // per farlo non intercetteremo i campi uno ad uno come facevamo prima
                      // ci basterà svuotare lo stato, perchè l'interfaccia è già collegata
                      this.setState({
                        reservation: initialReservation,
                        // svuoto lo stato, lo riporto alle condizioni iniziali
                      })
                    } else {
                      throw new Error('errore nella prenotazione')
                    }
                  })
                  .catch((err) => {
                    console.log('ERRORE NEL SALVATAGGIO', err)
                  })
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Prenotazione a nome:</Form.Label>
                <Form.Control
                  type="text"
                  // freccina sotto -> collego il valore dello stato al valore dell'input
                  value={this.state.reservation.name}
                  onChange={(e) => {
                    console.log('NAME CAMBIATO', e.target.value)
                    // freccina sopra -> collego il cambiamento del valore dell'input
                    // a un settaggio dello state
                    this.setState({
                      // come definisco un nuovo valore per la proprietà "name" dentro
                      // il sotto-oggetto reservation?
                      // devo riscrivere l'intero reservation:
                      reservation: {
                        ...this.state.reservation, // porta dentro 6 proprietà
                        name: e.target.value,
                      },
                    })
                  }}
                  placeholder="Mario Rossi"
                  required
                />
              </Form.Group>

              {/* CONDITIONAL RENDERING: mostriamo l'Alert sulla base di una condizione */}
              {/* SHORT CIRCUIT -> && */}
              {(this.state.reservation.name === 'Giangiorgio' ||
                this.state.reservation.name === 'Antonino') && (
                <Alert variant="success">Proprio un bel nome!</Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Numero di telefono:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.reservation.phone}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation, // porta dentro 6 proprietà
                        phone: e.target.value,
                      },
                    })
                  }}
                  placeholder="348xxxxxxx"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>In quanti siete:</Form.Label>
                <Form.Select
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation, // porta dentro 6 proprietà
                        numberOfPeople: e.target.value,
                      },
                    })
                  }}
                  aria-label="Number of people selection"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori"
                  className="d-flex justify-content-center gap-2"
                  checked={this.state.reservation.smoking} // torna true/false
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        smoking: e.target.checked, // torna true/false
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data e ora:</Form.Label>
                <Form.Control
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation, // porta dentro 6 proprietà
                        dateTime: e.target.value,
                      },
                    })
                  }}
                  type="datetime-local"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Richieste particolari</Form.Label>
                <Form.Control
                  as="textarea"
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation, // porta dentro 6 proprietà
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                  rows={5}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationForm
