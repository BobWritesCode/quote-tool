import appStyles from './styles/App.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TopNavbar } from './components/top-navbar/TopNavbar';
import CustomerContainer from './components/customer/CustomerContainer';
import QuotesContainer from './components/quote/QuotesContainer';
import { CustomerContextProvider } from './contexts/CustomerDataContext';

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
            <CustomerContextProvider>
              <CustomerContainer />
              <QuotesContainer />
            </CustomerContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
