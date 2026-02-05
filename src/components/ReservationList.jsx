// qui dentro oggi recupereremo le prenotazioni esistenti a DB in fase di MONTAGGIO
// del componente e le mostreremo in una lista di bootstrap.

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

const reservationURL = 'https://striveschool-api.herokuapp.com/api/reservation'

class ReservationList extends Component {
  state = {
    // lo stato in questo componente ci verrà utile per MEMORIZZARE nella memoria
    // del componente le prenotazioni recuperate dalla chiamata GET
    // lo stato funzionerà come "anello di collegamento" tra la LOGICA del componente
    // e la sua rappresentazione visiva (il JSX)
    reservations: [], // prevedo che riceverà dalle API un array di oggetti "prenotazione"
    // e il suo valore perfetto iniziale è un array vuoto -> [ ]
  }

  getReservations = () => {
    // questa sarà la funzione che effettuerà la GET su /reservations
    // e salverà l'array ottenuto dalla response nello stato del componente
    fetch(reservationURL)
      .then((response) => {
        if (response.ok) {
          // se finiamo qui, la response porta buone notizie (codice 200) http.cat
          // bene, posso ora cercare nella response l'array di prenotazioni!
          return response.json()
        } else {
          throw new Error('Errore nel recupero delle prenotazioni')
        }
      })
      .then((reservationsFromDB) => {
        // in questo caso abbiamo bisogno del secondo .then() perchè dalla response
        // intendiamo estrarre il JSON!
        console.log('PRENOTAZIONI RECUPERATE', reservationsFromDB)
      })
      .catch((err) => {
        console.log('errore', err)
      })
  }

  // un metodo fondamentale per rendere funzionante il componente a classe è RENDER
  render() {
    // tutti i metodi e le proprietà di una classe devono venire sempre prefissi della
    // parola "this"; questo perchè si andranno fisicamente a trovare all'interno della
    // ISTANZA della classe
    this.getReservations()

    return (
      <Container>
        <Row className="justify-content-center my-5">
          <Col className="text-center" xs={12} md={6}>
            <h2 className="text-center">Amministrazione - Prenotazioni</h2>
            <ListGroup>
              {/* qui dentro devo mostrare le prenotazioni attualmente salvate nello state */}
              {this.state.reservations.map((reservation) => {
                return (
                  <ListGroup.Item key={reservation._id}>
                    {reservation.name} per {reservation.numberOfPeople} alle{' '}
                    {reservation.dateTime}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationList
