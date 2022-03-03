import React, { useState } from "react";
import {
  Box,
  Button,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Img from "./Images/logo.png";

const LoginRegister = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      margin={4}
      bgColor={colorMode === "dark" ? "gray.600" : "yellow.400"}
      w="350px"
      p={4}
      boxShadow="dark-lg"
      rounded="lg"
    >
      <Box alignContent="center" bgColor="white">
        <Image mx="auto" my={6} width={250} src={Img} />
      </Box>
      <Tabs variant="soft-rounded" isFitted>
        <TabList>
          <Tab textColor={colorMode === "dark" ? "white" : "gray.700"}>
            Uloguj se
          </Tab>
          <Tab textColor={colorMode === "dark" ? "white" : "gray.700"}>
            Registruj se
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LoginRegister;
