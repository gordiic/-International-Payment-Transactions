import React, { useState, useEffect } from "react";
import { changeAccount } from "./Services/userService";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Divider,
  Alert,
  AlertIcon,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  EmailIcon,
  InfoIcon,
  PhoneIcon,
  LockIcon,
  WarningIcon,
  AtSignIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const MyAccount = () => {
  const [person, setPerson] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  //JSON.parse(localStorage.getItem("user"))
  //PRIVREMENOOO
  // /setPerson();
  const [person2, setPerson2] = useState(person);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (message === "Updated.") {
      alert(message);
      window.location.href = "./MyAccount";
    }
  }, [message]);

  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    if (name === "password2") {
      setPassword2(value);
    } else {
      setPerson({ ...person, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      person.name &&
      person.password &&
      person.lastname &&
      person.address &&
      person.city &&
      person.country &&
      person.phoneNumber &&
      person.email &&
      person.password === password2
    ) {
      changeAccount(person).then((item) => {
        setMessage(item); //mozda treba provjerovati da li je item=="Updated." jer moze server da ne ivrsi zbog necega i ako je ovam osve ok
      });
      localStorage.setItem("user", JSON.stringify(person));
      setPassword2("");
      setError("");
    } else {
      setPerson(person2);
      setPassword2("");

      if (person.password !== password2) {
        setError("Lozinke se ne poklapaju.");
      } else {
        setError("Unesite sve podatke.");
      }
    }
  };
  return (
    <Box
      margin={4}
      border="1px"
      padding={2}
      borderRadius="lg"
      borderColor="gray.300"
    >
      <Stack direction="row" border={1}>
        <form action="submit">
          <Stack spacing={3}>
            {person && person.verifikovan && (
              <>
                <Button
                  textColor="gray.200"
                  colorScheme="yellow"
                  textColor="black"
                  margin={1}
                >
                  Verifikovan
                </Button>
              </>
            )}
            {person && !person.verified && (
              <>
                <Button
                  onClick={() => (window.location.href = "./OnlineAccount")}
                  textColor="gray.200"
                  colorScheme="red"
                  textColor="black"
                  margin={1}
                >
                  Nalog nije verifikovan
                </Button>
              </>
            )}
            <FormControl isRequired>
              <Text fontSize="sm">Ime:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="name"
                  id="name"
                  value={person.name}
                  onChange={handleChange}
                  placeholder="Ime"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Prezime:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="lastname"
                  id="lastname"
                  value={person.lastname}
                  onChange={handleChange}
                  placeholder="Prezime"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Adresa:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={EmailIcon} />} />
                <Input
                  type="name"
                  name="address"
                  id="address"
                  value={person.address}
                  onChange={handleChange}
                  placeholder="Adresa"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Grad:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="city"
                  id="city"
                  value={person.city}
                  onChange={handleChange}
                  placeholder="Grad"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Drzava:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="country"
                  id="country"
                  value={person.country}
                  onChange={handleChange}
                  placeholder="Drzava"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Telefon:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={PhoneIcon} />} />
                <Input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={person.phoneNumber}
                  onChange={handleChange}
                  placeholder="Broj telefona"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <Text fontSize="sm">Lozinka:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={LockIcon} />} />
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={person.password}
                  onChange={handleChange}
                  placeholder="Lozinka"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<Icon as={LockIcon} />} />
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  value={password2}
                  onChange={handleChange}
                  placeholder="Potvrdi lozinku"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>

            <Divider />
            <Button type="submit" onClick={handleSubmit}>
              Izmeni
            </Button>
            <Center>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </Center>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default MyAccount;
