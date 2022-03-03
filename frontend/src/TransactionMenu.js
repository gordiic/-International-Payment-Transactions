import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  Stack,
  useColorMode,
  Center,
  Alert,
  Input,
  Select,
  Text,
  FormControl,
  RadioGroup,
  InputGroup,
  Radio,
  InputLeftElement,
  Icon,
  AlertIcon,
  Th,
  Tr,
  Td,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";
import {
  LockIcon,
  AtSignIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import { getTransactions, makeTransaction } from "./Services/userService";
const TransactionMenu = () => {
  const { colorMode } = useColorMode();
  const [person, setPerson] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [error, setError] = useState("");
  const [btcrsdValue, setBtcRsdValue] = useState({
    rsdBalance: "",
    btcBalance: "",
  });
  const [transaction, setTransaction] = useState({
    state: "",
    amount: "",
    btcamount: "",
    reciever: "",
    destination: "",
    id: person.id,
  });
  const [transactions, setTransactions] = useState([]);
  const [transactionsCopy, setTransactionsCopy] = useState([]);

  const [search, setSearch] = useState({
    searchType: "",
  });
  const [sort, setSort] = useState({
    sortType: "",
    growDesc: "",
  });
  //   useEffect(() => {
  // setPerson(JSON.parse(localStorage.getItem("user")));
  //   }, []);

  useEffect(() => {
    var rsdbal = person.balances["RSD"];
    var btcBal = person.balances["BTC"];

    console.log(rsdbal);
    setBtcRsdValue({
      rsdBalance: rsdbal,
      btcBalance: btcBal,
    });
    console.log(person);
    console.log("poziv");
    //TREBA OTKOMENATIRSATI
    getTransactions(person)
      .then((item) => {
        console.log(item);
        setTransactions(item);
        setTransactionsCopy(item);
      })
      .then(() => {
        console.log(transactions);
        // setPerson(window.localStorage.getItem("user"));
        // window.location.reload();
      });
  }, [person]);

  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;

    setTransaction({ ...transaction, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log(transaction);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (transaction.amount === "" && transaction.btcamount === "") ||
      transaction.destination === "" ||
      transaction.reciever === ""
    ) {
      setError("Unesite sva polja potrebna za transakciju.");
    } else if (
      transaction.destination === "bitcoin" &&
      (transaction.btcamount === "" || transaction.reciever === "")
    ) {
      setError("Unesite sva polja potrebna za transakciju.");
    } else if (
      transaction.destination === "banka" &&
      (transaction.amount === "" || transaction.reciever === "")
    ) {
      setError("Unesite sva polja potrebna za transakciju.");
    } else if (
      transaction.destination === "onlineaccount" &&
      (transaction.amount === "" || transaction.reciever === "")
    ) {
      setError("Unesite sva polja potrebna za transakciju.");
    } else {
      // if (transaction.amount!==""){
      //   if(transaction.destination==="bitcoin"){
      //           setError("Unesite sva polja potrebna za transakciju.");

      //   }
      // }
      console.log("else");
      makeTransaction(transaction)
        .then((item) => {
          if (item !== "Transaction failed.") {
            window.localStorage.setItem("user", JSON.stringify(item));
            setError("");
          } else {
            setError(item);
            alert(item);
          }
        })
        .then(() => {
          if (error !== "Transaction failed.") {
            //alert("Transakcija poslata.");
            setPerson(window.localStorage.getItem("user"));
            window.location.reload();
          }
        });
    }
    console.log(transaction);
  };
  ///PRETRAGA
  const handleChange2 = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;

    setSearch({ ...search, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log(search);
  };

  const handleSubmit2 = (e) => {
    console.log("usao u proveru");
    console.log(search.searchType);
    e.preventDefault();
    var fulllist = transactionsCopy;
    console.log(search);
    if (search.searchType === "") {
      setTransactions(fulllist);
    } else {
      if (search.searchType === "intheprocessing") {
        fulllist = fulllist.filter((x) =>
          x.state.toLowerCase().includes("u obradi")
        );
      } else if (search.searchType === "processed") {
        fulllist = fulllist.filter((x) =>
          x.state.toLowerCase().includes("obradjeno")
        );
      } else {
        console.log("usao u proveruuuuuu");
        fulllist = fulllist.filter((x) =>
          x.state.toLowerCase().includes("odbijeno")
        );
      }
      setTransactions(fulllist);
    }
  };
  ///FILTRIRANJE
  const handleChange3 = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;

    setSort({ ...sort, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log(sort);
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    var fulllist = transactionsCopy;
    if (sort.growDesc === "" || sort.sortType === "") {
      setTransactions(fulllist);
    } else {
      if (sort.growDesc === "descending") {
        if (sort.sortType === "sender") {
          console.log("usaoooooo");
          console.log(fulllist);
          // fulllist
          //   .sort(function (first, second) {
          //     return second[1]["sender"] - first[1]["sender"];
          //   })
          //   .reverse();
          console.log(fulllist);

          //fulllist.sender.sort((a, b) => a - b).reverse());
          //setTransactions(fulllist);
        } else if (sort.sortType === "receiver") {
          fulllist.reciever.sort((a, b) => a - b).reverse();
          setTransactions(fulllist);
        } else {
          fulllist.sort((a, b) =>
            parseFloat(a.amount) > parseFloat(b.amount)
              ? 1
              : parseFloat(b.amount) > parseFloat(a.amount)
              ? -1
              : 0
          );
          setTransactions(fulllist);
        }
      } else {
        if (sort.sortType === "sender") {
          // fulllist.sender.sort((a, b) => a - b);
          // setTransactions(fulllist);
          fulllist
            .sort(function (first, second) {
              return second[1].sender - first[1].sender;
            })
            .reverse();
          console.log(fulllist);
        } else if (sort.sortType === "receiver") {
          fulllist.reciever.sort((a, b) => a - b);
          setTransactions(fulllist);
        } else {
          fulllist.sort((a, b) =>
            parseFloat(a.amount) < parseFloat(b.amount)
              ? 1
              : parseFloat(b.amount) < parseFloat(a.amount)
              ? -1
              : 0
          );
          setTransactions(fulllist);
        }
      }
    }
  };

  const refresh = (e) => {
    setTransactions(transactionsCopy);
  };
  return (
    <Stack variant="filled" direction="column" width="100%">
      <Box>
        <Stat>
          <Stack direction="row">
            <StatLabel>Trenutno stanje on-line racuna</StatLabel>
            <StatNumber>{btcrsdValue.rsdBalance}</StatNumber>
            <StatHelpText>RSD</StatHelpText>
            <StatLabel>Trenutno stanje BTC racuna</StatLabel>
            <StatNumber>{btcrsdValue.btcBalance}</StatNumber>
            <StatHelpText>BTC</StatHelpText>
          </Stack>
        </Stat>
      </Box>
      <Box
        margin={4}
        border="1px"
        padding={2}
        borderRadius="lg"
        borderColor="gray.300"
        alignItems="center"
      >
        <FormControl isRequired>
          <Text>Kolicina novca:</Text>
          <InputGroup>
            <InputLeftElement children={<Icon as={ArrowRightIcon} />} />
            <Input
              type="number"
              name="btcamount"
              id="btcamount"
              value={transaction.btcamount}
              onChange={handleChange}
              placeholder="BTC"
              variant="filled"
              textColor="black"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputLeftElement children={<Icon as={ArrowRightIcon} />} />
            <Input
              type="number"
              name="amount"
              id="amount"
              value={transaction.amount}
              onChange={handleChange}
              placeholder="RSD"
              variant="filled"
              textColor="black"
            />
          </InputGroup>
          <br />
          <RadioGroup>
            <Text>Uplata na:</Text>
            <Stack direction="row" onClick={handleChange}>
              <Radio name="destination" value="banka">
                Banka
              </Radio>
              <Radio name="destination" value="onlineaccount">
                On-line account
              </Radio>
              <Radio name="destination" value="bitcoin">
                Bitcoin
              </Radio>
            </Stack>
          </RadioGroup>
          <br />
          <Text>Kome:</Text>
          <InputGroup>
            <InputLeftElement children={<Icon as={ArrowRightIcon} />} />
            <Input
              type="name"
              name="reciever"
              id="reciever"
              value={transaction.reciever}
              onChange={handleChange}
              placeholder="Email / Broj racuna"
              variant="filled"
              textColor="black"
            />
          </InputGroup>
        </FormControl>
        <br />
        <Button
          width="100%"
          textColor="black"
          colorScheme="yellow"
          type="submit"
          margin={2}
          padding={3}
          onClick={handleSubmit}
        >
          Izvrsi transakciju
        </Button>
        <br />
        <Center>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </Center>
      </Box>
      <Box width="100%">
        <Stack direction="row" width="100%">
          <form action="submit">
            <Stack direction="row" padding={2} width="100%">
              <RadioGroup width="100%">
                <Stack direction="row" onClick={handleChange2} width="100%">
                  <Text>Filtriraj:</Text>
                  <Radio name="searchType" value="intheprocessing">
                    U obradi
                  </Radio>
                  <Radio name="searchType" value="processed">
                    Obradjene
                  </Radio>
                  <Radio name="searchType" value="rejected">
                    Odbijene
                  </Radio>
                </Stack>
              </RadioGroup>
              <Button
                type="submit"
                onClick={handleSubmit2}
                colorScheme="green"
                variant="solid"
                alignSelf="end"
                margin={2}
              >
                <SearchIcon />
              </Button>
            </Stack>
          </form>
        </Stack>
        <Stack direction="row" width="100%">
          <form action="submit">
            <Stack direction="row" padding={2} width="100%">
              <Stack direction="row" onClick={handleChange3} width="100%">
                <RadioGroup width="100%">
                  <Text>Sortiraj po:</Text>
                  <Radio name="sortType" value="sender">
                    Posiljaocu
                  </Radio>
                  <Radio name="sortType" value="receiver">
                    Primaocu
                  </Radio>
                  <Radio name="sortType" value="amount">
                    Kolicini
                  </Radio>
                  <Divider orientation="vertical" width={3} height={50} />
                </RadioGroup>
                <RadioGroup width="100%">
                  <Radio name="growDesc" value="growing">
                    Rastuce
                  </Radio>
                  <Radio name="growDesc" value="descending">
                    Opadajuce
                  </Radio>
                </RadioGroup>
                <Button
                  type="submit"
                  onClick={handleSubmit3}
                  colorScheme="green"
                  variant="solid"
                  alignSelf="end"
                  margin={2}
                >
                  <SearchIcon />
                </Button>
              </Stack>

              <Button
                onClick={refresh}
                colorScheme="green"
                variant="solid"
                alignSelf="end"
                margin={2}
              >
                Prikazi sve
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
      <Box
        margin={4}
        border="1px"
        padding={2}
        borderRadius="lg"
        borderColor="gray.300"
      >
        <Table variant="simple" variant="striped" colorScheme="yellow">
          <TableCaption>Transaction</TableCaption>
          <Thead>
            <Tr>
              <Th>Stanje transakcije</Th>
              <Th>Posiljalac</Th>
              <Th>Primalac</Th>
              <Th>Kolicina (RSD/BTC)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((cur) => {
              return (
                <Tr>
                  {cur.state === "Odbijeno" && (
                    <>
                      <Td textColor="red">{cur.state}</Td>
                      <Td>{cur.sender}</Td>
                      <Td>{cur.reciever}</Td>
                      <Td>{cur.amount}</Td>
                    </>
                  )}
                  {cur.state !== "Odbijeno" && (
                    <>
                      <Td>{cur.state}</Td>
                      <Td>{cur.sender}</Td>
                      <Td>{cur.reciever}</Td>
                      <Td>{cur.amount}</Td>
                    </>
                  )}
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Stanje transakcije</Th>
              <Th>Posiljalac</Th>
              <Th>Primalac</Th>
              <Th>Kolicina (RSD/BTC)</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Stack>
  );
};

export default TransactionMenu;
