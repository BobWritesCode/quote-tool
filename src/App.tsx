import appStyles from './styles/App.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TopNavbar } from './components/top-navbar/TopNavbar';
import CustomerContainer from './components/customer/CustomerContainer';
import QuotesContainer from './components/quote/QuotesContainer';
import { CustomerContextProvider } from './contexts/CustomerDataContext';
import { QuotesContextProvider } from './contexts/QuotesContext';

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
              <QuotesContextProvider>
                <CustomerContainer />
                <QuotesContainer />
              </QuotesContextProvider>
            </CustomerContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
