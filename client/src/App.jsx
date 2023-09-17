// First we import our Hello 
import Hello from './routes/Home';
import Header from './components/Header';
import Footer from './components/Footer';

// React apps typically have a single App component at the very top that can reference other React components.
// This component, `App`, is our main component that is importing `Hello` and rendering it in the return method.
function App() {
  return (
    <div>
      <Header />
      <main className="mx-3">
        <Hello />
      </main>
      <Footer />
    </div>
  )
}

export default App;
