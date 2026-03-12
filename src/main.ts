import './style.css'
import StrategyFlow from './components/StrategyFlow'

const app = document.getElementById("app")

if (app) {
  app.appendChild(StrategyFlow())
}