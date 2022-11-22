import "./App.css";
import React from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import { ProtectedRoute } from "./common/SpecialRoutes";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Flex direction="column" justify="center" align="center" w="100%">
                <Navbar />
                <PostList />
              </Flex>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Flex direction="column" justify="center" align="center" w="100%">
                <Navbar />
                <UserProfilePage />
              </Flex>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
