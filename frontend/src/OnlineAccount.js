import React, { useState, useEffect } from "react";
import {
  accountVerification,
  depositOnAccount,
  conversionToValute,
  refreshAccount,
} from "./Services/userService";
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
  InputRightAddon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Select,
  Th,
  Tr,
  Td,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
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

const URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=57d102e76d357aaaab5dba8955ffa5a8";
const OnlineAccount = () => {
  const [person, setPerson] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [payment, setPayment] = useState({
    amount: "",
    rsdBalance: "",
    btcBalance: "",
    id: "",
  });
  const [valuteAmount, setValuteAmount] = useState([]);
  const [array, setArray] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [creditCard, setcreditCard] = useState({
    number: "",
    username: "",
    expirationDate: "",
    csc: "",
    balance: 0,
    id: person.id,
  });

  const [conversion, setConversion] = useState({
    valuteFrom: "",
    amountFrom: "",
    valuteTo: "",
    currencyFrom: "",
    currencyTo: "",
    id: person.id,
  });
  useEffect(() => {
    setPerson(JSON.parse(localStorage.getItem("user")));
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //setBaseCurrency(data.base);
        setCurrency(data.rates);
        setArray([data.base, ...Object.keys(data.rates)]);
        setValuteAmount(person.balances);
      });
  }, []);

  useEffect(() => {
    var rsdbal = person.balances["RSD"];
    var btcBal = person.balances["BTC"];

    console.log(rsdbal);
    setPayment({
      amount: "",
      rsdBalance: rsdbal,
      btcBalance: btcBal,
      id: person.id,
    });
  }, [person]);
  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    setcreditCard({ ...creditCard, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    creditCard.id = person.id;
    if (creditCard.number && creditCard.csc) {
      console.log(creditCard);
      accountVerification(creditCard)
        .then((item) => {
          console.log(item);
          if (item !== "Verification failed.") {
            window.localStorage.setItem("user", JSON.stringify(item));
            setError("");
          } else {
            setError(item);
          }
          return item;
        })
        .then((item) => {
          console.log(item);
          if (item !== "Verification failed.") {
            setPerson(window.localStorage.getItem("user"));
            window.location.reload();
          }
        });
    } else {
      setError("Unesite sve podatke za verifikaciju.");
    }
  };

  const handleChange2 = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    setPayment({ ...payment, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log("val" + payment.amount);
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(valuteAmount);
    console.log(payment);
    if (payment.amount) {
      if (payment.amount >= 1) {
        console.log(array);
        depositOnAccount(payment)
          .then((item) => {
            if (item !== "Deposition failed.") {
              window.localStorage.setItem("user", JSON.stringify(item));
              setError("");
            } else {
              setError(item);
            }
          })
          .then(() => {
            if (error !== "Deposition failed.") {
              setPerson(window.localStorage.getItem("user"));
              window.location.reload();
            }
          });
      } else {
        setError("Unesite kolicinu za uplatu vecu od 0.");
      }
    } else {
      setError("Unesite kolicinu za uplatu sa kartice.");
    }
  };

  const handleChange3 = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    setConversion({
      ...conversion,
      ["currencyFrom"]: currency[conversion.valuteFrom],
      ["currencyTo"]: currency[conversion.valuteTo],
      [name]: value,
    }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log(currency["RSD"]);
    // setConversion({
    //   ...conversion,
    //   ["currencyFrom"]: currency[conversion.valuteFrom],
    // });
    // setConversion({
    //   ...conversion,
    //   ["currencyTo"]: currency[conversion.valuteTo],
    // });
  };
  const handleSubmit3 = (e) => {
    e.preventDefault();
    if (person.balances[conversion.valuteFrom] === undefined) {
      setError2("Nemate trazeni racun.");
    } else if (conversion.valuteTo === "") {
      setError2("Odaberite valutu\n u koju konvertujete.");
    } else if (conversion.valuteTo === conversion.valuteFrom) {
      setError2("Ne mozete konvertovati\n u istu valutu.");
    } else {
      if (conversion.amountFrom === "") {
        setError2("Unesite sumu novca\n koju konverujete.");
      } else if (
        person.balances[conversion.valuteFrom] - conversion.amountFrom <
        0
      ) {
        setError2("Nemate dovoljno stanja u valuti " + conversion.valuteFrom);
      } else if (parseInt(conversion.amountFrom) < 0) {
        setError2("Kolicina novca mora\n biti pozitivan broj.");
      } else {
        setError2("");
        console.log(conversion);
        console.log(parseInt(person.balances[conversion.valuteFrom]));
        conversionToValute(conversion)
          .then((item) => {
            if (item !== "Conversion failed.") {
              window.localStorage.setItem("user", JSON.stringify(item));
              setError("");
            } else {
              window.localStorage.setItem("user", JSON.stringify(item));
              setPerson(item);
            }
          })
          .then(() => {
            if (error !== "Deposition failed.") {
              setPerson(window.localStorage.getItem("user"));
              window.location.reload();
            }
          });
      }
    }
  };

  const refrshUser = (e) => {
    refreshAccount(person).then((item) => {
      window.localStorage.setItem("user", JSON.stringify(item));
      setPerson(item);
      setValuteAmount(item.balances);
    });
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
        <Stack spacing={3}>
          {person && person.verified && (
            <Stack direction="row">
              <Stack direction="column">
                <Select
                  size="xs"
                  placeholder="From:"
                  name="valuteFrom"
                  onChange={handleChange3}
                >
                  {array.map((cur) => {
                    return (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    );
                  })}
                </Select>
                <Select
                  size="xs"
                  placeholder="To:"
                  name="valuteTo"
                  onChange={handleChange3}
                >
                  {array.map((cur) => {
                    return (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    );
                  })}
                </Select>
                <Input
                  type="number"
                  name="amountFrom"
                  id="amountFrom"
                  value={conversion.amountFrom}
                  onChange={handleChange3}
                  placeholder="Kolicina"
                  variant="filled"
                  textColor="black"
                />
                <Button
                  textColor="gray.200"
                  colorScheme="yellow"
                  textColor="black"
                  margin={1}
                  onClick={handleSubmit3}
                >
                  Napravi stanje
                </Button>
                <Center>
                  {error2 && (
                    <Alert status="error">
                      <AlertIcon />
                      {error2}
                    </Alert>
                  )}
                </Center>
                <Table variant="simple">
                  <TableCaption>
                    Stanje online racuna u drugim valutama
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Valuta</Th>
                      <Th isNumeric>Stanje</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.entries(valuteAmount).map(([key, value]) => (
                      <Tr>
                        <Td>{key}</Td>
                        <Td>{value}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Valuta</Th>
                      <Th isNumeric>Stanje</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Stack>
              <Stack direction="column">
                <>
                  <Button
                    textColor="gray.200"
                    colorScheme="green"
                    textColor="black"
                    margin={1}
                  >
                    Verifikovan
                  </Button>
                  <form action="submit">
                    <FormControl isRequired>
                      <Text fontSize="sm">Kolicina za uplatu:</Text>
                      <InputGroup>
                        <InputLeftElement children={<Icon as={InfoIcon} />} />
                        <Input
                          type="number"
                          name="amount"
                          id="amount"
                          value={payment.amount}
                          onChange={handleChange2}
                          placeholder="Kolicina"
                          variant="filled"
                          textColor="black"
                        />
                        <InputRightAddon children="RSD" />
                      </InputGroup>
                    </FormControl>
                    <br />
                    <Stat>
                      <StatLabel>Trenutno stanje on-line racuna</StatLabel>
                      <StatNumber>{payment.rsdBalance}</StatNumber>
                      <StatHelpText>RSD</StatHelpText>
                      <StatLabel>Trenutno stanje BTC racuna</StatLabel>
                      <StatNumber>{payment.btcBalance}</StatNumber>
                      <StatHelpText>BTC</StatHelpText>
                    </Stat>
                    <Button margin={2} width="100%" onClick={refrshUser}>
                      Osvjezi racun
                    </Button>
                    <br />
                    <Divider />
                    <br />
                    <Button
                      width="100%"
                      textColor="black"
                      colorScheme="yellow"
                      type="submit"
                      onClick={handleSubmit2}
                    >
                      Uplati na racun
                    </Button>
                  </form>
                </>
              </Stack>
            </Stack>
          )}
          {person && !person.verified && (
            <>
              <Button
                textColor="gray.200"
                colorScheme="red"
                textColor="black"
                margin={1}
              >
                Nalog nije verifikovan
              </Button>
            </>
          )}
          {person && !person.verified && (
            <form action="submit">
              <FormControl isRequired>
                <Text fontSize="sm">Broj platne kartice:</Text>
                <InputGroup>
                  <InputLeftElement children={<Icon as={InfoIcon} />} />
                  <Input
                    type="number"
                    name="number"
                    id="number"
                    value={creditCard.number}
                    onChange={handleChange}
                    placeholder="Broj kartice"
                    variant="filled"
                    textColor="black"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <Text fontSize="sm">Sigurnosni kod:</Text>
                <InputGroup>
                  <InputLeftElement children={<Icon as={InfoIcon} />} />
                  <Input
                    type="name"
                    name="csc"
                    id="csc"
                    value={creditCard.csc}
                    onChange={handleChange}
                    placeholder="Sigurnosni kod"
                    variant="filled"
                    textColor="black"
                  />
                </InputGroup>
              </FormControl>
              <br />
              <Divider />
              <br />
              <Button width="100%" type="submit" onClick={handleSubmit}>
                Verifikuj
              </Button>
            </form>
          )}
          <Center>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Center>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OnlineAccount;
