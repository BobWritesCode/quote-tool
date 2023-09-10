import appStyles from './styles/App.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TopNavbar } from './components/top-navbar/TopNavbar';
import CustomerContainer from './components/customer/CustomerContainer';
import QuotesContainer from './components/quote/QuotesContainer';

function App() {
  return (
    <div className={appStyles.App}>
      <Container fluid>
        <Row>
          <Col>
            <TopNavbar />
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomerContainer />
            <QuotesContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
