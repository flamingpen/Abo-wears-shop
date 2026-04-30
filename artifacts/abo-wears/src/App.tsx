import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Jerseys from "@/pages/Jerseys";
import CategoryPage from "@/pages/CategoryPage";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/jerseys" component={Jerseys} />
          <Route path="/joggers">
            {() => <CategoryPage category="joggers" />}
          </Route>
          <Route path="/shorts">
            {() => <CategoryPage category="shorts" />}
          </Route>
          <Route path="/face-caps">
            {() => <CategoryPage category="face-caps" />}
          </Route>
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
