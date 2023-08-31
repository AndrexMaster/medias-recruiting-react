import { MainPage } from "./components/pages/MainPage";
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux";
import store from "./reduxStore";

function App() {
    return (
        <ChakraProvider>
            <Provider store={store}>
                <div className="main-container">
                    <MainPage/>
                </div>
            </Provider>
        </ChakraProvider>
    );
}

export default App;
