import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import UserForm from "../Components/UserForm";
import './Home.css'

const Home = () => {
  const [render, setRender] = useState(false);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState({
    name: "",
    email: "",
  });
  const handleSubmit = async () => {
    const res = await axios.post("/users", input);
    if (res) {
      setRender(!render)
      setInput({ name: "", email: "" });
    }

  };
  const getAllData = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/users/${id}`);
      // setRender(true);
      const newUsers = users.filter((user) => {
          return user._id !== id
      })
      setUsers(newUsers)
  };

  useEffect(() => {
    getAllData();
  }, [render]);
  return (
    <>
      <Header />
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        px={{ base: 5, md: 12 }}
        py={3}
      >
        <Box w={{ base: "100%", md: "35%" }} pr={{ md: 3 }}>
          <UserForm
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
          />
        </Box>

        <Box w={{ base: "100%", md: "65%" }} border={"2px dashed gray"}>
          <div className="table">
            <TableContainer>
              <Table variant="simple">
                <TableCaption color={"red"}>Total No. of Users: {users.length}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Update</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users && users.length>0 &&
                    users.map((user,idx) => (
                      <Tr>
                        <Td>{idx+1}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          <Link to={`/edit/${user._id}`}>
                            <Button colorScheme="green" size="sm">
                              Edit
                            </Button>
                          </Link>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={(e) => handleDelete(user._id)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Home;
