import MainRouter from './MainRouter';
import { RouterProvider} from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={MainRouter} />
    </ThemeProvider>
  )
}

export default App
