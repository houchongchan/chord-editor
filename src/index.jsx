import ReactDOM from 'react-dom/client'
import './globals.css'
import App from './components/App'

const container = document.getElementById('root')

// Create a root.
const root = ReactDOM.createRoot(container)

// Initial render
root.render(<App name="blog" />)
