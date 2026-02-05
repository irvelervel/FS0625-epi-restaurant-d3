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
        // ottimo! salviamo questo array di prenotazioni nello stato del componente
        this.setState({
          reservations: reservationsFromDB,
        })
      })
      .catch((err) => {
        console.log('errore', err)
      })
  }

  // componentDidMount è un METODO DI LIFECYCLE
  componentDidMount() {
    console.log('SONO COMPONENTDIDMOUNT')
    // componentDidMount è il posto PERFETTO per eseguire funzioni che recuperano
    // dati necessari al montaggio del componente!
    this.getReservations()
    // componentDidMount è un metodo che (se trovato) viene eseguito UNA VOLTA all'avvio
    // del componente, DOPO la prima invocazione di render()
    // (da cui il nome "componentDidMount")
  }

  // render è un METODO DI LIFECYCLE
  // un metodo fondamentale per rendere funzionante il componente a classe è RENDER
  render() {
    console.log('SONO RENDER')
    // il metodo render di un componente viene eseguito UNA VOLTA all'avvio del componente
    // e poi una SUCCESSIVA VOLTA per ogni aggiornamento di state/props del componente

    // per questo motivo NON SI DEVE MAI nel render eseguire un setState()
    // perchè se eseguiamo un setState react ri-eseguirà render()
    // -> render() NON È il posto giusto per eseguire chiamate API!

    // tutti i metodi e le proprietà di una classe devono venire sempre prefissi della
    // parola "this"; questo perchè si andranno fisicamente a trovare all'interno della
    // ISTANZA della classe

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

// 1) PRIMO RENDER -> il componente si avvia e porta nell'interfaccia le parti STATICHE,
// così l'utente ha già qualcosa da vedere e magari si trova davanti uno spinner
// 2) COMPONENTDIDMOUNT -> se c'è, parte dopo il primo render e si occupa di fare tutte
// quelle operazioni lente, asincrone, che richiedono conti, contatti esterni etc.
// e alla fine della sua esecuzione spesso salva i risultati nello state
// 3) SECONDO RENDER -> a causa del setState, render() si sveglia nuovamente: NON ridisegnerà
// nuovamente le parti statiche, perchè quelle le aveva già portate nel DOM al PRIMO
// RENDER... invece si occuperà di riempire tutti i "buchi" che avevamo lasciato vuoti
// inizialmente ora che i dati sono arrivati
