import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, extendTheme, createStandaloneToast } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { MultiSelectTheme } from 'chakra-multiselect'
import AppRouter from './config/routes';
import { persistor, store } from './config/redux/store';
import reportWebVitals from './reportWebVitals';
import "@fontsource/poppins";
import './index.css';

const { ToastContainer } = createStandaloneToast()

const root = ReactDOM.createRoot(document.getElementById('root'));


const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans-serif`,
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: localStorage.getItem('systemColorMode') || false,
};

const theme = extendTheme({
  fonts,
  config,
  components: {
    MultiSelect: MultiSelectTheme
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
