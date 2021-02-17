import {useContext} from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, AuthContext } from "./context/auth";
import AuthRoute from './context/authRoute';
import SinglePost from './pages/SinglePost';
function App() {
	const {user} = useContext(AuthContext);
	return (
		<AuthProvider>
			<Router>
				<MenuBar />
				<Container>
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<Route exact path="/posts/:postId" component={SinglePost} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
