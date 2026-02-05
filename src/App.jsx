import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantNavbar from './components/RestaurantNavbar'
import Home from './components/Home'
import ReservationForm from './components/ReservationForm'
import Welcome from './components/Welcome'
import ReservationList from './components/ReservationList'

// PASSAGGI PER INCORPORARE BOOTSTRAP IN UN'APP VITE
// 1) npm install bootstrap
// 2) npm install react-bootstrap
// 3) import di bootstrap.min.css in App.jsx
// 4) svuota o elimina i file css predefiniti: App.css e index.css
// 5) usa i componenti di react-bootstrap: Container, Row, Col, Button, Card etc.

function App() {
  return (
    <div className="bg-body-secondary min-vh-100">
      {/* qui importo il componente della mia navbar */}
      <RestaurantNavbar title="EpiRestaurant" />
      <Welcome />

      {/* temporaneamente, inserisco qui la lista delle prenotazioni (la sposteremo next week) */}
      <ReservationList />

      {/* temporaneamente, inserisco qui il form (lo sposteremo next week) */}
      <ReservationForm />

      {/* qui inserisco il resto della pagina principale */}
      <Home />
    </div>
  )
}

export default App
