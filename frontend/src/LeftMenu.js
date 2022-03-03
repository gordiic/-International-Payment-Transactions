import React, { useState } from "react";
import Img from "./Images/logo.png";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Flex,
  Spacer,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  EmailIcon,
  BellIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const LeftMenu = () => {
  const { colorMode } = useColorMode();
  const [usr, setUser] = useState(localStorage.getItem("user"));

  const MojaObavjestenja = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./";
    } else {
      window.location.href = "./MojaObavjestenja";
    }
  };
  const MojeOcjene = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./MojeOcjene";
    }
  };

  const mojKp = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./MojKp";
    }
  };

  const postaviOglas = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./postaviOglas";
    }
  };
  return (
    <Flex width="250" margin="2">
      <Stack direction="column">
        <Image marginBlockEnd="" width={250} src={Img} />
        <Stack direction="column">
          <Button
            variant="solid"
            colorScheme="red"
            rightIcon={<ArrowRightIcon />}
            onClick={postaviOglas}
            boxShadow="xl"
          >
            Postavite oglas
          </Button>
          <Button
            variant="solid"
            colorScheme={colorMode === "dark" ? "messenger" : "gray"}
            rightIcon={<ArrowRightIcon color="#000080" />}
            onClick={mojKp}
            boxShadow="xl"
          >
            <Text color="#000080">Moj </Text>
            <Text color="red">&nbsp; k</Text>
            <Text>p</Text>
          </Button>
          {usr !== null && (
            <Stack direction="column" padding={4}>
              <Button
                leftIcon={<BellIcon />}
                onClick={MojaObavjestenja}
                boxShadow="xl"
              >
                Obavjestenja
              </Button>
              <Button
                leftIcon={<StarIcon />}
                onClick={MojeOcjene}
                boxShadow="xl"
              >
                Ocjene
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default LeftMenu;
