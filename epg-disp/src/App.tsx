import { EPGView } from './epg-view'
import { ThemeProvider } from './lib/theme-provider'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <EPGView/>
    </ThemeProvider>
  )
}

export default App
