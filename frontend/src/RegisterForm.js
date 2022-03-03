import React, { useState, useEffect } from "react";
import { register } from "./Services/userService";

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
} from "@chakra-ui/react";
import axios from "axios";

import {
  EmailIcon,
  InfoIcon,
  PhoneIcon,
  LockIcon,
  WarningIcon,
  AtSignIcon,
} from "@chakra-ui/icons";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [person, setPerson] = useState({
    id: 0,
    name: "",
    lastname: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
    email: "",
    verified: false,
    password: "",
  });
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (message === "Successfully registered.") {
      alert(message);
      window.location.href = "./";
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
    console.log(person);
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
      console.log(person);
      register(person).then((item) => {
        if (item === "E-mail already exists.") {
          setError(item);
        } else {
          setMessage(item);
        }
      });
      setPerson({
        id: 0,
        name: "",
        lastname: "",
        address: "",
        city: "",
        country: "",
        phoneNumber: "",
        email: "",
        verified: false,
        password: "",
      });
      setPassword2("");
    } else {
      if (person.password !== password2) {
        setError("Lozinke se ne poklapaju.");
      } else {
        setError("Morate popuniti sva polja za registraciju.");
      }
    }
  };
  return (
    <form action="submit">
      <Stack spacing={3}>
        <FormControl isRequired>
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
          <InputGroup>
            <InputLeftElement children={<Icon as={AtSignIcon} />} />
            <Input
              type="email"
              name="email"
              id="email"
              value={person.email}
              onChange={handleChange}
              placeholder="Email"
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
          Registruj se
        </Button>
        <Center>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {message === "Uspjesno ste se registrovali." && (
            <Alert>{message}</Alert>
          )}
        </Center>
      </Stack>
    </form>
  );
};

export default RegisterForm;
