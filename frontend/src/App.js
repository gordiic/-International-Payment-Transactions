import React, { useState, useEffect } from "react";
import { getProfile } from "./Services/userService";
import LoginRegister from "./LoginRegister";
import LeftMenu from "./LeftMenu";
import MyAccount from "./MyAccount";
import OnlineAccount from "./OnlineAccount";
import TransactionMenu from "./TransactionMenu";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {
  ChakraProvider,
  theme,
  Box,
  Button,
  Flex,
  Text,
  Link,
  Grid,
  HStack,
  StackDivider,
  Switch,
  Spacer,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  //Switch,
  Route,
  Routes,
  Link as RouteLink,
} from "react-router-dom";

function App() {
  // window.localStorage.setItem(
  //   "user",
  //   JSON.stringify({
  //     id: 0,
  //     ime: "",
  //     prezime: "",
  //     adresa: "",
  //     grad: "",
  //     drzava: "",
  //     brTelefona: "",
  //     email: "",
  //     verifikovan: false,
  //     lozinka: "",
  //   })
  // );

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem("user")]);

  const logOut = () => {
    localStorage.clear();
    window.location.href = "./";
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <Flex align="top" boxShadow="dark-lg" p="2" mb="2" bgColor="black">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgColor=""
              padding={2}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgColor="black"
                padding={2}
              >
                <Button
                  onClick={() => (window.location.href = "./")}
                  textColor="gray.200"
                  colorScheme="yellow"
                  textColor="black"
                  margin={1}
                >
                  Pocetna stranica
                </Button>

                {user && (
                  <Button
                    onClick={() => (window.location.href = "./MyAccount")}
                    textColor="gray.200"
                    colorScheme="yellow"
                    textColor="black"
                    margin={1}
                  >
                    Pogledaj profil
                  </Button>
                )}
                {user && user.verified &&(
                  <Button
                    onClick={() => (window.location.href = "./TransactionMenu")}
                    textColor="gray.200"
                    colorScheme="yellow"
                    textColor="black"
                    margin={1}
                  >
                    Transakcija
                  </Button>
                )}
              </Box>
              {user && user.verified && (
                <Button
                  onClick={() => (window.location.href = "./OnlineAccount")}
                  textColor="gray.200"
                  colorScheme="yellow"
                  textColor="black"
                  margin={1}
                >
                  On-line racun
                </Button>
              )}
              {user && !user.verified && (
                <Button
                  onClick={() => (window.location.href = "./OnlineAccount")}
                  textColor="gray.200"
                  colorScheme="red"
                  textColor="black"
                  margin={1}
                >
                  Verifikuj nalog
                </Button>
              )}
              {user && (
                <Button
                  onClick={logOut}
                  variant="ghost"
                  textColor="gray.200"
                  colorScheme="blue"
                >
                  Odjavi se
                </Button>
              )}
              {user && (
                <Box
                  size="md"
                  fontSize="lg"
                  variant="ghost"
                  color="current"
                  marginLeft="2"
                >
                  <Text textColor="white">
                    {user.name}
                    &nbsp;
                    {user.lastname}
                  </Text>
                </Box>
              )}
              <Box>
                <ColorModeSwitcher />
              </Box>
            </Box>
          </Flex>
          <Flex direction="row" alignItems="top" width="100%" padding={3}>
            <Flex></Flex>
            <Flex alignItems="center" direction="column" width="100%">
              <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/MyAccount" element={<MyAccount />} />
                <Route path="/OnlineAccount" element={<OnlineAccount />} />
                <Route path="/TransactionMenu" element={<TransactionMenu />} />
              </Routes>
            </Flex>
          </Flex>
        </Router>
      </ChakraProvider>
    </>
  );
}
export default App;
