import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./routes";


const App = () => {
  const queryClient = new QueryClient()

  return(
  <QueryClientProvider client={queryClient} >
    <Router />
  </QueryClientProvider>
)};

export default App;
