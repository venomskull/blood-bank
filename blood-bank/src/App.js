import './App.css';
import { store } from './actions/store';
import {Provider} from 'react-redux';
import DCandidates from './components/DCandidates';
import {Container} from '@material-ui/core';
import {ToastProvider} from 'react-toast-notifications';

function App() {
  return (
    <ToastProvider autoDismiss={true}>
      <Provider store={store}>
        <Container maxWidth="lg">
          <DCandidates />
        </Container>
      </Provider>
    </ToastProvider>
  );
}

export default App;
