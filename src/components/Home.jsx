import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
import { Component } from 'react'

// React è due cose: le props e gli states

// Lo state è una "memoria" per il componente.
// Nel react "classico" lo state è una funzionalità dei componenti a CLASSE.

// Provo a implementare uno state nel mio componente Home: vorrei memorizzare
// l'informazione della corrente "pasta attiva" (cioè vorrei che il componente
// sappia in qualsiasi momento quale sia la pasta attualmente visualizzata nel
// carosello). In questo modo potrà generare una lista dinamica di recensioni
// nella parte sottostante.

class Home extends Component {
  // creo lo state
  state = {
    // lo state è la memoria del componente. Ce ne può essere solo uno per componente
    // e sarà SEMPRE un oggetto; potete metterci dentro infinite proprietà
    activePasta: pastasciutte[0], // carbonara
    // lo stato iniziale è fondamentale per la logica del componente
  }

  render() {
    // console.log('PASTE', pastasciutte)

    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col className="text-center" xs={12} md={8}>
            {/* inizio carosello */}
            <Carousel
              onSlide={(i) => {
                // console.log(i)
                // bella questa i! è l'indice della nuova slide in arrivo
                // vorrei utilizzarla per aggiornare la mia activePasta
                // aggiorniamo quindi lo state del componente assegnando
                // ad ogni cambio di slide -> activePasta: pastasciutte[i]
                // problema! lo stato del componente React è READ-ONLY
                this.setState({
                  // passate a setState un nuovo oggetto: il contenuto di questo
                  // nuovo oggetto verrà FUSO, MERGIATO nello stato corrente!
                  activePasta: pastasciutte[i],
                })
              }}
            >
              {pastasciutte.map((pasta) => {
                return (
                  // ogni volta che userete il metodo .map() per generare
                  // dinamicamente del contenuto in React dovrete assegnare
                  // manualmente all'elemento che ritornate ad ogni iterazione
                  // una prop chiamata "key". Il valore di tale prop dovrà essere
                  // UNICO per ogni elemento generato.
                  <Carousel.Item key={pasta.id}>
                    <img src={pasta.image} />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
            {/* fine carosello */}
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="text-center" xs={12} md={8}>
            {/* inizio lista recensioni */}
            <ListGroup>
              {this.state.activePasta.comments.map((c) => {
                return (
                  <ListGroup.Item key={c.id}>
                    {c.rating} | {c.comment}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
            {/* fine lista recensioni */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
